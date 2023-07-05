import { CreateExam, DashboardPageContainer, useExams } from "@/features";
import * as React from "react";
import { useParams } from "react-router-dom";

export const EditExamPage = React.memo(function EditExamPage() {
  const { examId } = useParams();

  const { memoizedExams } = useExams();

  return (
    <DashboardPageContainer>
      <CreateExam
        defaultValues={{ ...memoizedExams.find((exam) => exam._id === examId) }}
      />
    </DashboardPageContainer>
  );
});
