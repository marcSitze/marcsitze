"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react'

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  // const tl = gsap.matchMedia()
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c",
      start: "top center",
      end: "top 100px",
      markers: true,
      scrub: 3,
      pin: "ghost",
      toggleClass: "bg-yellow-500",
      // pin: true,
      // pinSpacing: false,
    }
  })
  const container = useRef(null);

  useGSAP(() => {
    // tl.add({
    //   isMobile: "(max-width: 767px)",
    //   isDesktop: "(min-width: 768px)",
    // }, (context) => {
    //   console.log({context: context.conditions });
    // })

    // gsap.to(".box", { x: 300, rotation: 360, duration: 2 })
    // gsap.to(".c", {
    //   scrollTrigger: {
    //     trigger: ".c",
    //     start: "top center",
    //     markers: true,
    //     scrub: 2,
    //   },
    //   x: 400,
    //   rotate: 360,
    //   duration: 3,
    // })

    tl.to(".c", {
      x: 400,
      rotate: 360,
      ease: "power1.inOut",
      duration: 3,
    });

    gsap.to(".green", {
      y: 100,
      ease: "back.in",
      duration: 0.3,
      stagger: {
        each: 0.1,
        from: "random"
        // grid: "auto",
      }
    })

    const ntl = gsap.timeline()

    ntl.to(".orange", { x: 300, duration: 1 })
      .to(".yellow", { x: 300, duration: 1 })
      .to(".purple", { x: 300, duration: 1 })

  }, { scope: container })

  return (
    <div ref={container}>
      page
      <div className="box a bg-red-500 w-20 h-20">a</div>
      <div className="box b bg-blue-500 w-20 h-20">b</div>
      <div className='flex'>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className={`bg-green-500 green w-20 h-20 mr-2`}>
          </div>
        ))}
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="box orange bg-orange-500 w-20 h-20">a</div>
      <div className="box yellow bg-yellow-500 w-20 h-20">b</div>
      <div className="box purple bg-purple-500 w-20 h-20">b</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="box c bg-green-500 w-20 h-20">c</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Page