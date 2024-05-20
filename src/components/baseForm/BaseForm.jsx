import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper, FormControl } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  textValue: "",
  radioValue: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

export default function FormPropsTextFields() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Paper elevation={0}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          p: 2,
        }}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Controller
            control={control}
            rules={{
              required: "This field is required",
            }}
            name="firstName"
            render={({ field }) => (
              <TextField
                {...field}
                id="standard-required"
                label="Required"
                variant="standard"
                error={!!errors.firstName}
                helperText={`${errors?.firstName?.message}`}
              />
            )}
          />
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
