import {
  ExamQuestion,
  QuestionForm,
  QuestionSection,
  useDashboard,
} from "@/features";
import * as React from "react";
import { Button, TextAreaInput, TextInput } from "../node";
import { useForm } from "react-hook-form";

export const CreateExam = React.memo(function CreateExam() {
  const { memoizedTeachersStudents } = useDashboard();

  const defaulQuestion: Partial<ExamQuestion> = React.useMemo(() => {
    return {
      question: "",
      answerKey: "",
      score: 0,
    };
  }, []);
  const [questions, setQuestions] = React.useState<Partial<ExamQuestion>[]>([
    defaulQuestion,
  ]);

  const { register, handleSubmit } = useForm();

  return (
    <div className="border shadow-lg w-2/3 h-screen  ">
      {/* header */}
      <div className="w-full p-2 flex justify-between text-2xl border border-[3px] border-t-0 border-l-0 border-r-0">
        Buat Test
      </div>

      <div className="w-full p-2">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();

            const payload = { ...data, questions };

            alert(JSON.stringify(payload));
          })}
        >
          <TextInput
            label="Nama Pelajaran"
            register={register}
            registerName="subject"
            placeholder="Math"
            required
          />

          <div className=" h-[400px] ">
            <QuestionSection
              defaultQuestion={defaulQuestion}
              questions={questions}
              setQuestions={setQuestions}
            />
          </div>

          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
});
