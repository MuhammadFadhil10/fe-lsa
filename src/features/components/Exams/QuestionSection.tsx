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

      <div className="w-1/2 flex gap-3">
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
            <div>
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
            <div className="w-[50px]">
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
