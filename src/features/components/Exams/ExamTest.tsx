import { ExamQuestion, useExams } from "@/features";
import * as React from "react";
import { Button } from "../node";

interface AnswerBody {
  questionId: string;
  answer: string;
}

interface Props {
  examId: string;
  questions: ExamQuestion[];
}

export const ExamTest = React.forwardRef(function ExamTest(
  { examId, questions }: Props,
  ref
) {
  const { handleSubmitExam, submitExamLoading } = useExams();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const existAnswer = (
        ref as React.MutableRefObject<AnswerBody[]>
      ).current.find((answer) => answer.questionId === e.target.id);

      if (!existAnswer) {
        return ((ref as React.MutableRefObject<AnswerBody[]>).current = [
          ...(ref as React.MutableRefObject<AnswerBody[]>).current,
          {
            questionId: e.target.id,
            answer: e.target.value,
          },
        ]);
      }

      const newAnswer = [
        ...(ref as React.MutableRefObject<AnswerBody[]>).current,
      ];

      const index = newAnswer.findIndex(
        (answer) => answer.questionId === existAnswer.questionId
      );

      newAnswer[index] = {
        questionId: e.target.id,
        answer: e.target.value,
      };

      (ref as React.MutableRefObject<AnswerBody[]>).current = [...newAnswer];
    },
    [ref]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (
          (ref as React.MutableRefObject<AnswerBody[]>).current.length === 0
        ) {
          handleSubmitExam(
            [{ questionId: questions[0]._id, answer: "" }],
            examId
          );

          return;
        }

        handleSubmitExam(
          (ref as React.MutableRefObject<AnswerBody[]>).current,
          examId
        );
      }}
      className="flex flex-col gap-5 "
    >
      {questions?.map((question, index) => (
        <div className="w-full flex flex-col gap-3">
          <h1 key={index} className="text-xl">
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
