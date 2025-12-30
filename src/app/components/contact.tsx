import { MarcSitze, WhatsappIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDictionary, LocaleType } from "../dictionaries";

const Contact = ({
  isDark,
  dictionary
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const { scrollY } = useScroll();
  const [increment, setIncrement] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIncrement(latest);
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const img = imageRef.current;
    const wrapper = cardWrapperRef.current;
    const cardNode = wrapper?.querySelector(
      'div[data-slot="card"]'
    ) as HTMLElement | null;

    if (img) {
      gsap.fromTo(
        img,
        { x: -80, opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (cardNode) {
      gsap.fromTo(
        cardNode,
        { x: 80, opacity: 0, rotate: 1 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardNode,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf([img as Element, cardNode as Element]);
    };
  }, []);

  const contactMethods = [
    {
      icon: <Mail size={25} />,
      title: dictionary.getinTouch.emailAddress,
      detail: "marcsitze01@gmail.com",
    },
    {
      icon: <PhoneCall size={25} />,
      title: dictionary.getinTouch.phoneNumber,
      detail: "+237 699576276",
    },
    {
      icon: (
        <p className="p-0 hover:cursor-pointer">
          <Link href="https://wa.me/+23799576276">
            <img src={WhatsappIcon} alt="WhatsApp" className="w-6" />
          </Link>
        </p>
      ),
      title: dictionary.getinTouch.whatsappNumber,
      detail: (
        <Link target="_blank" href="https://wa.me/+23799576276">
          +237 99576276
        </Link>
      ),
    },
    {
      icon: <MapPin size={25} />,
      title: dictionary.getinTouch.location,
      detail: "Douala, Cameroon",
    },
    {
      icon: <Clock size={25} />,
      title: dictionary.getinTouch.workingHours,
      detail: "Mon-Sun 8:00 AM - 5:00 PM",
    },
  ];

  return (
    <div ref={ref}>
      <motion.h2
        className="my-25 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ scale: isMobile ? 1 : increment / 1000 + 1 }}
      >
        {dictionary.getinTouch.title}
      </motion.h2>
      <div className="container grid gap-6 md:grid-cols-2 mx-auto md:px-4 mb-20">
        <div>
          <img
            ref={imageRef}
            className="rounded-md"
            src={MarcSitze}
            alt="Marc Sitze - Frontend Developer"
          />
        </div>
        <div>
          <div ref={cardWrapperRef} style={{ display: "contents" }}>
            <Card className="flex flex-col justify-center h-full">
              <div className="mx-6">
                <h1 className="text-2xl font-bold mb-5">{dictionary.getinTouch.contactMe}</h1>
                <p className="mb-0">
                  {dictionary.getinTouch.tagLine}
                </p>
              </div>
              <CardContent>
                {contactMethods.map((method, index) => (
                  <ContactItem
                    key={index}
                    icon={method.icon}
                    title={method.title}
                    detail={method.detail}
                    isLast={index === contactMethods.length - 1 ? true : false}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

function ContactItem({
  icon,
  title,
  detail,
  isLast,
}: {
  isLast: boolean;
  icon: React.ReactNode;
  title: string;
  detail: string | React.ReactNode;
}) {
  const itemRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const iconEl = el.querySelector("svg, img") as Element | null;

    const tween = gsap.fromTo(
      el,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      }
    );

    let iconTween: GSAPTween | null = null;
    if (iconEl) {
      iconTween = gsap.fromTo(
        iconEl,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(1.4)",
          delay: 0.05,
        }
      );
    }

    return () => {
      if (tween && tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
      if (iconTween) iconTween.kill();
    };
  }, []);

  return (
    <div ref={itemRef} className="w-full my-6" data-contact-item>
      <p className="font-semibold text-gray-500">{title}</p>
      <div className="flex items-center py-2 mb-6">
        <div className="mr-4">{icon}</div>
        <div className="font-semibold">{detail}</div>
      </div>
      {!isLast && <Separator />}
    </div>
  );
}
