import { CreateExam, DashboardPageContainer } from "@/features";
import * as React from "react";

export const CreateExamPage = React.memo(function CreateExamPage() {
  return (
    <DashboardPageContainer>
      <CreateExam />
    </DashboardPageContainer>
  );
});
