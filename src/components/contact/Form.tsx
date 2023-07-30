import React from "react";

function Form() {
  return (
    <div>
      <form id="form">
        <div className="input-group my-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="input-text">
              <i className="fas fa-user"></i>
            </span>
          </div>
          <input
            type="email"
            name="email"
            className="form-control form-control-lg"
            placeholder="Enter your email here"
          />
        </div>
        <div className="input-group my-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="input-phone">
              <i className="fas fa-phone"></i>
            </span>
          </div>
          <input
            type="number"
            name="phone"
            className="form-control form-control-lg text-capitalize"
            placeholder="Enter your phone number here"
          />
        </div>

        <div className="input-group my-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="input-email">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
          <input
            type="text"
            name="name"
            className="form-control form-control-lg text-capitalize"
            placeholder="Enter your name here"
          />
        </div>

        <div className="input-group my-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="input-username">
              <i className="fas fa-users"></i>
            </span>
          </div>
          {/* <!-- <input type="text" className="form-control form-control-lg text-capitalize" placeholder="Enter your username here"> --> */}
          <textarea name="message" id="" cols={44} rows={10}></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-block btn-lg text-uppercase contact-btn"
        >
          <i className="far fa-hand-point-right mr-2"></i>submit here
        </button>
      </form>
    </div>
  );
}

export default Form;
