import * as React from "react";
import { Pages } from "..";

export const useDashboard = () => {
  const memoizedStudentPages: Pages[] = React.useMemo(() => {
    return [
      {
        label: "Test",
        path: "/dashboard/student/exams",
      },
      {
        label: "Mata Kuliah",
        path: "/dashboard/student/subject",
      },
      {
        label: "Hasil Test",
        path: "/dashboard/student/results",
      },
    ] as Pages[];
  }, []);

  const memoizedTeacherPages: Pages[] = React.useMemo(() => {
    return [
      {
        label: "Buat Test",
        path: "/dashboard/teacher/create-exams",
      },
      {
        label: "Test Saya",
        path: "/dashboard/teacher/exams",
      },
    ] as Pages[];
  }, []);

  return {
    memoizedStudentPages,
    memoizedTeacherPages,
    // memoizedTeachersStudents,
  };
};
