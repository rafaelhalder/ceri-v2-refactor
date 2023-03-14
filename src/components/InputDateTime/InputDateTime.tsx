import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControl, FormHelperText } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

export function InputDateTime({ name, label, formik }) {
  const { errors, touched } = formik;
  const fieldError = touched[name] && Boolean(errors[name]);
  const [value, setValue] = React.useState(null);

  const onChange = (value) => {
    if (!value.$d) {
      formik.setFieldValue(name, null);
    }
    const date = dayjs(value.$d);
    const formatedDate = date.format("DD/MM/YYYY - HH:mm");
    formik.setFieldValue(name, formatedDate);
  };

  React.useEffect(() => {
    if (formik.values[name]) {
      const date = dayjs(formik.values[name], "DD/MM/YYYY - HH:mm");
      setValue(date);
    }
  }, [formik]);

  return (
    <FormControl fullWidth error={fieldError}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label={label} onChange={onChange} value={value} format="DD/MM/YYYY - HH:mm"/>
      </LocalizationProvider>
      <FormHelperText error={fieldError}>{errors[name]}</FormHelperText>
    </FormControl>
  );
}
