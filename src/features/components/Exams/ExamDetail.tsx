import * as React from "react";
import { DashboardPageContainer } from "..";
import { useParams } from "react-router-dom";
import { Exam, useExams } from "@/features";
import { ExamPreStart } from "./ExamPreStart";
import Countdown from "react-countdown";
import { Button, TextAreaInput } from "../node";
import { useForm } from "react-hook-form";

export const ExamDetail = React.memo(function ExamDetail() {
  const { handleSubmit, register } = useForm();
  const { examId } = useParams();
  const { memoizedExams, handleStartExam, startExamError, isParticipated } =
    useExams();

  const exam = memoizedExams?.find((e) => e._id === examId) as Exam;

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

        {isParticipated(exam as Exam) && (
          <div>
            {exam?.duration && (
              <Countdown
                date={Date.now() + +exam.duration * 1000}
                intervalDelay={0}
                precision={3}
                renderer={({ hours, minutes, seconds }) => {
                  return (
                    <div className="w-full flex gap-2 text-2xl">
                      <h1>Waktu:</h1>{" "}
                      <h1 className="text-[red]">
                        {hours > 0 && hours + " Jam"}{" "}
                        {minutes > 0 && minutes + " Menit"} {seconds + " Detik"}
                      </h1>
                    </div>
                  );
                }}
              >
                <h1 className="text-2xl text-[red]">Waktu Habis!</h1>
              </Countdown>
            )}
            {/* <h1>{duration}</h1> */}
            <form
              onSubmit={handleSubmit((data, e) => {
                e?.preventDefault();

                alert(JSON.stringify(data));
              })}
            >
              {exam?.questions.map((e, index) => (
                <div className="w-full">
                  <p key={index}>
                    {index + 1}. {e.question}
                  </p>
                  <TextAreaInput
                    label="Jawab"
                    register={register}
                    registerName="answer"
                    placeholder="Jawaban"
                  />
                </div>
              ))}

              <Button text="Submit" />
            </form>
          </div>
        )}
      </div>
    </DashboardPageContainer>
  );
});
