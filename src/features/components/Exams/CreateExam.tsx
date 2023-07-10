import { Exam, ExamQuestion, QuestionSection, useExams } from "@/features";
import * as React from "react";
import { Button, TextInput } from "../node";
import { useForm } from "react-hook-form";

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
    <div className="border shadow-lg w-full h-[95vh]  overflow-auto pb-20">
      {/* header */}
      <div className="w-full p-2 flex justify-between text-2xl border border-[3px] border-t-0 border-l-0 border-r-0">
        Buat Test
      </div>

      <div className="w-full p-2">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();

            const random = Math.floor(Math.random() * 10);

            const thumbnailPath =
              random <= 2
                ? "https://static.vecteezy.com/system/resources/previews/006/932/855/large_2x/colorful-background-with-texture-pattern-free-photo.jpg"
                : random <= 5
                ? "https://static.vecteezy.com/system/resources/previews/009/865/977/non_2x/abstract-retro-pattern-design-background-free-vector.jpg"
                : random <= 7
                ? "https://static.vecteezy.com/system/resources/previews/011/219/294/non_2x/japanese-background-with-line-wave-pattern-abstract-template-with-geometric-pattern-mountain-layout-design-in-oriental-style-free-vector.jpg"
                : "https://static.vecteezy.com/system/resources/previews/015/176/032/non_2x/lines-seamless-pattern-banner-geometric-striped-ornament-monochrome-linear-background-free-vector.jpg";

            const payload = {
              ...data,
              questions,
              thumbnailPath,
              duration: (+data?.duration * 60).toString(),
            } as Partial<Exam>;

            handleCreateExams(payload);
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
