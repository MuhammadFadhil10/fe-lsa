import { ExamQuestion } from "@/features";
import * as React from "react";

interface Props {
  questionNumber: number;
  currentQuestion: Partial<ExamQuestion>;
  onChange: (data: Partial<ExamQuestion>) => void;
}

export const QuestionForm = React.memo(function QuestionForm({
  questionNumber,
  currentQuestion,
  onChange,
}: Props) {
  const [, setQuestion] = React.useState<Partial<ExamQuestion>>({
    question: "",
    answerKey: "",
    score: 0,
  });

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestion((prev) => {
        prev = { ...prev, [e.target.name]: e.target.value };

        onChange({
          ...currentQuestion,
          [e.target.name]:
            e.target.name === "score" ? +e.target.value : e.target.value,
        });

        return prev;
      });
    },
    [currentQuestion, onChange]
  );

  return (
    <div className="w-full">
      {/* soal */}
      <div>
        <label
          htmlFor="question"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Soal {questionNumber}
        </label>
        <textarea
          id="question"
          name="question"
          value={currentQuestion.question}
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={"Masukan soal"}
          onChange={handleChange}
        />

        <label
          htmlFor="answerKey"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Jawaban
        </label>
        <textarea
          id="answerKey"
          name="answerKey"
          value={currentQuestion.answerKey}
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={"Masukan jawaban"}
          onChange={handleChange}
        />
        <div className="flex flex-col w-[200px]">
          <label
            htmlFor="score"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Skor
          </label>
          <input
            id="score"
            type="text"
            value={currentQuestion.score}
            name="score"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
});
