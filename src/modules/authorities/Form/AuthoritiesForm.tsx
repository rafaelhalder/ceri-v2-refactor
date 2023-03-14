import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { statesConstant } from "./States.constant";
import { PhoneInput } from "../../../components/InputPhone/InputPhone";
import { InputSelect } from "../../../components/InputSelect/InputSelect";
import { Box, FormControl, TextField } from "@mui/material";
import { Authority } from "./../authority.interface";
import { useNavigate, useParams } from "react-router-dom";
import { useNotify } from "react-admin";
import { Roles } from "../roles.interface";
import { create, getAll, getById, removeById, update } from "./../AuthoritiesService";

interface SelectType {
  value: string;
  label: string;
}

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
        error={fieldError}
        helperText={touched && touched[name] && errors && errors[name]}
      />
    </FormControl>
  );
};

const EXCEED_CHARACTERS = "O campo não deve exceder 255 caracteres";
const FIELD_REQUIRED = "Campo obrigatório.";

export const AuthoritiesForm = () => {
  const navigate = useNavigate();
  const [authority, setAuthority] = React.useState<Authority>({
    id: "",
    status: "",
    whatsAppOn: false,
    name: "",
    displayName: "",
    phoneNumber: "",
    email: "",
    chairPerson: "",
    chainPersonCellNumber: "",
    city: "",
    party: "",
    cellNumber: "",
    role: "",
    country: "BRASIL",
    state: "",
  } as Authority);
  const [roles, setRoles] = React.useState<SelectType[] | []>([]);

  const notify = useNotify();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);

  async function deleteUser() {
    removeById("authorities", id)
      .then(() => {
        notify("Autoridade Removida com sucesso", {
          autoHideDuration: 2000,
        });
        navigate("/authorities");
      })
      .catch((error) => {
        console.error(error);

        notify("Erro ao remover Autoridade", {
          autoHideDuration: 2000,
        });
      });
  }

  function convertToPersonList(
    data: Record<string, Omit<Roles, "id">>
  ): Roles[] {
    return Object.entries(data).map(([id, dataRole]) => ({
      id,
      ...dataRole,
    }));
  }

  async function fetchRoles() {
    setLoading(true);
    const response = await getAll<Roles>("roles");

    if (!response) {
      return;
    }

    const convertedRoles = convertToPersonList(response);

    const rolesData: SelectType[] = convertedRoles
      .sort((a, b) => a.order - b.order)
      .map((role) => ({
        label: role.name,
        value: role.type,
      }));

    setRoles(rolesData);
    setLoading(false);
  }

  async function fetchAuthority() {
    setLoading(true);
    const response = await getById("authorities", id || "");
    setAuthority(response as Authority);
    setLoading(false);
  }

  React.useEffect(() => {
    if (id) {
      fetchAuthority();
    }
    fetchRoles();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(FIELD_REQUIRED),
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
      .matches(/^\(\d{2}\)\s9?[0-9]{8}$/, "Telefone inválido"),
    chainPersonCellNumber: Yup.string()
      .required(FIELD_REQUIRED)
      .matches(/^\(\d{2}\)\s9?[0-9]{8}$/, "Telefone inválido"),
    cellNumber: Yup.string()
      .required(FIELD_REQUIRED)
      .matches(/^\(\d{2}\)\s9?[0-9]{8}$/, "Telefone inválido"),
  });

  let formik = useFormik({
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
      if (id == undefined) {
        create<Omit<Authority, "id">>('authorities', { 
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
          whatsAppOn: false,
        })
      } else {
        update<Omit<Authority, "id">>("authorities", id, {
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
          whatsAppOn: false,
        })
          .then(() => {
            notify("Autoridade atualizada com sucesso", {
              autoHideDuration: 2000,
            });

            navigate("/authorities");
          })
          .catch((error) => {
            console.error(error);

            notify("Erro ao atualizar Autoridade", {
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
        />
        <Input formik={formik} name="party" label={"Partido"} required />
        <PhoneInput
          label={"N° celular da Autoridade"}
          name="cellNumber"
          formik={formik}
        />
        <InputSelect
          name="role"
          label={"Cargo da autoridade"}
          options={roles}
          formik={formik}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {id ? "Atualizar" : "Criar"}
        </button>
        {id && (
          <button
            type="button"
            onClick={deleteUser}
            className="btn btn-danger"
            disabled={loading}
            style={{ marginLeft: 10 }}
          >
            deletar
          </button>
        )}
      </form>
    </Box>
  );
};
