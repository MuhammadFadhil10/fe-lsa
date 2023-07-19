import * as React from "react";
import { ParticipantSubmitTable } from "./elements/ParticipantSubmitTable";

export const ExamSubmitList = React.memo(function ExamSubmitList() {
  return (
    <div className=" w-full">
      <ParticipantSubmitTable />
    </div>
  );
});
