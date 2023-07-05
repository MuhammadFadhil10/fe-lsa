import * as React from "react";
import { Button, EmailInput, PasswordInput } from "../node";
import { useForm } from "react-hook-form";
import { Alert, useAuth } from "@/features";

export const Login = React.memo(function Login() {
  const { register, handleSubmit } = useForm();
  const { handleLogin, loginError, isLoginError, loginLoading } = useAuth();

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-primary text-4xl font-bold">Login</h1>

      {isLoginError && <Alert text={loginError} />}

      <form
        className="w-full flex flex-col gap-2"
        onSubmit={handleSubmit(handleLogin)}
      >
        <EmailInput register={register} registerName="email" />
        <PasswordInput register={register} registerName="password" />
        <Button text="Login" loading={loginLoading} />
      </form>
    </div>
  );
});
