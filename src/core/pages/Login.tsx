import React, { useState } from "react";
import {
  Form,
  Login as ReactAdminLogin,
  TextInput,
  required,
  useLogin,
  useNotify,
} from "react-admin";
import Logo from "./../../assets/logo.png";
import { CircularProgress, Button, styled } from "@mui/material";
import { useLocation } from "react-router-dom";

const Login = styled(ReactAdminLogin)(() => ({
  ["& section"]: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    justifyContent: "center",
    margin: "-1em auto 0",
    padding: 20,
  },
  ["& form"]: {
    paddingTop: 32,
    display: "flex",
    flexDirection: "column",
  },
}));

const LoginPage = () => {
  const login = useLogin();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const notify = useNotify();

  const handleSubmit = (credentials: {
    username?: string;
    password?: string;
  }) => {
    setLoading(true);
    login(
      credentials,
      location.state ? (location.state as any).nextPathname : "/"
    ).catch((error: Error) => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
        {
          type: "error",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
    });
  };

  return (
    <Login style={{ background: "none" }}>
      <section>
        <img src={Logo} alt="Governo do Estado do Paraná" />
        <Form onSubmit={handleSubmit}>
          <TextInput
            autoFocus
            source="username"
            label={"E-mail"}
            disabled={loading}
            validate={required()}
            fullWidth
          />
          <TextInput
            source="password"
            label={"Senha"}
            type="password"
            disabled={loading}
            validate={required()}
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading && <CircularProgress size={25} thickness={2} />}
            Entrar
          </Button>
        </Form>
      </section>
    </Login>
  );
};

export default LoginPage;
