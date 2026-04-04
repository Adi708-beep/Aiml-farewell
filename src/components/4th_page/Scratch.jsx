import { useRef, useEffect, useState } from "react";
import "./Scratch.css";

const characters = [
{
name:"Eleven",
img:"https://images.unsplash.com/photo-1632974079504-2ed42d367bd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0cmFuZ2VyJTIwdGhpbmdzJTIwY2hhcmFjdGVyc3xlbnwwfHwwfHx8MA%3D%3D"
},
{
name:"Vecna",
img:"https://i.pinimg.com/736x/0b/f7/64/0bf764e3cce80b8a0fa46c75fba81c84.jpg"
},
{
name:"Steve",
img:"https://i.pinimg.com/1200x/67/7c/66/677c661c95bfb99f005bdce2d4001005.jpg"
},
{
name:"Dustin",
img:"https://i.pinimg.com/736x/75/0d/1b/750d1bcf07ed6c486c4dcdb0338103c1.jpg"
},
{
name:"Hopper",
img:"https://i.pinimg.com/736x/d1/e7/3a/d1e73a788330e0e7b46542f722e7bc08.jpg"
}
];

export default function Scratch(){

const canvasRef = useRef(null);
const isDrawing = useRef(false);

const [progress,setProgress] = useState(0);
const [started,setStarted] = useState(false);

const [character,setCharacter] = useState(
characters[Math.floor(Math.random()*characters.length)]
);

useEffect(()=>{

const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");

ctx.globalCompositeOperation="source-over";

ctx.fillStyle="#444";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.globalCompositeOperation="destination-out";

},[character]);


const scratch=(x,y)=>{

const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(x,y,35,0,Math.PI*2);
ctx.fill();

calculateProgress();
};


const calculateProgress=()=>{

const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");

const pixels = ctx.getImageData(0,0,canvas.width,canvas.height);

let transparent=0;

for(let i=3;i<pixels.data.length;i+=4){
if(pixels.data[i]===0) transparent++;
}

const percent=(transparent/(canvas.width*canvas.height))*100;

setProgress(percent.toFixed(0));

if(percent>65){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

};


const startDraw=(e)=>{

setStarted(true);
isDrawing.current=true;

const rect = canvasRef.current.getBoundingClientRect();

scratch(
e.clientX-rect.left,
e.clientY-rect.top
);

};


const draw=(e)=>{

if(!isDrawing.current) return;

const rect = canvasRef.current.getBoundingClientRect();

scratch(
e.clientX-rect.left,
e.clientY-rect.top
);

};


const stopDraw=()=>{
isDrawing.current=false;
};


const resetCard=()=>{

setCharacter(
characters[Math.floor(Math.random()*characters.length)]
);

setProgress(0);
setStarted(false);

};


return(

<div className="scratch-page">

<h1 className="scratch-title">
DISCOVER YOUR <span>STRANGER THINGS</span> CHARACTER
</h1>

<p className="scratch-sub">
Scratch the portal to reveal your destiny in the Upside Down
</p>

<div className="card-wrapper">

<img
className="character-image"
src={character.img}
alt={character.name}
/>

<canvas
ref={canvasRef}
width={420}
height={540}
onMouseDown={startDraw}
onMouseMove={draw}
onMouseUp={stopDraw}
onMouseLeave={stopDraw}
/>

{!started && (
<div className="scratch-label">
SCRATCH TO REVEAL
</div>
)}

</div>


<div className="progress-section">

<div className="progress-label">
<span>SCRATCH PROGRESS</span>
<span>{progress}%</span>
</div>

<div className="progress-bar">
<div
className="progress-fill"
style={{width:`${progress}%`}}
></div>
</div>

</div>

<button
className="reset-btn"
onClick={resetCard}
>
RESET CARD
</button>

</div>

);

}