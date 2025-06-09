import React, { FC } from "react";
import LoginForm from "./Form/LoginForm";
import { LoginViewProps } from "./Login.type";

const LoginView: FC<LoginViewProps> = ({ handleLogin }) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginView;
