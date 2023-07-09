import { DashboardPageContainer, ExamEvaluate } from "@/features";
import * as React from "react";

export const ExamEvaluatePage = React.memo(function ExamEvaluatePage() {
  return (
    <DashboardPageContainer>
      <ExamEvaluate />
    </DashboardPageContainer>
  );
});
