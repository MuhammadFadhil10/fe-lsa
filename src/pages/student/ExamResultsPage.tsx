import { DashboardPageContainer, ExamResults } from "@/features";
import * as React from "react";

export const ExamResultsPage = React.memo(function ExamResultsPage() {
  return (
    <DashboardPageContainer>
      <ExamResults />
    </DashboardPageContainer>
  );
});
