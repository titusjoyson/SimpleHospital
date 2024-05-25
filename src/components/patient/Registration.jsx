import React, { useState, useMemo } from "react";
import { Paper } from "@mui/material";
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
let timer;

export default function PatientRegistration() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const isFormDisabled = () => {
    return loading;
  };

  const baseFormConfig = [
    {
      section: "Personal Information",
      fields: [
        {
          name: "patientName",
          id: "patientName",
          label: "Patient Name",
          helperText: "",
          fieldType: FieldTypes.INPUT_FIELD,
          disabled: isFormDisabled(),
        },
        {
          name: "gender",
          id: "gender",
          label: "Gender",
          helperText: "",
          fieldType: FieldTypes.SELECT_FIELD,
          options: GENDER_OPTIONS,
          onChange: () => {},
          disabled: isFormDisabled(),
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

  const formConfig = useMemo(() => {
    return baseFormConfig.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({ ...field, disabled: loading })),
    }));
  }, [baseFormConfig, loading]);

  const baseFormButtonConfig = [
    {
      text: "Save",
      fieldType: "submit",
      onClick: handleSubmit(onSubmit),
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

  const formButtonConfig = useMemo(() => {
    return baseFormButtonConfig.map((button) => ({
      ...button,
      disabled: loading
    }));
  }, [baseFormConfig, loading]);

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
        inlineButton
      />
    </Paper>
  );
}
