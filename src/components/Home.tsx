import React, { useState } from "react";
import Form from './contact/Form';
import banner1 from '../assets/img/banner-1.jpeg';
import code from '../assets/img/code-1.png';
import solo from '../assets/img/solo_1.png';
import project1 from '../assets/img/projects-coffee-1.jpeg';
import project2 from '../assets/img/projects-coffee-2.jpeg';
import project3 from '../assets/img/projects-tea-1.jpeg';
import project4 from '../assets/img/projects-tea-2.jpeg';
import ezec from '../assets/img/ezec.jpg';
import marc from '../assets/img/top2.jpg';
import vid1 from '../assets/video/waterCaustics.mp4';
import vid2 from '../assets/video/waterCaustics.ogg';
import { useSpring, animated } from 'react-spring';


function Home() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }});

  const [theme, setTheme] = useState('light');
  window.onscroll = (e) => {
    console.log(window.pageYOffset);
    const position = window.pageYOffset;
    if(position > 500 ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <div>
      <animated.header style={props} id="header">
        <div className="overlay"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col no-padding">
              <video>
                <source src={vid1} type="video/mp4" />
                <source src={vid2} type="video/ogg" />
              </video>
            </div>
          </div>
        </div>
      </animated.header>

      <section id="skills" className={"pb-5 " + theme }>
        <div className="container">
          {/* <!--     title--> */}
          <div className="row title mb-5">
            <div className="col text-center">
              <h1 className="text-uppercase">my skills</h1>
              <h3 className="text-capitalize">A brief overview of my stack.</h3>
              <a href="fgfdg" className="mb-0">
                <i className="far fa-check-square"></i>
              </a>
              <div className="title-underline"></div>
            </div>
          </div>
          {/* <!--      end of title--> */}
          <div className="row">
            {/* <!--       item--> */}
            <div className="col-lg-6 my-5">
              <div className="row">
                <div className="col-6 d-flex align-items-center skills-icon">
                  <span>
                    <i className="fab fa-html5"></i>
                  </span>
                </div>
                <div className="col-6">
                  <h3 className="text-uppercase">html</h3>
                  <p className="text-muted">
                    A markup language used in building the architecture and
                    skeleton of a website. It's not a programming language
                  </p>
                </div>
              </div>
            </div>
            {/* <!--        item-->
        <!--       item--> */}
            <div className="col-lg-6 my-5">
              <div className="row">
                <div className="col-6 d-flex align-items-center skills-icon">
                  <span>
                    <i className="fab fa-css3"></i>
                  </span>
                </div>
                <div className="col-6">
                  <h3 className="text-uppercase">css</h3>
                  <p className="text-muted">
                    Cascading style sheet used to format the layout of web
                    pages. They can be used to define text styles, table sizes
                    and other aspects of web pages.
                  </p>
                </div>
              </div>
            </div>
            {/* <!--        item-->
        <!--       item--> */}
            <div className="col-lg-6 my-5">
              <div className="row">
                <div className="col-6 d-flex align-items-center skills-icon">
                  <span>
                    <i className="fab fa-js"></i>
                  </span>
                </div>
                <div className="col-6">
                  <h3 className="text-uppercase">javascript</h3>
                  <p className="text-muted">
                    Is a dynamic computer programming language. Its
                    implementation allow client-side script to interact with the
                    user and make dynamic pages. It is object oriented.
                  </p>
                </div>
              </div>
            </div>
            {/* <!--        item-->
        <!--       item--> */}
            <div className="col-lg-6 my-5">
              <div className="row">
                <div className="col-6 d-flex align-items-center skills-icon">
                  <span>
                    <i className="fab fa-node-js"></i>
                  </span>
                </div>
                <div className="col-6">
                  <h3 className="text-uppercase">node</h3>
                  <p className="text-muted">
                    Nodejs is a runtime environment for executing javascript on
                    the server side. It is most popular for it's ease in
                    building fast and scalable network applications (Backend).
                  </p>
                </div>
              </div>
            </div>
            {/* <!--        item-->
        <!--       item-->
        <!-- <div className="col-lg-6 my-5">
          <div className="row">
            <div className="col-6 d-flex align-items-center skills-icon">
              <span><i className="fab fa-angular"></i></span>
            </div>
            <div className="col-6">
              <h3 className="text-uppercase">angular</h3>
              <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, architecto iusto est aliquid, corporis excepturi cupiditate iure hic accusantium fugiat.</p>
            </div>
          </div>
        </div> --> */}
            {/* <!--        item-->
        <!--       item--> */}
            <div className="col-lg-6 my-5">
              <div className="row">
                <div className="col-6 d-flex align-items-center skills-icon">
                  <span>
                    <i className="fab fa-react"></i>
                  </span>
                </div>
                <div className="col-6">
                  <h3 className="text-uppercase">react</h3>
                  <p className="text-muted">
                    Reactjs is a javascript library for building frontend web
                    applications or UI. Reactjs allows us to create reusable UI
                    components, efficient and fast web applications. It is
                    developed by facebook.
                  </p>
                </div>
              </div>
            </div>
            {/* <!--        item--> */}
          </div>
        </div>
      </section>

      <section id="about" className="pb-5">
        {/* <!--video filler--> */}
        {/* <!-- <article id="modal-filler" className="d-flex align-items-center justify-content-center">
     
      <a href="#"><i className="fas fa-play-circle" data-toggle="modal" data-target="#myModal"></i></a>






    </article> --> */}
        {/* <!-- end of video fliller--> */}
        <div className="container">
          {/* <!--     title--> */}
          <div className="row title my-5">
            <div className="col text-center">
              <h1 className="text-uppercase">about me</h1>
              {/* <!-- <h3 className="text-capitalize">Lorem ipsum dolor sit amet.</h3> --> */}
              <a href="fgfdg" className="mb-0 pt-5">
                <i className="fas fa-globe"></i>
              </a>
              <div className="title-underline"></div>
            </div>
          </div>
          {/* <!--      end of title--> */}
          <div className="row mb-5">
            <div className="col-md-6">
              <img className="img-responsive w-100 h-75" src={marc} alt="" />
            </div>
            <div className="col-md-6 py-5 about-text text-center">
              <h2 className="text-uppercase">
                always learning and pushing boundries
              </h2>
              <p className="lead text-light">
                I'm a junior fullstack javascript developer, I took a MERN stack
                course on udemy where I learned web app developement from
                scratch using the web technologies listed beside and obtained
                the certificate. I have good practices and write clean code easy
                for maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-5">
        <div className="container">
          {/* <!--     title--> */}
          <div className="row title mb-5">
            <div className="col text-center">
              <h1 className="text-uppercase">projects</h1>
              <h3 className="text-capitalize">some basic websites.</h3>
              <a href="fgfdg" className="mb-0">
                <i className="fas fa-camera"></i>
              </a>
              <div className="title-underline"></div>
            </div>
          </div>
          {/* <!--      end of title-->
      <!--      button row--> */}
          <div className="row">
            <div className="col text-center">
              <div
                className="btn-group btn-group-lg mb-5 button-group filter-button-group"
                role="group"
              >
                <button
                  type="button"
                  className="btn text-uppercase"
                  data-filter="*"
                >
                  all
                </button>
                <button
                  type="button"
                  className="btn text-uppercase"
                  data-filter=".code"
                >
                  code
                </button>
                <button
                  type="button"
                  className="btn text-uppercase"
                  data-filter=".website"
                >
                  website
                </button>
                <button
                  type="button"
                  className="btn text-uppercase"
                  data-filter=".game"
                >
                  game
                </button>
              </div>
            </div>
          </div>
          {/* <!--      images row--> */}
          <div className="row grid projects">
            <div className="col-sm-6 col-md-4 my-3 code">
              <article className="img-container">
                <img
                  src={code}
                  width="100%"
                  className="img-fluid rounded project-image"
                  alt=""
                />
                <a href="fgfdg" className="search-link">
                  <i className="fas fa-search"></i>
                </a>
              </article>
            </div>
            <div className="col-sm-6 col-md-4 my-3 website">
              <article className="img-container">
                <img
                  src={solo}
                  width="100%"
                  className="img-fluid rounded project-image"
                  alt=""
                />
                <a href="fgfdg" className="search-link">
                  <i className="fas fa-search"></i>
                </a>
              </article>
            </div>
            <div className="col-sm-6 col-md-4 my-3 website">
              <article className="img-container">
                <img
                  src="/img/solo_6.png"
                  width="100%"
                  className="img-fluid rounded project-image"
                  alt=""
                />
                <a href="fgfdg" className="search-link">
                  <i className="fas fa-search"></i>
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="current-project" className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 py-5 about-text text-center align-self-center">
              <h2 className="text-uppercase">current project</h2>
              <p className="lead text-light">
                I'm currently working on building a social network where every
                body can relax and laugh.
              </p>
              <a
                href="https://afromeme.herokuapp.com"
                className="btn btn-lg d-block w-75 mx-auto text-uppercase mb-5"
              >
                learn more
              </a>
            </div>
            <div className="col-md-6 current-project-photo my-5">
              <img
                src={project1}
                width="100%"
                className="current-project current-project-1 img-thumbnail"
                alt=""
              />
              <img
                src={project2}
                width="100%"
                className="current-project current-project-2 img-thumbnail"
                alt=""
              />
              <img
                src={project3}
                width="100%"
                className="current-project current-project-3 img-thumbnail"
                alt=""
              />
              <img
                src={project4}
                width="100%"
                className="current-project current-project-4 img-thumbnail"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section id="values" className="py-5">
        {/* <!--     title--> */}
        <div className="row title mb-5">
          <div className="col text-center">
            <h1 className="text-uppercase">my values</h1>
            {/* <!-- <h3 className="text-capitalize">Lorem ipsum dolor sit amet.</h3> --> */}
            <a href="fgfdg" className="mb-0">
              <i className="fas fa-rocket"></i>
            </a>
            <div className="title-underline"></div>
          </div>
        </div>
        {/* <!--      end of title--> */}

        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4 value text-center my-3">
              <span className="value-icon">
                <i className="fas fa-utensils fa-fw"></i>
              </span>
              <span className="value-number">1</span>
              <h1 className="my-2 text-uppercase">eat</h1>
            </div>
            <div className="col-sm-6 col-lg-4 value text-center my-3">
              <span className="value-icon">
                <i className="fas fa-code fa-fw"></i>
              </span>
              <span className="value-number">2</span>
              <h1 className="my-2 text-uppercase">code</h1>
            </div>
            <div className="col-sm-6 col-lg-4 mx-auto value text-center my-3">
              <span className="value-icon">
                <i className="fas fa-bed fa-fw"></i>
              </span>
              <span className="value-number">3</span>
              <h1 className="my-2 text-uppercase">sleep</h1>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="row">
          <div className="col py-5">
            <div
              id="customer-slider"
              className="carousel slide"
              data-ride="carousel"
            >
              {/* <!--    indicators--> */}
              <ol className="carousel-indicators">
                <li
                  data-target="#customer-slider"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#customer-slider" data-slide-to="1"></li>
                <li data-target="#customer-slider" data-slide-to="2"></li>
              </ol>
              {/* <!--  indicators--> */}
              <div className="carousel-inner">
                <div className="carousel-item active py-5">
                  <div className="container text-center col-10 col-sm-8 mx-auto">
                    <img
                      src="/img/leducprof.jpg"
                      width="150px"
                      className="img-fluid rounded-circle"
                      alt=""
                    />
                    <div className="customer-text">
                      <h3 className="text-capitalize my-2">Leduc Tawamba</h3>
                      <h4 className="text-capitalize">
                        ITSCHOOL INTERNATIONAL
                      </h4>
                      <p className="lead">
                        <span>
                          <i className="fas fa-quote-left mr-2"></i>
                        </span>
                        I wanted to launch online training classNamees but I
                        didn't have a website nor a way to collect students
                        informations then I came in contact with @theblackdev
                        and he proposed me a contact form with full validation
                        and free hosting plan, I couldn't refuse this offer.
                        Till today I'm impressed by his work.
                      </p>
                      <div className="ratings">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        {/* <!-- <i className="far fa-star"></i> --> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item  py-5">
                  <div className="container text-center col-10 col-sm-8 mx-auto">
                    <img
                      src={banner1}
                      width="150px"
                      className="img-fluid rounded-circle"
                      alt=""
                    />
                    <div className="customer-text">
                      <h3 className="text-capitalize my-2">customer name</h3>
                      <h4 className="text-capitalize">company</h4>
                      <p className="lead">
                        <span>
                          <i className="fas fa-quote-left mr-2"></i>
                        </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quis dignissimos ducimus deserunt dicta eaque,
                        neque, et harum ut consequuntur impedit.
                      </p>
                      <div className="ratings">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item py-5">
                  <div className="container text-center col-10 col-sm-8 mx-auto">
                    <img
                      src={banner1}
                      width="150px"
                      className="img-fluid rounded-circle"
                      alt=""
                    />
                    <div className="customer-text">
                      <h3 className="text-capitalize my-2">customer name</h3>
                      <h4 className="text-capitalize">company</h4>
                      <p className="lead">
                        <span>
                          <i className="fas fa-quote-left mr-2"></i>
                        </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quis dignissimos ducimus deserunt dicta eaque,
                        neque, et harum ut consequuntur impedit.
                      </p>
                      <div className="ratings">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#customer-slider"
                role="button"
                data-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#customer-slider"
                role="button"
                data-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="websitem" className="py-5">
        <div className="container">
          {/* <!--     title--> */}
          <div className="row title mb-5">
            <div className="col text-center">
              <h1 className="text-uppercase">my comrades</h1>
              {/* <!-- <h3 className="text-capitalize">Lorem ipsum dolor sit amet.</h3> --> */}
              <a href="fgfdg" className="mb-0">
                <i className="far fa-check-square"></i>
              </a>
              <div className="title-underline"></div>
            </div>
          </div>

          <div className="row">
            <article className="websitem-member col-sm-6 col-lg-4 my-3">
              <div className="member-container">
                <img
                  src={ezec}
                  className="img-fluid websitem-image"
                  alt=""
                />

                <div className="member-info d-flex justify-content-around ">
                  <div className="member-text">
                    <h3 className="text-capitalize">thezetsu</h3>
                    <h5 className="text-capitalize text-muted">
                      graphic designer
                    </h5>
                    <div className="websitem-icons">
                      <a
                        href="https://www.facebook.com/landrysitze"
                        className="mr-2"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UC9RJ_XrfaInTi6XFGfvy6fg"
                        className="mx-2"
                      >
                        <i className="fab fa-youtube"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/thezetsu"
                        className="mx-2"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                      {/* <!-- <a href="#" className="mx-2"><i className="fab fa-linkedin"></i></a> --> */}
                    </div>
                  </div>
                  <div className="member-icon align-self-center">
                    <a href="fgfdg">
                      <i className="fas fa-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="py-5">
        <div className="container">
          <div className="row height-60 align-items-baseline">
            <div className="col-lg-6 col-sm-10 mx-auto my-3 ">
              <div className="card text-center">
                <div className="card-header text-centertext-uppercase">
                  <h1 className="text-uppercase">contact form</h1>
                </div>
                <div className="card-body">
                  <div className="errors"></div>
                  {/* <!-- Insert form here -->
              <%- include('./form.ejs') %> */}
              <Form />
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block  text-center mb-5 align-self-center">
              {/* <!-- <img src="img/banner-1.jpeg" alt="images" className="img-fluid rounded"> -->
          <!-- <img src="/img/banner-1.jpeg" alt="images" className="img-fluid rounded"> --> */}
              <img
                src={marc}
                style={{ height: "650px" }}
                alt="my profile"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
