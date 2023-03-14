import React from "react";
import { FormControl, TextField } from "@mui/material";
import InputMask from "react-input-mask";

export const PhoneInput = ({ name, label, formik, isHomePhone = false, ...props }) => {
  const { errors, touched } = formik;
  const fieldError = touched[name] && Boolean(errors[name]);

  const buildMask = () => {
    if(isHomePhone) {
      return '(99) 9999-9999';
    }
    return '(99) 99999-9999';
  }
  return (
    <FormControl fullWidth error={fieldError}>
      <InputMask mask={buildMask()} maskChar={null} {...formik.getFieldProps(name)}>
        {(inputProps) => (
          <TextField
            {...inputProps}
            name={name}
            label={label}
            fullWidth
            type="tel"
            variant="outlined"
            placeholder="(99) 999999999"
            error={fieldError}
            helperText={touched && touched[name] && errors && errors[name]}
          />
        )}
      </InputMask>
      {fieldError}
      {touched[name]}
      {errors[name]}
      {formik.values[name]}
    </FormControl>
  );
};
