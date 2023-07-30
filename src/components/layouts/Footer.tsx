import React from "react";
import { socialLinks } from "../../data";

function Footer() {
  const date = new Date().getFullYear();

  return (
    <div>
      <hr className="hr-separator" />
      <div className="container d-flex pr-0 footer-container justify-content-between">
        <div>
          {socialLinks.map(item => (
            <a
            key={item.id}
            className="mr-4 text-gray"
            target="_blank"
            rel="noreferrer"
            href={item.link}
          >
            <i className={`fab fa-${item.name} text-light`}></i>
          </a>
          ))}
        </div>
        <p className="text-light">
          &copy; {date} All rights reserved.{" "}
          <span className="text-main">@theblackdev</span>.
        </p>
      </div>
    </div>
  );
}

export default Footer;
