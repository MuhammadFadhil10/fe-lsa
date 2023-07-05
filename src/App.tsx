import * as React from "react";
import { Login, Register } from "@/features";

const App = () => {
  const [authSection, setAuthSection] = React.useState<"login" | "register">(
    "login"
  );

  return (
    <div className="flex w-full h-screen  items-center justify-center">
      <div className="w-[300px] justify-center">
        {authSection === "login" && <Login />}

        {authSection === "register" && <Register />}

        <div className="w-full flex justify-center">
          {authSection === "register" && (
            <p>
              Sudah Punya Akun?{" "}
              <span
                className="text-primary font-bold cursor-pointer self-center"
                onClick={() => setAuthSection("login")}
              >
                Masuk
              </span>
            </p>
          )}

          {authSection === "login" && (
            <p>
              Belum Punya Akun?{" "}
              <span
                className="text-primary font-bold cursor-pointer self-center"
                onClick={() => setAuthSection("register")}
              >
                Buat Akun
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
