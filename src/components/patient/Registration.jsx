import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper, FormControl } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import ConfigForm from "../common/ConfigForm";
import { FieldTypes } from "../../common/const";

const defaultValues = {
  patientName: "",
  gender: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default function PatientRegistration() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  const onSubmit = (data) => console.log(data);

  const formConfig = [
    {
      section: "Personal Information",
      fields: [
        {
          name: "patientName",
          id: "patientName",
          label: "Patient Name",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "gender",
          id: "gender",
          label: "Gender",
          helperText: "",
          fieldType: FieldTypes.SELECT_FIELD,
          options: GENDER_OPTIONS,
          onChange: () => {},
        },
        {
          name: "dob",
          id: "dob",
          label: "Date Of Birth",
          helperText: "",
          fieldType: FieldTypes.DATE_FIELD,
        },
        {
          name: "age",
          id: "age",
          label: "Age",
          type: "number",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "bloodGroup",
          id: "bloodGroup",
          label: "Blood Group",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
      ],
    },
    {
      section: "Contact Information",
      fields: [
        {
          name: "mobileNumber",
          id: "mobileNumber",
          label: "Mobile Number",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "email",
          id: "email",
          label: "Email",
          helperText: "",
          type: "email",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "address1",
          id: "address1",
          label: "Address 1",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "address2",
          id: "address2",
          label: "Address 2",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "city",
          id: "city",
          label: "City",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "state",
          id: "state",
          label: "State",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
        },
        {
          name: "pincode",
          id: "pincode",
          label: "Pincode",
          helperText: "",
          type: "number",
          fieldType: FieldTypes.INPUT_FIELD,
        },
      ],
    },
  ];

  const formButtonConfig = [
    {
      text: "Save",
      fieldType: "submit",
      onClick: handleSubmit(onSubmit)
    },
    {
      text: "Cancel",
      fieldType: "button",
      onClick: () => {},
    },
    {
      text: "List",
      fieldType: "button",
      onClick: () => {},
    },
  ];

  return (
    <Paper elevation={0}>
      <ConfigForm
        formConfig={formConfig}
        formButtonConfig={formButtonConfig}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        errors={errors}
        defaultValues={defaultValues}
      />
    </Paper>
  );
}
