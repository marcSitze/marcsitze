"use client";
import { CERTIFICATES, RESUME } from '@/data/resume';
import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import CertificateCard from './certificateCard';
import ResumeCard from './resumeCard';

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const { scrollY } = useScroll()
  const [increment, setIncrement] = useState(0)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIncrement(latest)
  })


  return (
    <div className="container mx-auto">
      <div className="profile profile-dark pt-3 px-4">
        {/* <Navbar /> */}
        <div ref={ref} className="resume-header mx-n4">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ scale: isMobile ? 1 : increment / 1000 + 1 }}
          >
            Work Experience
          </motion.h2>
        </div>
        <div className="educ-container">
          <div className="row mb-5">
            {/* <div className="col-md-6">
              <h3 className="text-light educ-title">Education</h3>
              {RESUME?.map((data) =>
                <>
                  {data?.mainType === 'EDUCATION' && <ResumeCard key={data.id} data={data} />}
                </>
              )}

            </div> */}
            <div className="col-md-6">
              {/* <h3 className="text-light educ-title">Experience</h3> */}
              {RESUME?.sort((a, b) => +new Date(b.yearStart as string) - +new Date(a.yearStart as string)).map((data) =>
                <>
                  {data?.mainType === 'EXPERIENCE' && <ResumeCard key={data.id} data={data} />}
                </>
              )}
            </div>
          </div>
          {/* <h3 className="text-light certificates-title">Certificates</h3> */}
          <motion.h2
            className="my-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ scale: isMobile ? 1 : increment / 1000 + 1 }}
          >
            Certifications
          </motion.h2>
          <div className="row certificates">
            {CERTIFICATES.map(item => <CertificateCard key={item.id} data={item} />)}
          </div>
          {/* <div className="row skills">
            <div className="col-md-6">
              <h3 className="text-light skills-title">Skills</h3>
              {SKILLS?.split(',').map((skill, index: number) => <span key={index} className="badge badge-pill badge-primary mr-1">{skill}</span>)}
            </div>
            <div className="col-md-6">
              <h3 className="text-light skills-title">Other Skills</h3>
              {OTHER_SKILLS?.split(',').map((skill, index: number) => <span key={index} className="badge badge-pill badge-secondary mr-1">{skill}</span>)}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Experience