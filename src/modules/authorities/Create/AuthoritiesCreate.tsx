import * as React from "react";
import { Title } from "react-admin";
import { AuthoritiesForm } from "./../Form/AuthoritiesForm";

export const AuthoritiesCreate = () => (
  <div>
    <Title title="Criação de Autoridade" />
    <div style={{ height: 400, width: "100%" }}>
      <AuthoritiesForm />
    </div>
  </div>
);
