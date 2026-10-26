const componentInfo={
estructura:['Estructura','Es la base que sostiene el conjunto. En Sueño Dull Home trabajamos con estructuras de madera: el diseño del armado, las uniones y los refuerzos forman parte de la planificación de cada pieza.'],
suspension:['Suspensión','Conecta el asiento con la estructura y participa en su elasticidad. Cinchas, resortes zigzag o bases rígidas ofrecen respuestas diferentes al combinarse con las capas de confort.'],
espumas:['Espumas','Aportan soporte y comodidad. La densidad, firmeza, espesor y recuperación se evalúan en conjunto; una espuma más densa no es necesariamente más firme.'],
rellenos:['Rellenos','Dan volumen y suavidad a respaldos y almohadones. Guatas, fibras y otras alternativas requieren cuidados distintos según la composición elegida.'],
tapizado:['Tapizado','Es la superficie de contacto y una parte esencial del carácter de la pieza. La elección considera textura, composición, uso y mantenimiento.'],
terminaciones:['Terminaciones','Costuras, cierres, fundas, apoyos y patas completan el diseño. Cada detalle se acuerda según el modelo y las opciones disponibles.']};
document.querySelectorAll('[data-part]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-part]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});const [title,description]=componentInfo[button.dataset.part];document.querySelector('#part-title').textContent=title;document.querySelector('#part-description').textContent=description;}));
const comforts={Firme:'Una sensación de apoyo más definido. Evaluamos el conjunto de soporte y capas para encontrar la respuesta que preferís.',Equilibrado:'Una sensación intermedia entre soporte y suavidad. La combinación se ajusta durante el asesoramiento.',Envolvente:'Un recibimiento más mullido. Las capas suaves y los rellenos se combinan con un soporte adecuado al diseño.'};
document.querySelectorAll('[data-comfort]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-comfort]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});document.querySelector('#comfort-description').textContent=comforts[button.dataset.comfort];document.querySelector('#sofa-form [name="firmeza"]').value=button.dataset.comfort;updateSofa();}));
const fabrics=[
['Chenille','Una superficie de tacto suave y aspecto cálido.','La composición y la trama varían entre colecciones.','Consultá el método de limpieza de la muestra elegida.'],
['Tipo lino','Un aspecto de trama visible y expresión natural.','Puede incorporar distintas fibras; el nombre no garantiza lino en su composición.','Revisá la ficha antes de aplicar agua o productos.'],
['Bouclé','Una textura de bucles que aporta relieve y volumen visual.','Considerá la posibilidad de enganches según la trama y el uso.','Evitá cepillos o accesorios que puedan enganchar los bucles.'],
['Terciopelo','Una superficie de pelo corto y reflejos que cambian con la luz.','La dirección del pelo puede modificar la percepción del tono.','Consultá cómo retirar marcas sin alterar el pelo.'],
['Microfibra','Una familia de tejidos de fibras finas y tacto suave.','Su comportamiento depende de la composición y del acabado.','No asumas que todas las microfibras admiten el mismo limpiador.'],
['Cuero natural','Un material con variaciones de grano y apariencia.','El acabado define buena parte de su respuesta y cuidado.','Utilizá únicamente productos indicados para ese acabado.'],
['Cuero sintético','Una alternativa con superficie recubierta y diferentes acabados.','Composición, flexibilidad y comportamiento varían según la opción.','Evitá solventes y verificá la recomendación del fabricante.']];
const library=document.querySelector('#fabric-library');
fabrics.forEach(([name,description,features,care],index)=>{const card=document.createElement('article');card.className='fabric-card';const number=document.createElement('span');number.className='fabric-number';number.textContent=String(index+1).padStart(2,'0');const title=document.createElement('h3');title.textContent=name;const copy=document.createElement('p');copy.textContent=description;const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Características y cuidados';const body=document.createElement('p');body.textContent=features+' '+care;details.append(summary,body);const link=document.createElement('a');link.className='text-link';link.href=whatsappURL('Hola, quisiera consultar disponibilidad y muestras de '+name+' para mi sofá.');link.target='_blank';link.rel='noopener noreferrer';link.textContent='Consultar muestras ↗';card.append(number,title,copy,details,link);library.append(card);});
const advice={uso:'Consultá composición, resistencia al uso y mantenimiento de la muestra concreta. El nombre de una tela no define por sí solo su desempeño.',mascotas:'Contanos sobre tus mascotas y sus hábitos. Evaluá tramas, posibilidad de enganches y limpieza con muestras reales; ninguna tela es indestructible.',limpieza:'Pedí instrucciones de limpieza, composición y restricciones de la tela exacta. Consultá si hay opciones con tratamientos específicos y cómo deben cuidarse.',color:'Compará muestras reales con luz natural y artificial de tu espacio. Las pantallas y la dirección del tejido pueden cambiar la percepción del color.'};
document.querySelector('#fabric-priority').addEventListener('change',event=>document.querySelector('#fabric-advice').textContent=advice[event.target.value]);
function whatsappURL(message){return 'https://wa.me/595995603795?text='+encodeURIComponent(message);}
const sofaForm=document.querySelector('#sofa-form');
const colorMap={Marfil:'#e5dccb',Taupe:'#9d8c7c',Borgoña:'#642b3a',Arena:'#c6aa80','A definir':'#d8c8af'};
function sofaLines(){const d=new FormData(sofaForm);return [['Tipo',d.get('tipo')],['Medidas',d.get('medidas').trim()||'A definir'],['Tapizado',d.get('tapizado')],['Color orientativo',d.get('color')],['Confort',d.get('firmeza')],['Almohadones',d.get('almohadones')],['Patas y terminaciones',d.get('terminaciones').trim()||'A definir']].map(([key,value])=>key+': '+value);}
function updateSofa(){document.querySelector('#sofa-summary').textContent=sofaLines().join(' · ');document.querySelector('#config-sofa').setAttribute('fill',colorMap[sofaForm.elements.color.value]);const extended=['Esquinero','Chaise longue','Sofá cama'].includes(sofaForm.elements.tipo.value);document.querySelector('#config-extension').style.display=extended?'':'none';document.querySelector('#config-extension').removeAttribute('hidden');}
sofaForm.addEventListener('input',updateSofa);sofaForm.addEventListener('change',updateSofa);updateSofa();
sofaForm.addEventListener('submit',event=>{event.preventDefault();window.open(whatsappURL('Hola, Sueño Dull Home. Quisiera solicitar presupuesto para un sofá personalizado.\n\n'+sofaLines().join('\n')),'_blank','noopener,noreferrer');});
const appointmentForm=document.querySelector('#appointment-form');
function asuncionToday(){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Asuncion',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());return ['year','month','day'].map(type=>parts.find(p=>p.type===type).value).join('-');}
appointmentForm.elements.fecha.min=asuncionToday();
appointmentForm.addEventListener('submit',event=>{event.preventDefault();const date=appointmentForm.elements.fecha;date.min=asuncionToday();date.setCustomValidity(date.value<date.min?'Elegí una fecha de hoy en adelante.':'');if(!appointmentForm.reportValidity())return;const data=new FormData(appointmentForm);const formatted=date.value.split('-').reverse().join('/');window.open(whatsappURL('Hola, Sueño Dull Home. Quisiera solicitar una cita de asesoramiento especializado.\n\nNombre: '+data.get('nombre').trim()+'\nFecha preferida: '+formatted+'\nFranja: '+data.get('horario')+'\nProyecto: '+(data.get('proyecto').trim()||'A conversar')+'\n\nQuedo a la espera de la confirmación de disponibilidad.'),'_blank','noopener,noreferrer');});
appointmentForm.elements.fecha.addEventListener('input',()=>appointmentForm.elements.fecha.setCustomValidity(''));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:0.1});document.querySelectorAll('.process-timeline li').forEach(item=>{item.classList.add('will-reveal');observer.observe(item);});}

// Tie the anatomy illustration to the selected component.
document.querySelectorAll('[data-part]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-component]').forEach(part=>part.classList.toggle('component-highlight',part.dataset.component===button.dataset.part));}));

