"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import dayjs from "dayjs";
import { IResume } from "../../types";

const ResumeCard = ({ data, isDark }: { data: IResume; isDark: boolean }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (elRef.current) gsap.killTweensOf(elRef.current);
    };
  }, []);

  const handleEnter = () => {
    if (!elRef.current) return;
    const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
    if (isMobile) return; // disable hover animation on small screens
    gsap.to(elRef.current, { x: 50, duration: 0.35, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (!elRef.current) return;
    const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
    if (isMobile) return;
    gsap.to(elRef.current, { x: 0, duration: 0.45, ease: "power3.out" });
  };

  return (
    <div
      ref={elRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`${
        isDark ? "text-light border-white" : "text-black border-black"
      } p-4 border-l border-b ${
        isDark
          ? "hover:bg-white hover:text-black"
          : "hover:bg-black/90 hover:text-white"
      } transition-colors duration-400 cursor-pointer`}
    >
      <div className={`font-semibold`}>
        <span className="mr-2">
          {dayjs(data?.yearStart).format("YYYY/MM")} -{" "}
          {dayjs(data?.yearEnd).format("YYYY/MM")}
        </span>
        <span className="educ-header-text">{data.place}</span>
      </div>
      <h4 className="mb-2 text-gray-500 font-semibold">{data.title}</h4>
      <p>{data.description}</p>
    </div>
  );
};

export default ResumeCard;
