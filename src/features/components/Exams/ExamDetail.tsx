import * as React from "react";
import { DashboardPageContainer } from "..";
import { useParams } from "react-router-dom";
import { Exam, useExams } from "@/features";
import { ExamPreStart } from "./ExamPreStart";
import { ExamTest } from "./ExamTest";
import { ExamCountdown } from "./elements/ExamCountdown";

interface AnswerBody {
  questionId: string;
  answer: string;
}

export const ExamDetail = React.memo(function ExamDetail() {
  const { examId } = useParams();
  const {
    memoizedExams,
    handleStartExam,
    startExamError,
    isParticipated,
    handleSubmitExam,
  } = useExams();
  const answersRef = React.useRef<AnswerBody[]>([]);

  const exam = memoizedExams?.find((e) => e._id === examId) as Exam;

  return (
    <DashboardPageContainer>
      <div className="border shadow-lg w-2/3 h-screen p-5">
        {/* header */}
        {!isParticipated(exam as Exam) && (
          <div className="w-full p-2 flex justify-between border border-[3px] border-t-0 border-l-0 border-r-0">
            <div className=" text-2xl">
              <h1>Mata Kuliah: {exam?.subject}</h1>
              <h1>
                Waktu:{" "}
                {+(exam?.duration ?? 0)
                  ? +(exam?.duration ?? 0)
                  : +(exam?.duration ?? 0) / 60}{" "}
                {+(exam?.duration ?? 0) >= 60 ? "Menit" : "Detik"}
              </h1>
            </div>
            <div className="text-2xl">
              <h1>Token: {exam?.examToken}</h1>
            </div>
          </div>
        )}

        {/* body */}
        {!isParticipated(exam as Exam) && (
          <ExamPreStart
            onSubmitExamToken={(examToken) =>
              handleStartExam(examToken, examId as string)
            }
            error={startExamError}
          />
        )}

        {isParticipated(exam as Exam) && (
          <div className="flex flex-col gap-10">
            <div className="w-full flex justify-between ">
              <h1 className="text-2xl w-full text-primary">
                Mata Pelajaran: {exam?.subject}
              </h1>
              <div className="w-full flex ">
                {exam?.duration && (
                  <ExamCountdown
                    ref={answersRef}
                    exam={exam}
                    handleSubmitExam={handleSubmitExam}
                  />
                )}
              </div>
            </div>
            <ExamTest
              ref={answersRef}
              questions={exam?.questions}
              examId={exam?._id}
            />
          </div>
        )}
      </div>
    </DashboardPageContainer>
  );
});
