import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewPatient, deletePatient, editPatient, getAllPatients, getPatient } from "../apis";

export type PatientStateTypes = {
  isLoading: Boolean;
  patients: Record<string, any>[];
  error: String | null;
};

const initialState: PatientStateTypes = {
  isLoading: false,
  patients: [],
  // patients: [
  //   {
  //     _id: "P01",
  //     name: "Alice Johnson",
  //     age: 32,
  //     gender: "Female",
  //     medicalHistory: "Hypertension, Allergies to Penicillin",
  //     contactInformation: {
  //       email: "alice@example.com",
  //       phoneNumber: "555-555-5555"
  //     },
  //     assignedWard: "W01"
  //   },
  //   {
  //     _id: "P02",
  //     name: "Bob Smith",
  //     age: 45,
  //     gender: "Male",
  //     medicalHistory: "Type 2 Diabetes",
  //     contactInformation: {
  //       email: "bob@example.com",
  //       phoneNumber: "555-555-5556"
  //     },
  //     assignedWard: "W02"
  //   },
  //   {
  //     _id: "P03",
  //     name: "Carol Davis",
  //     age: 28,
  //     gender: "Female",
  //     medicalHistory: "Asthma, Allergies to Nuts",
  //     contactInformation: {
  //       email: "carol@example.com",
  //       phoneNumber: "555-555-5557"
  //     },
  //     assignedWard: "W03"
  //   },
  //   {
  //     _id: "P04",
  //     name: "David Wilson",
  //     age: 55,
  //     gender: "Other",
  //     medicalHistory: "Coronary Heart Disease",
  //     contactInformation: {
  //       email: "david@example.com",
  //       phoneNumber: "555-555-5558"
  //     },
  //     assignedWard: "W01"
  //   },
  //   {
  //     _id: "P05",
  //     name: "Eve Thompson",
  //     age: 40,
  //     gender: "Female",
  //     medicalHistory: "Pregnant, Rh-negative",
  //     contactInformation: {
  //       email: "eve@example.com",
  //       phoneNumber: "555-555-5559"
  //     },
  //     assignedWard: "W04"
  //   }
  // ],
  error: null,
};

export const getPatients = createAsyncThunk("patient/getPatients", async () => {
  try {
    const response = await getAllPatients();
    return response?.data;
  } catch (error) {}
});

export const addPatient = createAsyncThunk("patient/addPatient", async (patient: Record<string, any>) => {
  try {
    const response = await addNewPatient(patient);
    return response?.data;
  } catch (error) {}
});

export const updatePatient = createAsyncThunk("patient/updatePatient", async ({ patient, patientId }: { patient: Record<string, any>; patientId: string }) => {
  try {
    const response = await editPatient(patient, patientId);
    return response?.data;
  } catch (error) {}
});

export const removePatient = createAsyncThunk("patient/removePatient", async (patientId: string) => {
  try {
    const response = await deletePatient(patientId);
    return response?.data;
  } catch (error) {}
});

export const viewPatient = createAsyncThunk("patient/viewPatient", async (patientId: string) => {
  try {
    const response = await getPatient(patientId);
    return response?.data;
  } catch (error) {}
});

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patients = action.payload.patients;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        if (action.payload?.patient) {
          state.patients.push(action.payload?.patient);
        }
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const updatedPatient: any = action.payload.patient;
        state.patients = state.patients.map((patient) => (patient._id === updatedPatient._id ? { ...patient, ...updatedPatient } : patient));
      })
      .addCase(removePatient.fulfilled, (state, action) => {
        const deletedPatient: any = action.payload.patient;
        state.patients = state.patients.filter((patient) => patient._id !== deletedPatient._id);
      });
  },
});

export const {} = patientSlice.actions;
