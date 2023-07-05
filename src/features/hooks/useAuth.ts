import * as React from "react";
import { Auth, setAuthToken } from "..";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = React.useState("");
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [registerError, setRegisterError] = React.useState("");
  const [registerLoading, setRegisterLoading] = React.useState(false);

  const isLoginError = !!loginError;
  const isRegisterError = !!registerError;

  const handleLogin = React.useCallback(
    async (payload: unknown) => {
      try {
        setLoginLoading(true);

        const { data } = await Auth.Login(payload);

        setLoginLoading(false);
        setLoginError("");

        localStorage.setItem("user-token", data.token);
        localStorage.setItem("user-loggedin", JSON.stringify(data.user));

        setAuthToken(data.token);

        navigate(
          data.user.role === "student"
            ? "/dashboard/student/exams"
            : "/dashboard/teacher/create-exams"
        );
      } catch (error) {
        console.log("login err: ", error);

        setLoginLoading(false);
        setLoginError("Email atau Password salah!");
      }
    },
    [navigate]
  );

  const handleRegister = React.useCallback(
    async (payload: unknown) => {
      try {
        if ((payload as any).role.toLowerCase() === "pilih role") {
          throw Error("Role harus diisi");
        }

        setRegisterLoading(true);

        await Auth.Register(payload);

        setRegisterLoading(false);
        setRegisterError("");

        handleLogin({
          email: (payload as any).email,
          password: (payload as any).password,
        });
      } catch (error) {
        console.log("login err: ", error);

        setRegisterLoading(false);
        setRegisterError((error as any).message);
      }
    },
    [handleLogin]
  );

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-loggedin");

    navigate("/");
  }, [navigate]);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    loginError,
    isLoginError,
    loginLoading,
    registerError,
    isRegisterError,
    registerLoading,
  };
};
