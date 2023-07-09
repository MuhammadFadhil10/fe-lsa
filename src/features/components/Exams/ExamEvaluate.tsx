import * as React from "react";
import { ParticipantSubmitTable } from "./elements/ParticipantSubmitTable";

export const ExamEvaluate = React.memo(function ExamEvaluate() {
  return (
    <div className=" w-full">
      <h1>Murid yang sudah mengerjakan</h1>
      <ParticipantSubmitTable />
    </div>
  );
});
