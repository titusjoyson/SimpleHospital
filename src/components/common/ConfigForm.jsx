import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FieldTypes } from "../../common/const";

function ConfigForm({
  formConfig,
  formButtonConfig,
  handleSubmit,
  control,
  errors,
  onSubmit,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        p: 2,
      }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formConfig.map((section, idx) => {
        return (
          <React.Fragment key={`section_${idx}`}>
            <CardHeader title={section.section}>{section.section}</CardHeader>
            <CardContent>
              {section.fields.map((fieldConfig, idx) => {
                const error = !!errors?.[fieldConfig.name];
                const helperText =
                  errors?.[fieldConfig.name]?.message ||
                  fieldConfig.helperText ||
                  null;

                return (
                  <Controller
                    key={`field_${idx}`}
                    control={control}
                    name={fieldConfig.name}
                    render={({ field }) => {
                      if (fieldConfig.fieldType === FieldTypes.INPUT_FIELD) {
                        return (
                          <TextField
                            {...field}
                            {...fieldConfig}
                            error={error}
                            helperText={helperText}
                            variant="standard"
                          />
                        );
                      } else if (
                        fieldConfig.fieldType === FieldTypes.SELECT_FIELD
                      ) {
                        return (
                          <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                          >
                            <InputLabel id={`${fieldConfig.id}-label`}>
                              {fieldConfig.label}
                            </InputLabel>
                            <Select
                              labelId={`${fieldConfig.id}-label`}
                              id={fieldConfig.id}
                              onChange={(value)=>field.onChange(value.target.value)}
                              label={fieldConfig.label}
                              error={error}
                              helperText={helperText}
                            >
                              {fieldConfig.options.map(
                                (identityTypeKey, identityTypeIndex) => {
                                  let children = [];
                                  children.push(
                                    <MenuItem
                                      key={identityTypeKey.label}
                                      value={identityTypeKey.value}
                                    >
                                      {identityTypeKey.label}
                                    </MenuItem>
                                  );

                                  return children;
                                }
                              )}
                            </Select>
                          </FormControl>
                        );
                      } else if (
                        fieldConfig.fieldType === FieldTypes.DATE_FIELD
                      ) {
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label={fieldConfig.label}
                              slotProps={{
                                textField: {
                                  variant: "standard",
                                  error: error,
                                  helperText: helperText,
                                },
                              }}
                              onChange={(newValue) => field.onChange(newValue)}
                            />
                          </LocalizationProvider>
                        );
                      }
                    }}
                  />
                );
              })}
            </CardContent>
          </React.Fragment>
        );
      })}
      <CardContent>
        <CardActions>
          {formButtonConfig.map((button) => {
            return (
              <Button
                type={button.type}
                variant="outlined"
                color="secondary"
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            );
          })}
        </CardActions>
      </CardContent>
    </Box>
  );
}

ConfigForm.defaultValues = {
  formConfig: [],
  formButtonConfig: [],
  handleSubmit: () => {},
  control: null,
  errors: {},
  onSubmit: () => {},
};

export default ConfigForm;
