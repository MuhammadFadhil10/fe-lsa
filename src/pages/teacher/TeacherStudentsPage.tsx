import { DashboardPageContainer, TeacherStudents } from "@/features";
import * as React from "react";

export const TeacherStudentsPage = React.memo(function TeacherStudentsPage() {
  return (
    <DashboardPageContainer>
      <TeacherStudents />
    </DashboardPageContainer>
  );
});
