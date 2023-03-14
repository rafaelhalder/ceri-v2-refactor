import React from "react";
import { FormControl, TextField } from "@mui/material";
import InputMask from "react-input-mask";

export const PhoneInput = ({ name, label, formik, ...props }) => {
  const { errors, touched } = formik;
  const fieldError = touched[name] && Boolean(errors[name]);

  return (
    <FormControl fullWidth error={fieldError}>
      <InputMask mask={'(99) 999999999'} maskChar={null} {...formik.getFieldProps(name)}>
        {(inputProps) => (
          <TextField
            {...inputProps}
            name={name}
            label={label}
            fullWidth
            type="tel"
            variant="outlined"
            placeholder="(99) 99999-9999"
            error={fieldError}
            helperText={touched && touched[name] && errors && errors[name]}
          />
        )}
      </InputMask>
    </FormControl>
  );
};
