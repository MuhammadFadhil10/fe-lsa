import { ExamQuestion, useExams } from "@/features";
import * as React from "react";
import { Button } from "../node";

interface Props {
  examId: string;
  questions: ExamQuestion[];
}

interface AnswerBody {
  questionId: string;
  answer: string;
}

export const ExamTest = React.memo(function ExamTest({
  questions,
  examId,
}: Props) {
  const { handleSubmitExam, submitExamLoading } = useExams();
  const [answers, setAnswers] = React.useState<AnswerBody[]>([]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const existAnswer = answers.find(
        (answer) => answer.questionId === e.target.id
      );

      if (!existAnswer) {
        return setAnswers([
          ...answers,
          {
            questionId: e.target.id,
            answer: e.target.value,
          },
        ]);
      }

      const newAnswer = [...answers];

      const index = newAnswer.findIndex(
        (answer) => answer.questionId === existAnswer.questionId
      );

      newAnswer[index] = {
        questionId: e.target.id,
        answer: e.target.value,
      };

      setAnswers([...newAnswer]);
    },
    [answers, setAnswers]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmitExam(answers, examId);
      }}

      className="flex flex-col gap-5"
    >
      {questions?.map((question, index) => (
        <div className="w-full flex flex-col gap-3">
          <h1 key={index} className="text-xl" >
            {index + 1}. {question.question}
          </h1>

          <div>
            <label
              htmlFor={question._id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Jawab
            </label>
            <textarea
              id={question._id}
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Jawaban"
              onChange={handleChange}
            />
          </div>
        </div>
      ))}

      <Button text="Submit" loading={submitExamLoading} />
    </form>
  );
});
