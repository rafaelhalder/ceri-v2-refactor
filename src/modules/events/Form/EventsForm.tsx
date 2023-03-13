import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { statesConstant } from "./States.constant";
import { PhoneInput } from "../../../components/InputPhone/InputPhone";
import { InputSelect } from "../../../components/InputSelect/InputSelect";
import { Box, FormControl, TextField } from "@mui/material";
import { Event } from "../event.interface";
import { getById } from "../EventsService";
import { useParams } from 'react-router-dom';
import { getDatabase, push, ref, set, remove } from "firebase/database";


const db = getDatabase();

const Input = ({ formik, name, label, ...otherProps }) => {

  const { errors, touched } = formik;
  const fieldError = touched[name] && Boolean(errors[name]);

  return (
    <FormControl fullWidth error={fieldError}>
      <TextField
        fullWidth
        {...otherProps}
        {...formik.getFieldProps(name)}
        name={name}
        type="text"
        label={label}
        variant="outlined"
        className={
          "form-control" +
          (formik.errors &&
          formik.errors[name] &&
          formik.touched &&
          formik.touched[name]
            ? " is-invalid"
            : "")
        }
        onChange={formik.handleChange}
        value={formik.values && formik.values[name]}
        inputProps={{ maxLength: 14 }}
        error={fieldError}
        helperText={touched && touched[name] && errors && errors[name]}
      />
    </FormControl>
  );
};

const EXCEED_CHARACTERS = "O campo não deve exceder 255 caracteres";
const FIELD_REQUIRED = "Campo obrigatório.";

export const EventsForm = () => {
  const [data, setData] = React.useState<any>({});
  const { id } = useParams();
  var [event, setEvent] = React.useState<Event>({} as Event);
  const [loading, setLoading] = React.useState(true);
  var status = 'Atualizar';
  var hidden = '';

  function deleteEvent() {
    remove(ref(db, 'events/' + id));
    console.log(id);
  }
  
  React.useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      const response = await getById("events", id || "");
      setEvent(response as Event);
      setLoading(false);
    };
    fetchRows();
  }, []);

  if(id == undefined){
    status = 'Cadastrar';
    
    event = {
      id: '',
      dateTime: '',
      disabled: false,
      local: '',
      title: '',
    };
  }


  const validationSchema = Yup.object().shape({
    dateTime: Yup.string().required(FIELD_REQUIRED).max(255),

  });

  var formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dateTime: event?.dateTime,
      disabled: event?.disabled,
      local: event?.local,
      title: event?.title,
    },
    validationSchema,
    onSubmit: (data) => {
      if(id == undefined){
        push(ref(db, 'events/'),{
          dateTime: data.dateTime,
          disabled: data.disabled,
          local: data.local,
          title: data.title,
        });

      }else{
        set(ref(db, 'events/' + id), {
          dateTime: data.dateTime,
          disabled: data.disabled,
          local: data.local,
          title: data.title,
        })
        .then(() => {
  
          // Data saved successfully!
        })
        .catch((error) => {
  
          // The write failed...
        });
      }
    },
  });
  const params = new URLSearchParams(window.location.pathname);

  return (
    <Box
      sx={{
        paddingBottom: 1,
        display: "flex",
        flexWrap: "wrap",
        "& .MuiTextField-root": { m: 1 },
        "& input": { "&:focus": { border: "none" } },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          name="dateTime"
          label={"Nome da Autoridade"}
          required
        />
        <Input
          formik={formik}
          name="disabled"
          label={"Nome de exibição"}
          required
        />
      
        <Input formik={formik} name="local" label={"E-mail"} required />
        <Input
          formik={formik}
          name="title"
          label={"Presidente"}
          required
        />
        <button type="submit" className="btn btn-primary">
          {status}
        </button>
        <button type="button" onClick={deleteEvent} className="btn btn-danger" >
          deletar
        </button>
      </form>
    </Box>
  );

};
