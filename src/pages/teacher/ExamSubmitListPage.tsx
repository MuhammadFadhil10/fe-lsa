import * as React from "react";
import { DashboardPageContainer, ExamSubmitList } from "@/features";

export const ExamSubmitListPage = React.memo(function ExamSubmitListPage() {
  return (
    <DashboardPageContainer>
      <ExamSubmitList />
    </DashboardPageContainer>
  );
});
