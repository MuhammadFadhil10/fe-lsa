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
  const countdownEndTimeKey = `countdownEndTime_${exam._id}`;
  const countdownEndTime = React.useMemo(
    () => {
      const storedCountdownEndTime = localStorage.getItem(countdownEndTimeKey);
      return storedCountdownEndTime
        ? parseInt(storedCountdownEndTime, 10)
        : Date.now() + +exam.duration * 1000;
    },
    [countdownEndTimeKey, exam.duration, exam._id]
  );

  React.useEffect(() => {
    localStorage.setItem(countdownEndTimeKey, countdownEndTime.toString());
  }, [countdownEndTime, countdownEndTimeKey]);

  const handleFinishExam = () => {
    // Clear the countdown end time from local storage
    localStorage.removeItem(countdownEndTimeKey);

    // Rest of the code to handle submitting the exam
    if ((ref as React.MutableRefObject<AnswerBody[]>).current.length === 0) {
      handleSubmitExam(
        [{ questionId: exam.questions[0]._id, answer: "" }],
        exam._id
      );
    } else {
      handleSubmitExam(
        (ref as React.MutableRefObject<AnswerBody[]>).current,
        exam._id
      );
    }
  };

  const renderTimerText = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
    let timerText = "";
    let timerColor = "";

    if (hours > 0) {
      timerText = `${hours} Jam ${minutes} Menit ${seconds} Detik`;
      timerColor = "text-green-700"; // Green color when hours are remaining
    } else if (minutes > 10) {
      timerText = `${minutes} Menit ${seconds} Detik`;
      timerColor = "text-green-700"; // Green color when more than 10 minutes are remaining
    } else {
      timerText = `${minutes} Menit ${seconds} Detik`;
      timerColor = "text-red-700"; // Red color when 10 minutes or less are remaining
    }

    return (
      <h1 className={`text-2xl ${timerColor}`}>
        Waktu: {timerText}
      </h1>
    );
  };

  return (
    <Countdown
      date={countdownEndTime}
      intervalDelay={0}
      precision={3}
      renderer={renderTimerText}
      onComplete={handleFinishExam}
    >
      <h1 className="text-2xl text-[red]">Waktu Habis!</h1>
    </Countdown>
  );
});
