import * as React from "react";
import { ParticipantSubmitTable } from "./elements/ParticipantSubmitTable";

export const ExamEvaluate = React.memo(function ExamEvaluate() {
  return (
    <div className=" w-full">
      <ParticipantSubmitTable />
    </div>
  );
});
