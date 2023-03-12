import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";

export const InputSelect = ({ name, label, options, formik }) => {
  const { values, handleChange, errors, touched } = formik;
  const fieldError = touched[name] && Boolean(errors[name]);

  return (
    <FormControl fullWidth error={fieldError} sx={{ m: 1, '&:focus': { border: 'none'} }} >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((state) => (
          <MenuItem key={state.value} value={state.value}>
            {state.label}
          </MenuItem>
        ))}
      </Select>
      {touched && errors ? (
        <FormHelperText>{errors[name]}</FormHelperText>
      ) : null}
    </FormControl>
  );
};
