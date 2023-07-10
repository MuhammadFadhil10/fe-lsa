import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { User, useDataMutation } from "..";

export const useTeacher = () => {
  const { data: rawTeacherStudents } = useQuery({
    queryFn: User.getTeachersStudents,
    queryKey: ["teacher-students"],
  });

  const { data: rawAllStudents } = useQuery({
    queryFn: User.getAllStudents,
    queryKey: ["students"],
  });

  const {
    mutateAsync: toggleAddStudentMutation,
    isLoading: toggleAddStudentLoading,
  } = useDataMutation("TOGGLE_ADD_STUDENT", ["teacher-students"]);

  const memoizedTeacherStudents = React.useMemo(() => {
    if (!rawTeacherStudents) return [];

    return rawTeacherStudents;
  }, [rawTeacherStudents]);

  const memoizedAllStudents = React.useMemo(() => {
    if (!rawAllStudents) return [];

    return rawAllStudents;
  }, [rawAllStudents]);

  const memoizedTeacherStudentsIds: string[] = React.useMemo(() => {
    return memoizedTeacherStudents.map((student: any) => student._id);
  }, [memoizedTeacherStudents]);

  const handleToggleAddStudent = React.useCallback(
    async (studentIds: string[]) => {
      try {
        toggleAddStudentMutation(studentIds);
      } catch (error) {
        console.log("error toggle add student: ", error);
      }
    },
    [toggleAddStudentMutation]
  );

  return {
    memoizedTeacherStudents,
    memoizedAllStudents,
    memoizedTeacherStudentsIds,
    toggleAddStudentLoading,
    handleToggleAddStudent,
  };
};
