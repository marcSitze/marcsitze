"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import dayjs from "dayjs";
import { IResume } from "../../types";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const ResumeCard = ({ data, isDark }: { data: IResume; isDark: boolean }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (elRef.current) gsap.killTweensOf(elRef.current);
    };
  }, []);

  const handleEnter = () => {
    if (!elRef.current) return;
    const isMobile =
      typeof window !== "undefined" ? window.innerWidth <= 768 : false;
    if (isMobile) return; // disable hover animation on small screens
    gsap.to(elRef.current, { x: 50, duration: 0.35, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (!elRef.current) return;
    const isMobile =
      typeof window !== "undefined" ? window.innerWidth <= 768 : false;
    if (isMobile) return;
    gsap.to(elRef.current, { x: 0, duration: 0.45, ease: "power3.out" });
  };

  return (
    <div
      ref={elRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group ${
        isDark ? "text-light border-white" : "text-black border-black"
      } p-4 border-l border-b ${
        isDark
          ? "hover:bg-white hover:text-black"
          : "hover:bg-black/90 hover:text-white"
      } transition-colors duration-400 cursor-pointer`}
    >
      <div className="grid grid-cols-12 gap-4">
        {data?.logo && (
          <div className="col-span-3 sm:col-span-1">
            <img
              className="w-full"
              src={data?.logo}
              alt={data?.title}
            />
          </div>
        )}

        <div className="col-span-9 sm:col-span-11">
          <div className={`font-semibold text-sm md:text-2xl flex items-center`}>
            <span className="mr-2">
              {dayjs(data?.yearStart).format("YYYY/MM")} -{" "}
              {dayjs(data?.yearEnd).format("YYYY/MM")}
            </span>
            <div className="flex items-center">
              <span className="educ-header-text mr-2">{data.place}</span>
              {data?.link && (
                <Link
                  href={data?.link}
                  target="_blank"
                  className="group-hover:opacity-100 transition-opacity duration-300 opacity-0"
                >
                  <SquareArrowOutUpRight size={20} />
                </Link>
              )}
            </div>
          </div>
          <h4 className="mb-2 font-semibold flex items-center">{data.title}</h4>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
