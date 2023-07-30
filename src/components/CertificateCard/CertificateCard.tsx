import React from "react";
import dayjs from "dayjs"
import { ICertificate } from "../../types";

const CertificateCard = ({ data }: {data: ICertificate}) => {
  return (
    <div className="col-md-6 px-0">
      <div className="text-light certificate-box" style={{ width: "95%"}}>
        <div className="certificate-bg">{data.abrev}</div>
        <div className="certificates-text">
          <h4>{data.title}</h4>
          <h5>{dayjs(data.yearEnd).format("YYYY")}</h5>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
