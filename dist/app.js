const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('nav');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');}));
function filterCollection(category){document.querySelectorAll('[data-filter]').forEach(button=>{const selected=button.dataset.filter===category;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});document.querySelectorAll('.product').forEach(product=>{product.hidden=category!=='all'&&product.dataset.category!==category;});}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>filterCollection(button.dataset.filter)));
const dialog=document.querySelector('#image-dialog');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#dialog-image').src=button.dataset.image;document.querySelector('#dialog-image').alt=button.querySelector('img').alt;document.querySelector('#dialog-caption').textContent=button.dataset.title;dialog.showModal();document.body.classList.add('modal-open');}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.querySelector('#selection-form').addEventListener('submit',event=>{event.preventDefault();filterCollection(document.querySelector('#interest').value);document.querySelector('#coleccion').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
document.querySelector('#year').textContent=new Date().getFullYear();
