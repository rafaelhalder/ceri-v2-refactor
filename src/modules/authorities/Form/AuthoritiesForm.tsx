import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { statesConstant } from "./States.constant";
import { PhoneInput } from "../../../components/InputPhone/InputPhone";
import { InputSelect } from "../../../components/InputSelect/InputSelect";
import { Box, FormControl, TextField } from "@mui/material";
import { Authority } from "./../authority.interface";
import { getById } from "./../AuthoritiesService";
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

export const AuthoritiesForm = () => {
  const [data, setData] = React.useState<any>({});
  const { id } = useParams();
  var [authority, setAuthority] = React.useState<Authority>({} as Authority);
  const [loading, setLoading] = React.useState(true);
  var status = 'Atualizar';
  var hidden = '';

  function deleteUser() {
    remove(ref(db, 'authorities/' + id));
    console.log(id);
  }
  
  React.useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      const response = await getById("authorities", id || "");
      setAuthority(response as Authority);
      setLoading(false);
    };
    fetchRows();
  }, []);

  if(id == undefined){
    status = 'Cadastrar';
    
    authority = {
      id: '',
      status: '',
      whatsAppOn: false,
      name: '',
      displayName: '',
      phoneNumber: '',
      email: '',
      chairPerson: '',
      chainPersonCellNumber: '',
      city: '',
      party: '',
      cellNumber: '',
      role: '',
      country: "BRASIL",
      state: '',
    };
  }


  const validationSchema = Yup.object().shape({
    name: Yup.string().required(FIELD_REQUIRED).max(255),
    displayName: Yup.string()
      .required(FIELD_REQUIRED)
      .max(255, EXCEED_CHARACTERS),
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid")
      .max(255, EXCEED_CHARACTERS),
    chairPerson: Yup.string()
      .required(FIELD_REQUIRED)
      .max(255, EXCEED_CHARACTERS),
    city: Yup.string().required(FIELD_REQUIRED).max(255, EXCEED_CHARACTERS),
    state: Yup.string().required(FIELD_REQUIRED),
    party: Yup.string().required(FIELD_REQUIRED).max(255, EXCEED_CHARACTERS),
    role: Yup.string().required(FIELD_REQUIRED).max(255, EXCEED_CHARACTERS),
    phoneNumber: Yup.string()
      .required(FIELD_REQUIRED)
      .max(255, EXCEED_CHARACTERS),
    chainPersonCellNumber: Yup.string()
      .required(FIELD_REQUIRED)
      .max(255, EXCEED_CHARACTERS),
    cellNumber: Yup.string()
      .required(FIELD_REQUIRED)
      .max(255, EXCEED_CHARACTERS),
  });

  var formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: authority?.name,
      displayName: authority?.displayName,
      phoneNumber: authority?.phoneNumber,
      email: authority?.email,
      chairPerson: authority?.chairPerson,
      chainPersonCellNumber: authority?.chainPersonCellNumber,
      city: authority?.city,
      party: authority?.party,
      cellNumber: authority?.cellNumber,
      role: authority?.role,
      country: "BRASIL",
      state: authority?.state,
    },
    validationSchema,
    onSubmit: (data) => {
      if(id == undefined){
        push(ref(db, 'authorities/'),{
          cellNumber: data.cellNumber,
          chairPerson: data.chairPerson,
          chainPersonCellNumber: data.chainPersonCellNumber,
          city: data.city,
          country: data.country,
          displayName: data.displayName,
          email: data.email,
          name: data.name,
          party: data.party,
          phoneNumber: data.phoneNumber,
          state: data.state,
          role: data.role,
          status: "ELEITO",
          whatsAppOn: false
        });

      }else{
        set(ref(db, 'authorities/' + id), {
          cellNumber: data.cellNumber,
          chairPerson: data.chairPerson,
          chainPersonCellNumber: data.chainPersonCellNumber,
          city: data.city,
          country: data.country,
          displayName: data.displayName,
          email: data.email,
          name: data.name,
          party: data.party,
          phoneNumber: data.phoneNumber,
          state: data.state,
          role: data.role,
          status: "ELEITO",
          whatsAppOn: false
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
          name="name"
          label={"Nome da Autoridade"}
          required
        />
        <Input
          formik={formik}
          name="displayName"
          label={"Nome de exibição"}
          required
        />
        <PhoneInput
          label={"Telefone da Autoridade"}
          name="phoneNumber"
          formik={formik}
        />
        <Input formik={formik} name="email" label={"E-mail"} required />
        <Input
          formik={formik}
          name="chairPerson"
          label={"Presidente"}
          required
        />
        <PhoneInput
          label={"N° celular do presidente"}
          name="chainPersonCellNumber"
          formik={formik}
          required
        />
        <Input formik={formik} name="city" label={"Cidade"} required />
        <InputSelect
          name="state"
          label="Estado"
          options={statesConstant}
          formik={formik}
        />
        <Input
          formik={formik}
          name="country"
          label={"País"}
          required
          disabled
        />{" "}
        <Input formik={formik} name="party" label={"Partido"} required />
        <PhoneInput
          label={"N° celular da Autoridade"}
          name="cellNumber"
          formik={formik}
        />
        <Input
          formik={formik}
          name="role"
          label={"Cargo da autoridade"}
          required
        />
        <button type="submit" className="btn btn-primary">
          {status}
        </button>
        <button type="button" onClick={deleteUser} className="btn btn-danger" >
          deletar
        </button>
      </form>
    </Box>
  );

};
