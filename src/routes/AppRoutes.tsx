import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, PatientView, Patients, WardView, Wards } from "../pages";
import { Header } from "../components";
import { getPatients, getWards, useAppDispatch } from "../redux";

const AppRoutes: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWards());
    dispatch(getPatients());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<Patients />} />
        <Route path="/patient/:patientId" element={<PatientView />} />
        <Route path="/ward" element={<Wards />} />
        <Route path="/ward/:wardId" element={<WardView />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
