import React from "react";
import dayjs from "dayjs";
import { IResume } from "../../types";

const ResumeCard = ({ data }: { data: IResume }) => {
  return (
    <div className="text-light p-4 border-l border-b border-white">
      <div className="text-light font-semibold">
        <span className="mr-2">{dayjs(data?.yearStart).format("YYYY/MM")} - {dayjs(data?.yearEnd).format("YYYY/MM")}</span>
        <span className="educ-header-text">{data.place}</span>
      </div>
      <h4 className="mb-2">{data.title}</h4>
      <p>
        {data.description}
      </p>
    </div>
  );
};

export default ResumeCard;