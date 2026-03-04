const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let rings = [];

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle{
constructor(x,y,vx,vy,r,life){
this.x=x;
this.y=y;
this.vx=vx;
this.vy=vy;
this.r=r;
this.life=life;
this.age=0;
}
update(){
this.x+=this.vx;
this.y+=this.vy;
this.age+=0.016;
}
draw(){
let alpha=1-(this.age/this.life);
if(alpha<0) alpha=0;
let g=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r*2);
g.addColorStop(0,`rgba(0,255,136,${alpha})`);
g.addColorStop(1,'rgba(0,0,0,0)');
ctx.fillStyle=g;
ctx.beginPath();
ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
ctx.fill();
}
alive(){
return this.age<this.life;
}
}

function burst(x,y){
for(let i=0;i<20;i++){
let angle=Math.random()*Math.PI*2;
let speed=Math.random()*2;
particles.push(new Particle(
x,
y,
Math.cos(angle)*speed,
Math.sin(angle)*speed,
3+Math.random()*5,
1+Math.random()
));
}
rings.push({x,y,r:0,life:1,age:0});
}

window.addEventListener('click',(e)=>{
burst(e.clientX,e.clientY);
});

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

if(Math.random()<0.05){
particles.push(new Particle(
Math.random()*canvas.width,
Math.random()*canvas.height,
(Math.random()-0.5)*0.5,
(Math.random()-0.5)*0.5,
2+Math.random()*3,
4+Math.random()*3
));
}

particles=particles.filter(p=>p.alive());
particles.forEach(p=>{
p.update();
p.draw();
});

rings=rings.filter(r=>r.age<r.life);
rings.forEach(r=>{
r.age+=0.02;
r.r+=3;
let alpha=1-(r.age/r.life);
ctx.strokeStyle=`rgba(0,255,136,${alpha})`;
ctx.lineWidth=2;
ctx.beginPath();
ctx.arc(r.x,r.y,r.r,0,Math.PI*2);
ctx.stroke();
});

requestAnimationFrame(animate);
}

animate();