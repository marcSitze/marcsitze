import React, { useState, useEffect} from "react";
import Navbar from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import config from "../config";
import { CERTIFICATES, OTHER_SKILLS, RESUME, SKILLS } from "../data";
import ResumeCard from "../components/ResumeCard/ResumeCard";
import CertificateCard from "../components/CertificateCard/CertificateCard";

const Resume = (props: any) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    console.log('get user');
    fetch(config.API + '/user')
    .then(response => response.json())
    .then(result => {
      setUser(result?.user);
      console.log('result: ', result);
    })
    .catch(err => console.error('Some Err: ', err))
  }, []);
  return (
    <div className="container">
      <div className="profile profile-dark pt-3 px-4">
        <Navbar />
        <div className="resume-header mx-n4">
          <h2 className="text-light">Resume</h2>
        </div>
        <div className="educ-container">
          <div className="row mb-5">
            {/* <div className="col-6">
              <h3 className="text-light educ-title">Education</h3>
            </div>
            <div className="col-6">
              <h3 className="text-light educ-title">Experience</h3>
            </div> */}
            <div className="col-md-6">
            <h3 className="text-light educ-title">Education</h3>
              {RESUME?.map((data) =>
              <>
              {data?.mainType === 'EDUCATION' && <ResumeCard key={data.id} data={data} />}
              </>
              )}

            </div>
            <div className="col-md-6">
            <h3 className="text-light educ-title">Experience</h3>
            {RESUME?.map((data) => 
            <>
            {data?.mainType === 'EXPERIENCE' && <ResumeCard key={data.id} data={data} />}
              </>
            )}
            </div>
          </div>
              <h3 className="text-light certificates-title">Certificates</h3>
            <div className="row certificates">
              {CERTIFICATES.map(item => <CertificateCard key={item.id} data={item} />)}
            </div>
            <div className="row skills">
              <div className="col-md-6">
            <h3 className="text-light skills-title">Skills</h3>
            {SKILLS?.split(',').map((skill, index: number) => <span key={index} className="badge badge-pill badge-primary mr-1">{skill}</span>)}
              </div>
              <div className="col-md-6">
                <h3 className="text-light skills-title">Other Skills</h3>
                {OTHER_SKILLS?.split(',').map((skill, index: number) => <span key={index} className="badge badge-pill badge-secondary mr-1">{skill}</span>)}
              </div>
            </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Resume;
