const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);
window.addEventListener('load',()=>{setTimeout(()=>$('#loader').style.display='none',700)});
$('#year').textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light') document.body.classList.add('light');
$('#themeToggle').addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');$('#themeToggle').textContent=document.body.classList.contains('light')?'☀️':'🌙'});
$('#menuBtn').addEventListener('click',()=>$('#nav').classList.toggle('open'));
$$('.nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));

const words=['Aspiring Data Analyst','Python Developer','SQL Learner','Power BI Enthusiast','Internship Ready'];let wi=0,ci=0,del=false;
function type(){const word=words[wi];$('#typingText').textContent=word.slice(0,ci);if(!del&&ci<word.length)ci++;else if(del&&ci>0)ci--;else{del=!del;if(!del)wi=(wi+1)%words.length}setTimeout(type,del?45:95)}type();

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active')}),{threshold:.12});$$('.reveal').forEach(el=>obs.observe(el));

const dot=$('#cursorDot'),outline=$('#cursorOutline');window.addEventListener('mousemove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';outline.style.left=e.clientX+'px';outline.style.top=e.clientY+'px'});
const card=$('#tiltCard');card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateY(${x*18}deg) rotateX(${-y*18}deg)`});card.addEventListener('mouseleave',()=>card.style.transform='rotateY(0) rotateX(0)');

$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.project-card').forEach(c=>{c.style.display=(f==='all'||c.dataset.category===f)?'block':'none'})}));

const canvas=$('#particleCanvas'),ctx=canvas.getContext('2d');let particles=[];function resize(){canvas.width=innerWidth;canvas.height=innerHeight}resize();addEventListener('resize',resize);for(let i=0;i<70;i++)particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*2+1});function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(0,229,255,.55)';particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});ctx.strokeStyle='rgba(124,60,255,.13)';for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j];const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)}draw();

let count=Number(localStorage.getItem('visitorCount')||0)+1;localStorage.setItem('visitorCount',count);$('#visitorCount').textContent=count;

$('#chatBtn').addEventListener('click',()=>$('#chatBox').style.display='block');$('#closeChat').addEventListener('click',()=>$('#chatBox').style.display='none');
function botReply(msg){msg=msg.toLowerCase();if(msg.includes('skill'))return 'Kundan knows Python, SQL, Excel, Power BI, Pandas, NumPy and ML basics.';if(msg.includes('project'))return 'Main projects include Student Performance Dashboard, Sales Analysis Dashboard, SQL Practice and Portfolio Website.';if(msg.includes('intern'))return 'Yes, Kundan is available for paid internships in Data Analytics, Python and BI roles.';if(msg.includes('contact'))return 'You can contact him at kundankr811457@gmail.com or LinkedIn.';return 'I can answer about skills, projects, internship availability and contact details.'}
$('#sendChat').addEventListener('click',()=>{const input=$('#chatInput');if(!input.value.trim())return;$('#chatBody').innerHTML+=`<p><strong>You:</strong> ${input.value}</p><p><strong>Bot:</strong> ${botReply(input.value)}</p>`;input.value='';$('#chatBody').scrollTop=$('#chatBody').scrollHeight});
$('#chatInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('#sendChat').click()});
