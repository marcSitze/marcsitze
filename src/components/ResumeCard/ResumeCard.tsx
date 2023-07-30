import React from "react";
import dayjs from "dayjs";
import { IResume } from "../../types";

const ResumeCard = ({ data }: { data: IResume}) => {
  return (
    <div className="text-light educ-box">
      <div className="educ-header text-light">
        <span className="educ-date">{dayjs(data?.yearStart).format("YYYY")} - {dayjs(data?.yearEnd).format("YYYY")}</span>
        <span className="educ-header-text">{data.place}</span>
      </div>
      <h4>{data.title}</h4>
      <p>
        {data.description}
      </p>
    </div>
  );
};

export default ResumeCard;
