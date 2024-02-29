import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
const RHFDateRangePicker = ({ name, helperText, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale="pt-br"
        >
          <DatePicker
            {...other}
            format="DD/MM/YYYY"
            value={value}
            control={control}
            onChange={(event) => onChange(event)}
            slotProps={{
              textField: {
                variant: "filled",
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

RHFDateRangePicker.displayName = "RHFDateRangePicker";
export default RHFDateRangePicker;
