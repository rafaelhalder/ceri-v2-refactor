import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { Event } from "../event.interface";
import { getById } from "../EventsService";
import { useNavigate, useParams } from "react-router-dom";
import { useNotify } from "react-admin";
import {
  create,
  removeById,
  update,
} from "../../authorities/AuthoritiesService";
import { InputDateTime } from "../../../components/InputDateTime/InputDateTime";
import { Input } from "../../../components/Input/Input";

const FIELD_REQUIRED = "Campo obrigatório.";

export const EventsForm = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const { id } = useParams();
  const [eventDisabled, setEventDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [event, setEvent] = React.useState<Event>({
    id: "",
    dateTime: "",
    disabled: false,
    local: "",
    title: "",
  });

  async function deleteEvent() {
    removeById("events", id)
      .then(() => {
        notify("Evento Removido com sucesso", {
          autoHideDuration: 2000,
        });
        navigate("/events");
      })
      .catch((error) => {
        console.error(error);

        notify("Erro ao remover Autoridade", {
          autoHideDuration: 2000,
        });
      });
  }

  async function fetchEvents() {
    setLoading(true);
    const response = await getById<Event>("events", id || "");
    setEvent(response);
    setEventDisabled(Boolean(response.disabled));
    setLoading(false);
  }

  React.useEffect(() => {
    if (id) {
      fetchEvents();
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    disabled: Yup.string().required(FIELD_REQUIRED).max(255),
    local: Yup.string().required(FIELD_REQUIRED).max(255),
    title: Yup.string().required(FIELD_REQUIRED).max(255),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dateTime: event?.dateTime,
      disabled: event?.disabled,
      local: event?.local,
      title: event?.title,
    },
    validationSchema,
    onSubmit: (data) => {
      if (id == undefined) {
        create<Omit<Event, "id">>("events", {
          dateTime: data.dateTime,
          disabled: eventDisabled,
          local: data.local,
          title: data.title,
        })
          .then(() => {
            notify("Evento criado com sucesso", {
              autoHideDuration: 2000,
            });

            navigate("/events");
          })
          .catch((error) => {
            console.error(error);

            notify("Erro ao criar Evento", {
              autoHideDuration: 2000,
            });
          });
      } else {
        update<Omit<Event, "id">>("events", id, {
          dateTime: data.dateTime,
          disabled: eventDisabled,
          local: data.local,
          title: data.title,
        })
          .then(() => {
            notify("Evento atualizado com sucesso", {
              autoHideDuration: 2000,
            });

            navigate("/events");
          })
          .catch((error) => {
            console.error(error);

            notify("Erro ao atualizar Evento", {
              autoHideDuration: 2000,
            });
          });
      }
    },
  });

  return (
    <Box
      sx={{
        paddingTop: 1,
        paddingBottom: 1,
        display: "flex",
        flexWrap: "wrap",
        "& .MuiTextField-root": { m: 1 },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          name="title"
          label={"Titulo do Evento"}
          required
        />

        <InputDateTime
          formik={formik}
          name="dateTime"
          label={"Data do Evento"}
        />

        <Input formik={formik} name="local" label={"Endereço"} required />

        <FormControlLabel
          control={
            <Switch
              name="disabled"
              checked={eventDisabled}
              onChange={() => {
                setEventDisabled(!eventDisabled);
              }}
            />
          }
          label={`Evento ${eventDisabled ? "Habilitado" : "Desabilitado"}`}
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {id ? "Atualizar" : "Criar"}
        </button>
        {id && (
          <button
            type="button"
            onClick={deleteEvent}
            className="btn btn-danger"
            disabled={loading}
            style={{ marginLeft: 10 }}
          >
            Remover
          </button>
        )}
      </form>
    </Box>
  );
};
