import React, { FC } from "react";
import { LoginFormType } from "./LoginForm.type";
import { LoginFormView } from "./LoginForm.view";

const LoginForm: FC<LoginFormType> = ({ handleLogin }) => {
  return <LoginFormView handleLogin={handleLogin} />;
};

export default LoginForm;
