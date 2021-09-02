import React from 'react';
import Founder1 from './../assets/founderone.jpg';
import Founder2 from './../assets/foundertwo.jpg';
import AboutSvg from './../assets/about.png';

function About() {
    return (
    <div className="about" id="about">
        <div className="heading"> We are...</div>
        <div className="founders">
            <div className="one">
                <img src={Founder1} alt="founder1"/>
                <div className="name">Hitesh Datt</div>
                <div className="skill">Developer</div>
                <div className="skill">Full-stack</div>
            </div>
            <div className="two">
                <img src={Founder2} alt="founder2"/>
                <div className="name">Keshav</div>
                <div className="skill">Marketing</div>
                <div className="skill">Design</div>
            </div>
        </div>
        <div className="subheading">We understand that every organization is unique, that's why we have designed HK urls to scale to the needs of your business.</div>
        <img src={AboutSvg} alt="About HK Urls"/>
    </div>
    )
}

export default About
