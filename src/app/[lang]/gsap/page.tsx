"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const container = useRef(null);

  useGSAP(
    () => {

    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <section className="intro">
        <h1>Every idea begins as a single image</h1>
      </section>

      <section className="sticky">
        <div className="sticky-header">
          <h1>Three pillars with one purpose</h1>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-front">
              <img />
            </div>
            <div className="card-back">
              <span>01</span>
              <p>Interactive Web Experience</p>
            </div>

          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Every transition leaves a trace</h1>
      </section>
    </div>
  );
};

export default Page;
