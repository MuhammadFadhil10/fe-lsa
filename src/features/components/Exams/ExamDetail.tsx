import * as React from "react";
import { DashboardPageContainer } from "..";
import { useParams } from "react-router-dom";
import { Exam, useExams } from "@/features";
import { ExamPreStart } from "./ExamPreStart";
import Countdown from "react-countdown";
import { ExamTest } from "./ExamTest";

export const ExamDetail = React.memo(function ExamDetail() {
  const { examId } = useParams();
  const { memoizedExams, handleStartExam, startExamError, isParticipated } =
    useExams();

  const exam = memoizedExams?.find((e) => e._id === examId) as Exam;

  return (
    <DashboardPageContainer>
      <div className="border shadow-lg w-2/3 h-screen p-5">
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
                  <Countdown
                    date={Date.now() + +exam.duration * 1000}
                    intervalDelay={0}
                    precision={3}
                    renderer={({ hours, minutes, seconds }) => {
                      return (
                        <div className="w-full flex justify-end gap-2 text-2xl">
                          <h1>Waktu:</h1>{" "}
                          <h1 className="text-[red]">
                            {hours > 0 && hours + " Jam"}{" "}
                            {minutes > 0 && minutes + " Menit"}{" "}
                            {seconds + " Detik"}
                          </h1>
                        </div>
                      );
                    }}
                  >
                    <h1 className="text-2xl text-[red]">Waktu Habis!</h1>
                  </Countdown>
                )}
              </div>
            </div>
            {/* <h1>{duration}</h1> */}
            <ExamTest questions={exam?.questions} examId={exam?._id} />
          </div>
        )}
      </div>
    </DashboardPageContainer>
  );
});
