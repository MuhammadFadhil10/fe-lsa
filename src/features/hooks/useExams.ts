import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Exam, Exams, UserPayload, useDataMutation } from "..";

export const useExams = () => {
  const user = JSON.parse(
    localStorage.getItem("user-loggedin") ?? "{}"
  ) as UserPayload;

  const { data: rawExams } = useQuery({
    queryFn: Exams.getExams,
    queryKey: ["exams"],
  });

  const { mutateAsync: startExamMutation } = useDataMutation("START_EXAM", [
    "exams",
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
    rawExams,
    memoizedExams,
    startExamError,
    handleStartExam,
    isParticipated,
  };
};
