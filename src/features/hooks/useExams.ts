import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Exam, Exams, UserPayload, useDataMutation } from "..";
import { useNavigate } from "react-router-dom";

export const useExams = () => {
  const user = JSON.parse(
    localStorage.getItem("user-loggedin") ?? "{}"
  ) as UserPayload;

  const navigate = useNavigate();

  const { data: rawExams } = useQuery({
    queryFn: user?.role === "student" ? Exams.getExams : Exams.getTeacherExams,
    queryKey: user?.role === "student" ? ["student-exams"] : ["teacher-exams"],
  });

  const { mutateAsync: createExamMutation, isLoading: createExamLoading } =
    useDataMutation("CREATE_EXAM", ["teacher-exams"]);

  const { mutateAsync: startExamMutation } = useDataMutation("START_EXAM", [
    "student-exams",
  ]);

  const [startExamError, setStartExamError] = React.useState("");

  // memo
  const memoizedExams = React.useMemo(() => {
    if (!rawExams) return [];

    return rawExams.data?.data as Exam[];
  }, [rawExams]);

  const isParticipated = React.useCallback(
    (exam: Exam) => {
      return (
        exam?.participants.findIndex((p) => p.studentId === user._id) !== -1
      );
    },
    [user._id]
  );

  // func
  const handleCreateExams = React.useCallback(
    async (body: Partial<Exam>) => {
      try {
        await createExamMutation(body);

        navigate("/dashboard/teacher/exams");
      } catch (error) {
        console.log("error create exam: ", (error as any).message);
      }
    },
    [createExamMutation, navigate]
  );

  const handleStartExam = React.useCallback(
    async (examToken: string) => {
      try {
        await startExamMutation(examToken);

        setStartExamError("");
      } catch (error) {
        console.log("start exam error: ", (error as any).response.data.message);

        setStartExamError((error as any).response.data.message);
      }
    },
    [startExamMutation]
  );

  return {
    user,
    memoizedExams,
    startExamError,
    createExamLoading,
    handleStartExam,
    isParticipated,
    createExamMutation,
    handleCreateExams,
  };
};
