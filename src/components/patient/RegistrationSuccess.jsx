import React, { useState, useMemo } from "react";
import { Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import ConfigForm from "../common/ConfigForm";
import { ContentType } from "../../common/const";
import DataCard from "../common/DataCard";

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

export default function RegistrationSuccess() {
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

  const dataList = [
    {
      value: "patientName",
      label: "Health ID",
      valueType: ContentType.TEXT,
    },
    {
      value: "patientName",
      label: "Patient Name",
      valueType: ContentType.TEXT,
    },
    {
      value: "patientName",
      label: "Mobile Number",
      valueType: ContentType.TEXT,
    },
    {
      value: "patientName",
      label: "Age",
      valueType: ContentType.TEXT,
    },
    {
      value: "patientName",
      label: "Rack Number",
      valueType: ContentType.TEXT,
    },
    {
      value: "patientName",
      label: "Barcode",
      valueType: ContentType.IMAGE,
    },
  ];

  const baseFormButtonConfig = [
    {
      text: "Print",
      fieldType: "button",
      onClick: handleSubmit(onSubmit),
    },
    {
      text: "Add New",
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
      disabled: loading,
    }));
  }, [baseFormButtonConfig, loading]);

  return (
    <Paper elevation={0}>
      <DataCard
        headerText={"Patient Card"}
        dataList={dataList}
        formButtonConfig={formButtonConfig}
      />
    </Paper>
  );
}
