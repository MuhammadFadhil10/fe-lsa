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
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(
    questions.length - 1
  );

  console.log("currentQuestionIdx: ", currentQuestionIdx);
  return (
    <div className="w-full h-full">
      <h1 className="font-bold">Soal</h1>

      <QuestionForm
        questionNumber={currentQuestionIdx + 1}
        currentQuestion={questions[currentQuestionIdx]}
        onChange={(data) => {
          const newQuestion = questions;
          newQuestion[currentQuestionIdx] = data;

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

      <div className="w-full flex">
        <Button
          type="button"
          text="Tambah Soal"
          onClick={() => {
            setQuestions([...questions, defaultQuestion]);
            setCurrentQuestionIdx(currentQuestionIdx + 1);
          }}
        />

        {questions.length > 1 && (
          <>
            <div className="w-[10%]">
              <Button
                type="button"
                text="<"
                onClick={() => {
                  if (currentQuestionIdx === 0) return;

                  setCurrentQuestionIdx(currentQuestionIdx - 1);
                }}
                disabled={currentQuestionIdx === 0}
              />
            </div>
            <div className="w-[10%]">
              <Button
                type="button"
                text=">"
                onClick={() => {
                  if (currentQuestionIdx === questions.length - 1) return;

                  setCurrentQuestionIdx(currentQuestionIdx + 1);
                }}
                disabled={currentQuestionIdx === questions.length - 1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
});
