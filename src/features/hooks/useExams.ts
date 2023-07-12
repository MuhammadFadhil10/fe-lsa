import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AnswerBody,
  Exam,
  ExamResult,
  Exams,
  UserPayload,
  setAuthToken,
  useDataMutation,
} from "..";
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

  const { data: rawExamsResults } = useQuery({
    queryFn: user.role === "student" ? Exams.getExamResults : () => undefined,
    queryKey: ["exams-results"],
  });

  const { mutateAsync: createExamMutation, isLoading: createExamLoading } =
    useDataMutation("CREATE_EXAM", ["teacher-exams"]);

  const { mutateAsync: startExamMutation } = useDataMutation("START_EXAM", [
    "student-exams",
  ]);

  const { mutateAsync: submitExamMutation, isLoading: submitExamLoading } =
    useDataMutation("SUBMIT_EXAM", ["student-exams", "teacher-exams"]);

  const { mutateAsync: evaluateExamMutation, isLoading: evaluateExamLoading } =
    useDataMutation("EVALUATE_EXAM", ["teacher-exams"]);

  const [startExamError, setStartExamError] = React.useState("");

  // memo
  const memoizedExams = React.useMemo(() => {
    if (!rawExams) return [];

    return rawExams.data?.data as Exam[];
  }, [rawExams]);

  const memoizedExamsResults: ExamResult[] = React.useMemo(() => {
    if (!rawExamsResults) return [];

    return rawExamsResults.data?.data;
  }, [rawExamsResults]);

  const isParticipated = React.useCallback(
    (exam: Exam) => {
      return (
        exam?.participants.findIndex((p) => p.studentId === user._id) !== -1 &&
        exam?.participants.findIndex((p) => p.examToken === exam.examToken) !==
          -1
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
      } catch (error: any) {
        console.log("error create exam: ", error.message);
      }
    },
    [createExamMutation, navigate]
  );

  const handleStartExam = React.useCallback(
    async (examToken: string, examId: string) => {
      try {
        const response = await startExamMutation({ examToken, examId });

        localStorage.setItem("user-token", response?.data?.token);
        localStorage.setItem(
          "user-loggedin",
          JSON.stringify(response?.data?.user)
        );

        setAuthToken(response?.data?.token);

        setStartExamError("");
      } catch (error: any) {
        console.log("start exam error: ", error.response.data.message);

        setStartExamError((error as any).response.data.message);
      }
    },
    [startExamMutation]
  );

  const handleSubmitExam = React.useCallback(
    async (answers: AnswerBody[], examId: string) => {
      try {
        await submitExamMutation({ answers, examId });
        navigate("/dashboard/student/exams-results");
      } catch (error: any) {
        console.log("submit exam err: ", error.message);
      }
    },
    [navigate, submitExamMutation]
  );

  const handleEvaluateExam = React.useCallback(
    async (examId: string, studentId: string, method: string) => {
      try {
        evaluateExamMutation({ examId, studentId, method });
      } catch (error: any) {
        console.log("evaluate exam err: ", error.message);
      }
    },
    [evaluateExamMutation]
  );

  const trimAnswer = React.useCallback((text: string) => {
    return text.substring(0, 150) + "...";
  }, []);

  return {
    user,
    memoizedExams,
    memoizedExamsResults,
    startExamError,
    createExamLoading,
    submitExamLoading,
    evaluateExamLoading,
    handleStartExam,
    isParticipated,
    createExamMutation,
    handleCreateExams,
    handleSubmitExam,
    handleEvaluateExam,
    trimAnswer,
  };
};
