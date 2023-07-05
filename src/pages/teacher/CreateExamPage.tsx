import * as React from "react";
import { CreateExam, DashboardPageContainer } from "@/features";

export const CreateExamPage = React.memo(function CreateExamPage() {
  return (
    <DashboardPageContainer>
      <CreateExam />
    </DashboardPageContainer>
  );
});
