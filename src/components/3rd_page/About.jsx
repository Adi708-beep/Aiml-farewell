import React, { useEffect, useState } from "react";
import "./About.css";
import ScrambledText from "./ScrambledText.jsx";

const About = () => {

const targetDate = new Date("June 1, 2026 00:00:00").getTime();

const [timeLeft,setTimeLeft]=useState({
days:0,
hours:0,
minutes:0,
seconds:0
});

useEffect(()=>{

const timer=setInterval(()=>{

const now=new Date().getTime();
const difference=targetDate-now;

setTimeLeft({
days:Math.floor(difference/(1000*60*60*24)),
hours:Math.floor((difference/(1000*60*60))%24),
minutes:Math.floor((difference/(1000*60))%60),
seconds:Math.floor((difference/1000)%60)
});

},1000);

return()=>clearInterval(timer)

},[])

return (

<div className="about-container">

<h4 className="chapter">THE FINAL CHAPTER</h4>

<h1 className="title">
ABOUT THE <span>NIGHT</span>
</h1>

<ScrambledText>

A night of neon and nostalgia as we celebrate the Class of 2026.
From shared laughs to late-night grinds, this is our last crawl
together through the Upside Down. An evening crafted for those
who dared to dream and built the future of AIML.

</ScrambledText>

<div className="divider">FRIENDS DON'T LIE</div>

<h4 className="tick">TICK TOCK</h4>

<h2 className="running">
TIME IS <span>RUNNING OUT</span>
</h2>

<div className="timer">

<div className="box">
<h1>{timeLeft.days}</h1>
<p>DAYS</p>
</div>

<div className="box">
<h1>{timeLeft.hours}</h1>
<p>HOURS</p>
</div>

<div className="box">
<h1>{timeLeft.minutes}</h1>
<p>MINUTES</p>
</div>

<div className="box">
<h1>{timeLeft.seconds}</h1>
<p>SECONDS</p>
</div>

</div>

<div className="date">

<h3>JUNE 2026</h3>

<p>Exact date will be announced soon</p>

</div>

</div>

)

}

export default About