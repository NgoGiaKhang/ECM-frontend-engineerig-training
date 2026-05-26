import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ApiErrorResponse } from "../../../../api/types";
import Form from "../../../../components/FormField/Form";
import TextField from "../../../../components/FormField/TextField";
import SubmitButton from "../../../../components/SubmitButton";
import { routes } from "../../../../constants/routes";
import { Validator } from "../../../../core/validator/Validator";
import { isEmail, isRequired } from "../../../../core/validator/validators";
import { authService } from "../../auth.service";
import { useAuthStore } from "../../auth.store";
import styles from "./styles.module.css";

const validator = new Validator({
  email: [isRequired("Email must not be empty"), isEmail()],
  password: [isRequired("Password must not be empty")],
});

type FormData = {
  email: string;
  password: string;
};

const initialForm: FormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const handleLogin = async (a: FormData) => {
    try {
      const data = await authService.login(a.email, a.password);
      login(data.user, data.token);
      navigate(routes.home);
    } catch (e) {
      const apiError = e as ApiErrorResponse;
      setError(apiError.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>

        <p className={styles.subtitle}>Login to continue shopping</p>
        {error && <p className={styles.error}>{error}</p>}
        <Form<FormData>
          className={styles.form}
          initialState={initialForm}
          onSubmit={(v) => handleLogin(v)}
          validator={validator}
        >
          <TextField
            type="email"
            placeholder="Email"
            name="email"
            className={styles.input}
          />

          <TextField
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
          />

          <SubmitButton
            className={styles.button}
            loader={<LoaderCircle className={styles.loader} />}
          >
            Sign in
          </SubmitButton>
        </Form>

        <p className={styles.footerText}>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
