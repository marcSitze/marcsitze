import React from "react";
import dayjs from "dayjs"
import { ICertificate } from "../../types";

const CertificateCard = ({ data, isDark }: {data: ICertificate, isDark: boolean }) => {
  return (
    <div className="col-md-6 px-0">
      <div className={`${isDark ? "text-light border-white" : "text-black border-black"} certificate-box p-4 border-l border-b`}>
        <div className="certificate-bg font-semibold">{data.abrev}</div>
        <div className="certificates-text">
          <h4>{data.title}</h4>
          <h5>{dayjs(data.yearEnd).format("YYYY")}</h5>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;