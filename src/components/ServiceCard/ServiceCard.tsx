import React from "react";
import { IService } from "../../types";

const ServiceCard = ({ title, description }: IService) => {
  return (
    <div className="about-box px-0 mb-3 col-md-6">
      <i className="fa fa-star fa-2x text-main mr-4"></i>
      <div className="about-text">
        <h3 className="text-light">{title}</h3>
        <p className="text-light">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
