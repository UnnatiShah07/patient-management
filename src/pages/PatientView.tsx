import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, viewPatient } from "../redux";

export const PatientView :FC = () => {
  const [patient, setPatient] = useState<Record<string, any>>({});

  const { patientId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (patientId) {
      dispatch(viewPatient(patientId))
        .unwrap()
        .then((response) => {
          setPatient(response?.patient);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="patient-view">
      <table cellPadding={10}>
        <tr>
          <td style={{ textAlign: "center" }} colSpan={2}>
            <h3>{patient?.name}</h3>
          </td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{patient?.age}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{patient?.gender}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{patient?.contactInformation?.email}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{patient?.contactInformation?.phoneNumber}</td>
        </tr>
        <tr>
          <td>Ward</td>
          <td>{patient?.assignedWard?.wardNumber}</td>
        </tr>
        <tr>
          <td>Medical History</td>
          <td>{patient?.medicalHistory}</td>
        </tr>
      </table>
    </div>
  );
};
