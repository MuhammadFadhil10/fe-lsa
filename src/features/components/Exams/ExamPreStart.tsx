import * as React from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "../node";
import { Alert } from "..";

interface Props {
  onSubmitExamToken: (examToken: string) => void;
  error: string;
}

export const ExamPreStart = React.memo(function ExamPreStart({
  onSubmitExamToken,
  error,
}: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className="w-full px-2 flex flex-col items-center">
        {!!error && (
          <div className="w-[200px] justify-center">
            <Alert text={error} />
          </div>
        )}

        <form
          className="flex items-center w-full"
          onSubmit={handleSubmit((data) => onSubmitExamToken(data.examToken))}
        >
          <div className="w-[90%]">
            <TextInput
              label=""
              register={register}
              registerName="examToken"
              placeholder="Masukan kode token"
            />
          </div>

          <div className="w-[30%]">
            <Button text="Mulai Ujian" />
          </div>
        </form>
      </div>
    </>
  );
});
