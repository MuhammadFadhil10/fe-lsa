import { Exam, ExamQuestion, QuestionSection, useExams } from "@/features";
import * as React from "react";
import { Button, TextInput } from "../node";
import { useForm, FieldName } from "react-hook-form";

interface Props {
  defaultValues?: { [x: string]: any | undefined };
}

export const CreateExam = React.memo(function CreateExam({
  defaultValues = {
    duration: "60",
  },
}: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const { handleCreateExams, createExamLoading } = useExams();

  const defaulQuestion: Partial<ExamQuestion> = React.useMemo(() => {
    return {
      question: "",
      answerKey: "",
      score: 0,
    };
  }, []);

  const [questions, setQuestions] = React.useState<Partial<ExamQuestion>[]>(
    defaultValues?.questions ?? [defaulQuestion]
  );

  return (
    <div className="border shadow-lg w-2/3 h-screen  overflow-auto pb-20">
      {/* header */}
      <div className="w-full p-2 flex justify-between text-2xl border border-[3px] border-t-0 border-l-0 border-r-0">
        Buat Test
      </div>

      <div className="w-full p-2">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();

            const payload = {
              ...data,
              questions,
              duration: (+data?.duration * 60).toString(),
            };

            handleCreateExams(payload as Partial<Exam>);
          })}
        >
          <TextInput
            label="Mata Pelajaran"
            register={register}
            registerName="subject"
            placeholder="Math"
            required
          />

          <TextInput
            label="Durasi (Menit)"
            register={(fieldName) => register(fieldName)}
            registerName="duration"
            placeholder="60"
            required
          />

          <div className=" h-[400px] ">
            <QuestionSection
              defaultQuestion={defaulQuestion}
              questions={questions}
              setQuestions={setQuestions}
            />
          </div>

          <Button text="Submit" loading={createExamLoading} />
        </form>
      </div>
    </div>
  );
});
