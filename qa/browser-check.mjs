import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-pipe','--user-data-dir=/private/tmp/sueno-chrome-interactions'],{stdio:['ignore','ignore','ignore','pipe','pipe']});
let seq=0,buffer='';const pending=new Map();
chrome.stdio[4].on('data',chunk=>{buffer+=chunk.toString();let i;while((i=buffer.indexOf('\0'))>=0){const msg=JSON.parse(buffer.slice(0,i));buffer=buffer.slice(i+1);if(msg.id&&pending.has(msg.id)){const {resolve,reject}=pending.get(msg.id);pending.delete(msg.id);msg.error?reject(Error(JSON.stringify(msg.error))):resolve(msg.result);}}});
function send(method,params={},sessionId){return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});chrome.stdio[3].write(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})})+'\0');});}
const timeout=setTimeout(()=>{chrome.kill();console.error('Tiempo de comprobación agotado');process.exit(1)},45000);
try{
const {targetId}=await send('Target.createTarget',{url:'about:blank'});const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId);if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
await send('Page.enable',{},sessionId);await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false},sessionId);
await send('Page.navigate',{url:pathToFileURL(path.resolve('sueno-dull-home/dist/index.html')).href},sessionId);
for(let i=0;i<50;i++){if(await evaluate('document.readyState==="complete" && !!document.querySelector(".fabric-card")'))break;await new Promise(r=>setTimeout(r,100));}
assert.equal(await evaluate('document.querySelectorAll(".fabric-card").length'),7);
assert.equal(await evaluate('getComputedStyle(document.body).backgroundColor'),'rgb(244, 238, 228)');
assert.equal(await evaluate('(()=>{document.querySelector("[data-part=espumas]").click();return document.querySelector("#part-title").textContent+":"+document.querySelector(".component-highlight").dataset.component})()'),'Espumas:espumas');
assert.equal(await evaluate('(()=>{document.querySelector("[data-comfort=Firme]").click();return document.querySelector("#sofa-form").elements.firmeza.value})()'),'Firme');
assert.equal(await evaluate('(()=>{const f=document.querySelector("#sofa-form");f.elements.tipo.value="Modular";f.elements.color.value="Borgoña";f.elements.medidas.value="240 × 160 cm";f.dispatchEvent(new Event("change"));window.open=url=>window.qaMessage=url;f.requestSubmit();return new URL(window.qaMessage).searchParams.get("text")})()').then(message=>message.includes('Tipo: Modular')&&message.includes('Color orientativo: Borgoña')&&message.includes('240 × 160 cm')),true);
assert.equal(await evaluate('document.querySelector(".config-shape-label").textContent'),'Modular');
assert.equal(await evaluate('(()=>{const f=document.querySelector("#appointment-form");f.elements.nombre.value="Cliente de prueba";f.elements.fecha.value=f.elements.fecha.min;f.requestSubmit();return new URL(window.qaMessage).searchParams.get("text").includes("Cliente de prueba")})()'),true);
assert.equal(await evaluate('(()=>{window.qaMessage="";const f=document.querySelector("#appointment-form");f.elements.fecha.value="2020-01-01";f.requestSubmit();return window.qaMessage})()'),'');
assert.equal(await evaluate('(()=>{document.querySelector("[data-filter=descanso]").click();return [...document.querySelectorAll(".product")].filter(p=>!p.hidden).length})()'),3);
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId);
assert.equal(await evaluate('document.documentElement.scrollWidth<=window.innerWidth'),true);
assert.equal(await evaluate('(()=>{document.querySelector(".menu-toggle").click();return document.querySelector("nav").classList.contains("open")})()'),true);
await evaluate('document.querySelectorAll("nav a")[2].click()');
assert.equal(await evaluate('document.querySelector("nav").classList.contains("open")'),false);
await evaluate('document.querySelector("#disena").scrollIntoView({behavior:"instant"})');
const screen=await send('Page.captureScreenshot',{format:'png'},sessionId);fs.writeFileSync('/private/tmp/sueno-mobile-config.png',Buffer.from(screen.data,'base64'));
console.log('PASS: 7 tapizados, fondo, anatomía, selector de confort, configurador, mensajes de WhatsApp, citas, fechas pasadas, filtros, menú móvil y ancho móvil.');
}catch(error){console.error(error);process.exitCode=1}finally{clearTimeout(timeout);await send('Browser.close').catch(()=>{});chrome.kill();}
