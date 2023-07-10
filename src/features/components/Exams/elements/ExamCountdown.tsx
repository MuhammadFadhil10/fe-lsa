import { Exam } from "@/features";
import * as React from "react";
import Countdown from "react-countdown";

interface AnswerBody {
  questionId: string;
  answer: string;
}

interface Props {
  exam: Exam;
  handleSubmitExam: (answers: AnswerBody[], examId: string) => Promise<void>;
}

export const ExamCountdown = React.forwardRef(function ExamCountdown(
  { exam, handleSubmitExam }: Props,
  ref
) {
  return (
    <Countdown
      date={Date.now() + +exam.duration * 1000}
      intervalDelay={0}
      precision={3}
      renderer={({ hours, minutes, seconds }) => {
        if (hours < 1 && minutes < 1 && seconds < 1) {
          if (
            (ref as React.MutableRefObject<AnswerBody[]>).current.length === 0
          ) {
            handleSubmitExam(
              [{ questionId: exam.questions[0]._id, answer: "" }],
              exam._id
            );

            return;
          }

          handleSubmitExam(
            (ref as React.MutableRefObject<AnswerBody[]>).current,
            exam._id
          );
        }

        return (
          <div className="w-full flex justify-end gap-2 text-2xl">
            <h1>Waktu:</h1>{" "}
            <h1 className="text-[red]">
              {hours > 0 && hours + " Jam"} {minutes > 0 && minutes + " Menit"}{" "}
              {seconds + " Detik"}
            </h1>
          </div>
        );
      }}
    >
      <h1 className="text-2xl text-[red]">Waktu Habis!</h1>
    </Countdown>
  );
});