const sofaPreview=document.querySelector('.config-preview svg');
const previewLabel=document.createElement('p');previewLabel.className='config-shape-label';sofaPreview.after(previewLabel);
const shapeNotes={Recto:'Una composición lineal para organizar el espacio.',Esquinero:'Una distribución en L, con orientación a confirmar.',Modular:'Módulos para pensar una distribución flexible.', 'Chaise longue':'Un asiento extendido; lado y medidas a definir.', 'Sofá cama':'Una idea de apertura ilustrativa; mecanismo a confirmar.'};
const shapeNote=document.createElement('p');shapeNote.className='design-caption';previewLabel.after(shapeNote);
function renderSofaPreview(){
 const type=sofaForm.elements.tipo.value,color=colorMap[sofaForm.elements.color.value],pillows=sofaForm.elements.almohadones.value;
 const rect=(x,y,w,h,r=10)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
 let shapes=rect(85,70,430,138,18)+rect(70,195,460,85,12);
 if(type==='Modular'){for(let x=90;x<510;x+=140)shapes+=rect(x,165,130,60);}
 else{shapes+=rect(92,165,200,60)+rect(307,165,200,60);}
 if(type==='Esquinero')shapes+=rect(307,205,200,95)+rect(465,150,42,150);
 if(type==='Chaise longue')shapes+=rect(307,200,200,105);
 if(type==='Sofá cama')shapes+=rect(92,225,415,85)+`<path d="M92 265h415M300 225v85" fill="none"/>`;
 shapes+=rect(45,145,48,135,14)+rect(507,145,48,135,14);
 let decorative='';if(pillows!=='Sin almohadones decorativos'){const pillowColor=pillows==='En contraste'?'#a7814d':color;decorative=`<g fill="${pillowColor}" stroke="#79664f" stroke-width="2">${rect(120,109,65,60,8)}${rect(414,109,65,60,8)}</g>`;}
 sofaPreview.innerHTML=`<title>Propuesta ilustrativa: ${type}</title><g fill="${color}" stroke="#79664f" stroke-width="2">${shapes}</g>${decorative}<path d="M98 310v15m405-15v15" stroke="#59402b" stroke-width="9"/>`;
 previewLabel.textContent=type;shapeNote.textContent=shapeNotes[type];
}
sofaForm.addEventListener('input',renderSofaPreview);sofaForm.addEventListener('change',renderSofaPreview);renderSofaPreview();
