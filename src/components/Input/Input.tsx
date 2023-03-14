import * as Yup from "yup";
import { FormControl, TextField } from "@mui/material";

export const Input = ({ formik, name, label, ...otherProps }) => {
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
        value={(formik.values && formik.values[name]) || ""}
        helperText={touched && touched[name] && errors && errors[name]}
      />
    </FormControl>
  );
};
