import React from 'react';
import { Link } from "react-router-dom";
import HomeSvg from './../assets/home.png';

function Home() {
    return (
    <div className="home" id="home">
        <div className="heading">Branded Short URLs</div>
        <div className="subheading">Transform your long links to short brand specific URLs with your personally hosted database set by us for you!</div>
        <div className="contact button"><a href="mailto:hdk.hitesh26@gmail.com">Contact us</a></div>
        <div className="shorten button"><Link to="/shorten">Shorten links quick</Link></div>
        <img src={HomeSvg} alt="URL shortener"/>
    </div>
    )
}

export default Home
