import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { USER } from "../../data";
function Header() {
  const [isShow, setIsShow] = useState(false);
  const [showNav, setShowNav] = useState("");
  const handleClick = (e: any) => {
    console.log(e);
    if (!isShow) {
      setIsShow(true);
      setShowNav("showNav");
      console.log("show Nav...");
      e.target.innerHTML = `&times;`;
    } else {
      setIsShow(false);
      setShowNav("");
      console.log("hide Nav...");
      e.target.innerHTML = `<div class="bar mt-1"></div>
      <div class="bar"></div>
      <div class="bar"></div>`;
    }
    // setShowNav('showNav');
    // console.log('this btn is clicked...');
  };
  return (
    <div>
      <nav id="navbar" className="container navbar">
        <div>
          <Link className="text-light" to="/">
            {USER.name ?? 'Marc Sitze'}
          </Link>
        </div>
        {/* <button
          className="navbar-toggler"
          type="button"
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button> */}
        <button className="btn btn-nav" onClick={(e) => handleClick(e)}>
          <div className="bar mt-1"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        <div className="" id="myNavbar">
          <ul className="nav-ul mx-auto">
            {/* <li className="nav-item">
              <a className="text-light nav-link m-2 text-capitalize nav-active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="text-light nav-link m-2 text-capitalize" href="#skills">
                Skills
              </a>
            </li>

            <li className="nav-item">
              <a className="text-light nav-link m-2 text-capitalize" href="#about">
                Resume
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className="text-light nav-link m-2 text-capitalize" href="#projects">
                projects
              </a>
            </li>
            <li className="nav-item">
              <a className="text-light nav-link m-2 text-capitalize" href="#reviews">
                reviews
              </a>
            </li>
            <li className="nav-item">
              <a className="text-light nav-link m-2 text-capitalize" href="/youtube">
                videos
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
      <div className={`navigation ${showNav}`}>
        <div className="p-3 mt-2">
          <a className="text-light brand" href="/">
            {USER.name}
          </a>
        </div>
        <div className="mobile-nav">
          <div>
            <ul>
              <li className="text-light"><Link className="text-light" to="/resume">Resume</Link></li>
              <li className="text-light"><Link className="text-light" to="/portfolio">Portfolio</Link></li>
              <li className="text-light"><Link className="text-light" to="/portfolio">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
