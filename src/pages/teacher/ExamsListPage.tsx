import { DashboardPageContainer, ExamsSection } from "@/features";
import * as React from "react";

export const ExamListPage = React.memo(function ExamListPage() {
  return (
    <DashboardPageContainer>
      <ExamsSection />
    </DashboardPageContainer>
  );
});
