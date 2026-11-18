const $=s=>document.querySelector(s);
const defaults={name:'Jazmín',message:'Querida Jazmín, hoy celebramos el regalo de tu vida.\n\nQue Dios te bendiga en este nuevo año, te regale salud, paz y alegría, y te rodee siempre de amor sincero. Que guíe tus pasos, cuide tu corazón y te dé fuerzas para seguir cada uno de tus sueños.\n\nDeseo que nunca te falten motivos para sonreír, personas que te abracen con cariño y momentos que quieras guardar para siempre.\n\n¡Feliz cumpleaños, Jazmín! Que recibas muchas bendiciones hoy y todos los días de tu vida.\n\nY para tu entrevista, no te sientas nerviosa: respira hondo, confía en ti y en todo lo que eres capaz de hacer. Ve con tranquilidad, sé tú misma y recuerda que todo va a salir bien. ¡Tú puedes!',from:'Con mucho cariño, para ti.'};
const details={...defaults};
function render(){ $('#heroName').textContent=details.name+'.';$('#letterTitle').textContent='Para ti, '+details.name+':';$('#letterText').textContent=details.message;$('#signature').textContent=details.from;document.title='Feliz cumpleaños, '+details.name+' · Un día para ti'}render();
$('#openLetter').onclick=()=>$('#letterDialog').showModal();document.querySelectorAll('.close,.close-letter').forEach(b=>b.onclick=()=>b.closest('dialog').close());document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
document.querySelectorAll('.wish').forEach(b=>b.onclick=()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.querySelector('.wish-message').hidden=!open;b.querySelector('.wish-hint').textContent=open?'Guardar deseo ↙':'Descubre tu deseo ↗'});
let blown=false;$('#blow').onclick=()=>{blown=!blown;$('.candles').classList.toggle('out',blown);$('#blow').textContent=blown?'Volver a encender':'Apagar las velitas';$('#celebration').textContent=blown?'¡Feliz cumpleaños, '+details.name+'! Que Dios bendiga tus sueños y te regale un año lleno de alegría.':'Que Dios te bendiga hoy y siempre, '+details.name+'.';if(!blown||matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(let i=0;i<65;i++){const p=document.createElement('i');p.className='confetti';p.style.left=Math.random()*100+'%';p.style.setProperty('--drift',(Math.random()-.5)*250+'px');p.style.animationDelay=Math.random()*.5+'s';p.style.background=['#b73765','#ec9db8','#dbbfcc','#d97699'][i%4];$('#confetti').append(p);setTimeout(()=>p.remove(),3300)}};

// Botanical background: one frame per pointer update, no scroll handler.
const garden=document.querySelector('.lily-garden');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let gardenFrame=0;
function moveLilies(event){
 if(motionPreference.matches)return;
 cancelAnimationFrame(gardenFrame);
 const x=(event.clientX/innerWidth-.5)*24;
 const y=(event.clientY/innerHeight-.5)*18;
 gardenFrame=requestAnimationFrame(()=>{garden.style.setProperty('--lx',x+'px');garden.style.setProperty('--ly',y+'px')});
}
document.addEventListener('pointermove',moveLilies,{passive:true});
document.addEventListener('pointerdown',moveLilies,{passive:true});
document.addEventListener('pointerleave',()=>{cancelAnimationFrame(gardenFrame);garden.style.setProperty('--lx','0px');garden.style.setProperty('--ly','0px')});
motionPreference.addEventListener('change',()=>{cancelAnimationFrame(gardenFrame);garden.style.setProperty('--lx','0px');garden.style.setProperty('--ly','0px')});

let royalTimer;
$('#crownPrincess').onclick=()=>{
 const section=$('#princesa');
 clearTimeout(royalTimer);
 section.classList.remove('royal-celebrating');
 $('#crownPrincess').setAttribute('aria-pressed','true');
 $('#crownPrincess').textContent='¡Feliz día, princesa!';
 $('#royalMessage').textContent='Tu corona es esa luz tan bonita que llevas dentro. ¡Feliz cumpleaños y feliz Día de la Princesa, Jazmín!';
 requestAnimationFrame(()=>requestAnimationFrame(()=>section.classList.add('royal-celebrating')));
 royalTimer=setTimeout(()=>section.classList.remove('royal-celebrating'),1900);
};
