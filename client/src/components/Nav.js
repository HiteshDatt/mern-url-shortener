import React from 'react';
import { Link } from "react-router-dom";
import Logo from './../assets/logo.png'

function Nav() {
    return (
    <header>
        <div className="logo"> <Link to="/"><img src={Logo} alt="logo"/></Link></div>
        <input type="checkbox" id="nav-check"/>
        <label htmlFor="nav-check">
        <nav><div></div><div></div><div></div></nav>
        </label>
        <div className="nav-links">
            <div><Link to="/">Home</Link></div> 
            <div><Link to="/about">About us</Link></div> 
            <div><Link to="/shorten">URL Shortener</Link></div>
        </div>
    </header>
    )
}

export default Nav
