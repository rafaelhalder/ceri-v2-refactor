import React from "react";
import { FormControl, InputLabel, TextField } from "@mui/material";

export const PhoneInput = ({ name, label, formik, ...props }) => {
  const { errors, touched } = formik;
  const fieldError = touched[name] && Boolean(errors[name]);

  const handleChange = (event) => {
    const { value } = event.target;
    const phoneRegex = /\D*(\d{2})\D*(\d{4,5})\D*(\d{4})\D*/;
    const matches = phoneRegex.exec(value);
    const formattedPhone = matches
      ? `(${matches[1]}) ${matches[2]}-${matches[3]}`
      : value;
    formik.setFieldValue(name, formattedPhone);
  };

  return (
    <FormControl fullWidth error={fieldError}>
      <TextField
        {...formik.getFieldProps(name)}
        label={label}
        fullWidth
        variant="outlined"
        placeholder="(99) 99999-9999"
        onChange={handleChange}
        inputProps={{ maxLength: 14 }}
        error={fieldError}
        helperText={touched && touched[name] && errors && errors[name]}
      />
    </FormControl>
  );
};
