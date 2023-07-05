import * as React from "react";
import { Pages, User, UserPayload } from "..";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  const { data: rawTeachersStudents } = useQuery({
    queryFn: User.getTeachersStudents,
    queryKey: ["teachers-student"],
  });

  const memoizedTeachersStudents = React.useMemo(() => {
    if (!rawTeachersStudents) return [];

    return rawTeachersStudents as Partial<UserPayload>;
  }, [rawTeachersStudents]);

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
    memoizedTeachersStudents,
  };
};
