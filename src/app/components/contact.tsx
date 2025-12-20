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
import React, { useRef, useState } from "react";

const Contact = ({ isDark }: { isDark?: boolean }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const { scrollY } = useScroll();
  const [increment, setIncrement] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIncrement(latest);
  });

  const contactMethods = [
    {
      icon: <Mail size={25} />,
      title: "Email Address",
      detail: "marcsitze01@gmail.com",
    },
    {
      icon: <PhoneCall size={25} />,
      title: "Phone Number",
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
      title: "Whatsapp Number",
      detail: <Link target="_blank" href="https://wa.me/+23799576276">+237 99576276</Link>,
    },
    {
      icon: <MapPin size={25} />,
      title: "Location",
      detail: "Douala, Cameroon",
    },
    {
      icon: <Clock size={25} />,
      title: "Working Hours",
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
        Get in Touch
      </motion.h2>
      <div className="container grid gap-6 md:grid-cols-2 mx-auto px-4 mb-20">
        <div>
          <img className="rounded-md" src={MarcSitze} alt="Marc Sitze" />
        </div>
        <div>
          <Card className="flex flex-col justify-center h-full">
            <div className="mx-6">
              <h1 className="text-2xl font-bold mb-5">Contact Me</h1>
              <p className="mb-0">
                I&apos;d love to hear from you! Whether you have a question
                about my services, pricing, or anything else, feel free to reach
                out.
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
  return (
    <div className="w-full my-6">
      <p className="font-semibold text-gray-500">{title}</p>
      <div className="flex items-center py-2 mb-6">
        <div className="mr-4">{icon}</div>
        <div className="font-semibold">{detail}</div>
      </div>
      {!isLast && <Separator />}
    </div>
  );
}
