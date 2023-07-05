import * as React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
  SelectInput,
  TextInput,
} from "../node";
import { useForm } from "react-hook-form";
import { Alert, useAuth } from "@/features";

export const Register = React.memo(function Register() {
  const { register, handleSubmit } = useForm();
  const { handleRegister, registerError, registerLoading, isRegisterError } =
    useAuth();

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-primary text-4xl font-bold">Register</h1>

      {isRegisterError && <Alert text={registerError} />}

      <form
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit(handleRegister)}
      >
        <TextInput label="Nama" register={register} registerName="name" />
        <EmailInput register={register} registerName="email" />
        <PasswordInput register={register} registerName="password" />
        <SelectInput
          label="Role"
          register={register}
          registerName="role"
          options={[
            { label: " -- Pilih Role", value: "pilih role", isSelected: true },
            { label: "Siswa", value: "student", isSelected: false },
            { label: "Guru", value: "teacher", isSelected: false },
          ]}
        />

        <Button text="Register" loading={registerLoading} />
      </form>
    </div>
  );
});
