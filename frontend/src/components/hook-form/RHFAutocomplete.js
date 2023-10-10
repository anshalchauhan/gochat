// Proptypes
import PropTypes from "prop-types";

// React Hook Form
import { useFormContext, Controller } from "react-hook-form";

// MUI
import { Autocomplete, TextField } from "@mui/material";

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFAutocomplete({ name, label, helperText, ...other }) {
  const { control, setValue } = useFormContext();

  // Autocomplete onChange handler
  const handlerOnChange = (event, newValue) => {
    setValue(name, newValue, { shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          onChange={handlerOnChange}
          {...other}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
        />
      )}
    />
  );
}
