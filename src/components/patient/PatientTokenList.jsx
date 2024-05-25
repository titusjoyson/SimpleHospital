import React, { useState, useMemo } from "react";
import { Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import ConfigForm from "../common/ConfigForm";
import { FieldTypes } from "../../common/const";
import CustomPaginationActionsTable from "../common/Table";

const defaultValues = {
  patientName: "",
  gender: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

const data = [
  {
    Id: "SMART-PROMs-1",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "46867",
    Active: "Yes",
    name: "Schmidt",
    Telecom: "email",
    gender: "female",
    birthDate: "1972-11-17",
    Address: "5406 Coolidge Way",
  },
  {
    Id: "SMART-PROMs-2",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "23272",
    Active: "Yes",
    "name {HumanName}": "Wagner",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1963-11-10",
    Address: "85918 Stoughton Court",
  },
  {
    Id: "SMART-PROMs-3",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "90055",
    Active: "Yes",
    "name {HumanName}": "Warren",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1961-11-04",
    Address: "03261 Surrey Parkway",
  },
  {
    Id: "SMART-PROMs-4",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "10024",
    Active: "Yes",
    "name {HumanName}": "Ward",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1956-01-13",
    Address: "372 Onsgard Point",
  },
  {
    Id: "SMART-PROMs-5",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "37931",
    Active: "Yes",
    "name {HumanName}": "Morales",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1951-08-15",
    Address: "49 Ilene Lane",
  },
  {
    Id: "SMART-PROMs-6",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "98109",
    Active: "Yes",
    "name {HumanName}": "Matthews",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1948-04-24",
    Address: "094 Mcbride Lane",
  },
  {
    Id: "SMART-PROMs-7",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "22212",
    Active: "Yes",
    "name {HumanName}": "Fox",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1940-12-31",
    Address: "07 Pawling Junction",
  },
  {
    Id: "SMART-PROMs-8",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "30506",
    Active: "Yes",
    "name {HumanName}": "Fernandez",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1940-12-05",
    Address: "34226 Brentwood Street",
  },
  {
    Id: "SMART-PROMs-9",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "06726",
    Active: "Yes",
    "name {HumanName}": "Long",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1940-07-08",
    Address: "85336 Dexter Place",
  },
  {
    Id: "SMART-PROMs-10",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "76178",
    Active: "Yes",
    "name {HumanName}": "Cook",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1939-05-13",
    Address: "606 Almo Place",
  },
  {
    Id: "SMART-PROMs-11",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "25326",
    Active: "Yes",
    "name {HumanName}": "Hall",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1935-10-20",
    Address: "2867 Graedel Plaza",
  },
  {
    Id: "SMART-PROMs-12",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "46278",
    Active: "Yes",
    "name {HumanName}": "Nichols",
    "Telecom {ContactPoint}": "email",
    gender: "female",
    birthDate: "1935-05-25",
    Address: "1 Donald Circle",
  },
  {
    Id: "SMART-PROMs-13",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "30061",
    Active: "Yes",
    "name {HumanName}": "Phillips",
    "Telecom {ContactPoint}": "email",
    gender: "male",
    birthDate: "1975-03-25",
    Address: "98 Lyons Pass",
  },
  {
    Id: "SMART-PROMs-14",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "12242",
    Active: "Yes",
    "name {HumanName}": "Cox",
    "Telecom {ContactPoint}": "email",
    gender: "male",
    birthDate: "1974-01-07",
    Address: "4 Tony Pass",
  },
  {
    Id: "SMART-PROMs-15",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "64187",
    Active: "Yes",
    "name {HumanName}": "Hansen",
    "Telecom {ContactPoint}": "email",
    gender: "male",
    birthDate: "1963-07-23",
    Address: "6 Carey Circle",
  },
  {
    Id: "SMART-PROMs-16",
    Identifier: "http://hl7.org/fhir/v2/0203",
    "": "98687",
    Active: "Yes",
    "name {HumanName}": "Foster",
    "Telecom {ContactPoint}": "email",
    gender: "male",
    birthDate: "1953-11-27",
    Address: "4 Swallow Drive",
  },
];

const headers = Object.keys(data[0]);

const rows = data.map((d) => Object.values(d));

const baseFormConfig = [
  {
    section: "Patient Token List",
    fields: [
      {
        name: "healthId",
        id: "healthId",
        label: "Health Id",
        helperText: "",
        fieldType: FieldTypes.INPUT_FIELD,
      },
      {
        name: "mobileNumber",
        id: "mobileNumber",
        label: "Mobile Number",
        helperText: "",
        fieldType: FieldTypes.INPUT_FIELD,
      },
      {
        name: "patientName",
        id: "patientName",
        label: "Patient Name",
        helperText: "",
        fieldType: FieldTypes.INPUT_FIELD,
      },
      {
        name: "fromDate",
        id: "fromDate",
        label: "From Date",
        helperText: "",
        fieldType: FieldTypes.INPUT_FIELD,
      },
      {
        name: "toDate",
        id: "toDate",
        label: "To Date",
        helperText: "",
        fieldType: FieldTypes.INPUT_FIELD,
      },
      {
        name: "doctorName",
        id: "doctorName",
        label: "Doctor Name",
        helperText: "",
        fieldType: FieldTypes.INPUT_FIELD,
      },
    ],
  },
];
let timer;

export default function PatientTokenList() {
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

  const formConfig = useMemo(() => {
    return baseFormConfig.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({ ...field, disabled: loading })),
    }));
  }, [loading]);

  const baseFormButtonConfig = useMemo(
    () => [
      {
        text: "Search",
        fieldType: "submit",
        onClick: handleSubmit(onSubmit),
      },
    ],
    []
  );

  const rowActionConfig = useMemo(() => {
    const actionList = [
      {
        text: "View",
        fieldType: "button",
        onClick: (data) => console.log(data),
      },
      {
        text: "Edit",
        fieldType: "button",
        onClick: (data) => console.log(data),
      },
    ];

    return actionList.map((button) => ({
      ...button,
      disabled: loading,
    }));
  }, [loading]);

  const formButtonConfig = useMemo(() => {
    return baseFormButtonConfig.map((button) => ({
      ...button,
      disabled: loading,
    }));
  }, [baseFormButtonConfig, loading]);

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
      <CustomPaginationActionsTable
        title="Patient List"
        headers={headers}
        rows={rows}
        rowsActions={rowActionConfig}
      />
    </Paper>
  );
}
