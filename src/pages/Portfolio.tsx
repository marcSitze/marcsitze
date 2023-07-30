import Navbar from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const Portfolio = () => {
  return (
    <div className="container">
      <div className="profile profile-dark pt-3 px-4">
        <Navbar />
        <div className="resume-header mx-n4">
          <h2 className="text-light">Portfolio</h2>
        </div>
        <div className="portfolio-container">
          <div className="porfolio-menu">
            <ul>
              <li className="portfolio-active">All</li>
              <li className="">Web</li>
              <li className="">Mobile</li>
              <li className="">Design</li>
            </ul>
          </div>
          <div className="row mb-5">
            
            
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
