import * as React from "react";
import { QuestionForm } from ".";
import { ExamQuestion } from "@/features";
import { Button } from "../node";

interface Props {
  defaultQuestion: Partial<ExamQuestion>;
  questions: Partial<ExamQuestion>[];
  setQuestions: (question: Partial<ExamQuestion>[]) => void;
}

export const QuestionSection = React.memo(function QuestionSection({
  defaultQuestion,
  questions,
  setQuestions,
}: Props) {
  console.log("questions: ", questions);

  return (
    <div className="w-full h-full">
      <h1 className="font-bold">Soal</h1>

      <QuestionForm
        questionNumber={questions.length}
        onChange={(data) => {
          const newQuestion = questions;
          newQuestion[questions.length - 1] = data;

          setQuestions([...newQuestion]);
        }}
      />

      {/* {questions.map((_question, index) => (
        <>
          <QuestionForm
            key={index}
            questionNumber={index + 1}
            onChange={(data) => {
              const newQuestion = questions;
              newQuestion[questions.length - 1] = data;

              setQuestions([...newQuestion]);
            }}
          />
          <div className="w-full h-[3px] bg-gray-300 mt-5 mb-5"></div>
        </>
      ))} */}

      
      <Button
        type="button"
        text="Tambah Soal"
        onClick={() => setQuestions([...questions, defaultQuestion])}
      />
    </div>
  );
});
