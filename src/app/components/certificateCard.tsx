import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import gsap from "gsap";
import { ICertificate } from "../../types";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

const CertificateCard = ({
  data,
  isDark,
}: {
  data: ICertificate;
  isDark: boolean;
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (elRef.current) gsap.killTweensOf(elRef.current);
    };
  }, []);

  const handleEnter = () => {
    if (!elRef.current) return;
    gsap.to(elRef.current, { x: 50, duration: 0.35, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (!elRef.current) return;
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
      } transition-colors duration-400 cursor-pointer group`}
    >
      <div className="flex">
        {data?.logo && (
          <img
            src={data?.logo}
            className="mr-4"
            alt={data?.title}
            width={100}
          />
        )}
        <div className={`font-semibold`}>
          <div className="flex items-center">
            <div className="certificate-bg font-semibold mr-2">
              {data.abrev}
            </div>
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
          <div className="certificates-text">
            <h4 className="mb-2 text-gray-500 font-semibold">{data.title}</h4>
            <h5>{dayjs(data.yearEnd).format("YYYY")}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
