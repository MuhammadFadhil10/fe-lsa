import * as React from "react";
import { DashboardPageContainer } from "..";
import { useParams } from "react-router-dom";
import { Exam, useExams } from "@/features";
import { ExamPreStart } from "./ExamPreStart";

export const ExamDetail = React.memo(function ExamDetail() {
  const { examId } = useParams();
  const { memoizedExams, handleStartExam, startExamError, isParticipated } =
    useExams();

  const exam = memoizedExams?.find((e) => e._id === examId);

  return (
    <DashboardPageContainer>
      <div className="border shadow-lg w-2/3 h-screen ">
        {/* header */}
        {!isParticipated(exam as Exam) && (
          <div className="w-full p-2 flex justify-between border border-[3px] border-t-0 border-l-0 border-r-0">
            <div className=" text-2xl">
              <h1>Mata Kuliah: {exam?.subject}</h1>
              <h1>Waktu: {+(exam?.duration ?? 0) / 60} Menit</h1>
            </div>
            <div className="text-2xl">
              <h1>Token: {exam?.examToken}</h1>
            </div>
          </div>
        )}

        {/* body */}
        {!isParticipated(exam as Exam) && (
          <ExamPreStart
            onSubmitExamToken={handleStartExam}
            error={startExamError}
          />
        )}

        {isParticipated(exam as Exam) &&
          exam?.questions.map((e, index) => (
            <p>
              {index + 1}. {e.question}
            </p>
          ))}
      </div>
    </DashboardPageContainer>
  );
});
