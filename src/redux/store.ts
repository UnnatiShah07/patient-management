import { configureStore } from "@reduxjs/toolkit";
import { patientSlice } from "./patientSlice";
import { wardSlice } from "./wardSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    patients: patientSlice.reducer,
    wards: wardSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: (state: RootState) => void = useDispatch;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
