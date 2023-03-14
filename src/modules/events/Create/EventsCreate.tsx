import * as React from "react";
import { Title } from "react-admin";
import { EventsForm } from "../Form/EventsForm";

export const EventsCreate = () => (
  <div>
    <Title title="Criação de Eventos" />
    <div style={{ height: 400, width: "100%" }}>
      <EventsForm />
    </div>
  </div>
);
