const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();

const progress = $('#scrollProgress');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
}, {passive:true});

$('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
$$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

const skillData = {
 backend:{title:'Backend engineering',desc:'Building reliable application logic, services, and APIs.',items:['Java','Spring Core','Spring MVC','Spring Boot','Spring Cloud','Struts','JPA','REST APIs','Microservices','Python','C++'],label:'PRIMARY SPECIALISATION'},
 frontend:{title:'Frontend development',desc:'Creating accessible, responsive interfaces that connect cleanly to backend services.',items:['HTML5','CSS3','JavaScript','TypeScript','Angular','Responsive UI'],label:'USER EXPERIENCE'},
 data:{title:'Data & engineering tools',desc:'Working with relational and document databases, source control, and engineering utilities.',items:['MySQL','MongoDB','Git','GitHub','Postman','Oracle Endeca','WinSCP','PuTTY','MobaXterm'],label:'DAILY TOOLKIT'},
 cloud:{title:'Cloud & delivery',desc:'Supporting delivery pipelines, monitoring, and cloud fundamentals.',items:['AWS','Jenkins','CI/CD','Dynatrace','Control-M','ServiceNow','Jira'],label:'DELIVERY & OPERATIONS'}
};
$$('.skill-tab').forEach(btn => btn.addEventListener('click', () => {
  $$('.skill-tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const key=btn.dataset.skill, data=skillData[key], index=String([...$$('.skill-tab')].indexOf(btn)+1).padStart(2,'0');
  $('#skillPanel').innerHTML = `<div class="skill-panel-top"><span>SKILL SET / ${index}</span><span class="panel-live"><i></i> ACTIVE LOADOUT</span></div><h3>${data.title}</h3><p>${data.desc}</p><div class="skill-pills">${data.items.map(x=>`<span>${x}</span>`).join('')}</div><div class="skill-panel-bottom">${data.label}<span>✳</span></div>`;
}));

const commands = {
 help:'Commands: <b>about</b>, <b>stack</b>, <b>awards</b>, <b>coffee</b>, <b>contact</b>.',
 about:'Java Full Stack Developer · 3 years · Capgemini · TE Connectivity. I build and support enterprise applications.',
 stack:'Java · Spring Boot · Spring MVC · Struts · Angular · REST APIs · MySQL · MongoDB · AWS · Jenkins.',
 awards:'TownHall Recognition (2025) · TE Connectivity EPPAP Client Appreciation (2024) · Smart India Hackathon (2020).',
 coffee:'☕ Fuel source detected. Best debugging companion: a fresh cup and a reproducible bug.',
 contact:'Reach me at <b>sharmasurajvishwakarma@gmail.com</b> or connect on LinkedIn.'
};
$('#terminalForm').addEventListener('submit', e=>{
  e.preventDefault(); const input=$('#terminalInput'), cmd=input.value.trim().toLowerCase();
  $('#terminalOutput').innerHTML=commands[cmd] || `Command not found: <b>${cmd.replace(/[<>]/g,'')}</b>. Type <b>help</b> to see available commands.`;
  input.value='';
});

const toast = msg => { const el=$('#toast'); el.textContent=msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2800); };
$('#contactForm').addEventListener('submit', async e=>{
  e.preventDefault(); const form=e.currentTarget, button=$('.form-submit',form), status=$('#formStatus');
  button.disabled=true; button.textContent='Sending…';
  const payload=Object.fromEntries(new FormData(form).entries());
  try{
    const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await response.json();
    if(!response.ok) throw new Error(data.message || 'Please check the form and try again.');
    status.textContent=data.message+' This demo does not send email yet.';
    form.reset(); toast('Message received by the portfolio API.');
  }catch(err){status.textContent=err.message || 'Could not reach the Java API. Please email me directly.';}
  finally{button.disabled=false;button.innerHTML='Send a message <span>↗</span>';}
});

// Three.js holographic portrait stage. The uploaded portrait remains visible as a graceful fallback.
try {
  const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  const stage=$('#avatar-stage');
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(38,stage.clientWidth/stage.clientHeight,.1,100);
  camera.position.z=6.5;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(stage.clientWidth,stage.clientHeight);
  renderer.domElement.setAttribute('aria-hidden','true');
  stage.prepend(renderer.domElement);
  const group=new THREE.Group(); scene.add(group);
  const ringMat=new THREE.MeshBasicMaterial({color:0xb8f36b,transparent:true,opacity:.62,wireframe:true});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.72,.012,8,120),ringMat);
  ring.rotation.x=1.1; ring.rotation.y=.3; group.add(ring);
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.05,.008,8,140),new THREE.MeshBasicMaterial({color:0x8bd4c4,transparent:true,opacity:.4}));
  ring2.rotation.x=1.35; ring2.rotation.y=-.35; group.add(ring2);
  const points=new THREE.BufferGeometry(), count=520, positions=new Float32Array(count*3);
  for(let i=0;i<count;i++){const r=2.1+Math.random()*1.6,a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1);positions[i*3]=r*Math.sin(b)*Math.cos(a);positions[i*3+1]=r*Math.sin(b)*Math.sin(a);positions[i*3+2]=r*Math.cos(b);}
  points.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const stars=new THREE.Points(points,new THREE.PointsMaterial({color:0xc9f4a0,size:.018,transparent:true,opacity:.75}));
  group.add(stars);
  const light=new THREE.PointLight(0xb8f36b,2.4,10);light.position.set(2,2,4);scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff,.7));
  let mx=0,my=0,tx=0,ty=0;
  stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*.5;ty=((e.clientY-r.top)/r.height-.5)*.35;});
  stage.addEventListener('pointerleave',()=>{tx=0;ty=0;});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animate(t){requestAnimationFrame(animate);if(!reduced){mx+=(tx-mx)*.035;my+=(ty-my)*.035;group.rotation.y=mx+Math.sin(t*.00025)*.08;group.rotation.x=my;ring.rotation.z=t*.00012;ring2.rotation.z=-t*.00009;stars.rotation.y=-t*.000025;}renderer.render(scene,camera);}
  animate(0);
  new ResizeObserver(()=>{camera.aspect=stage.clientWidth/stage.clientHeight;camera.updateProjectionMatrix();renderer.setSize(stage.clientWidth,stage.clientHeight);}).observe(stage);
} catch(err) { console.info('3D layer unavailable; portrait fallback is active.',err); }
