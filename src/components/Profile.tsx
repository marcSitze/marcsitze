import Navbar from "./layouts/Header";
import Footer from "./layouts/Footer";
import { USER, services } from "../data";
import ServiceCard from "./ServiceCard/ServiceCard";

const Profile = (props: any) => {

  return (
    <div className="container">
      <div className="profile profile-dark pt-3 px-4">
        <Navbar />
        <div className="profile-content">
          <div className="profile-img"></div>
          <div className="profile-text col-md-5 col-sm-12">
            <h3 className="text-light">{USER?.title ?? "Web Developer"}</h3>
            <h2 className="text-light">{USER?.name ?? "Marc Sitze"}</h2>
            <p className="text-light">
              {USER?.description ??
                "Hey I'm a tech guy who loves solving problemes"}
            </p>
            <div className="profile-buttons">
              <a
                className="btn btn-cv btn-cv-light"
                rel="noreferrer"
                target="_blank"
                href={USER?.cvLink ?? "#"}
              >
                Download CV
              </a>
              <a
                className="btn btn-contact btn-contact-light"
                rel="noreferrer"
                href="/contact"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="about mx-4">
          <h3 className="about-title">What I Do</h3>
          <div className="about-boxes">
            <div className="row about-row d-flex justify-content-between mx-2">
              {services.map(item => <ServiceCard key={item.id} {...item} /> )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
