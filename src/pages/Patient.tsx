import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState, addPatient, removePatient, updatePatient, useAppDispatch } from "../redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils";

export const Patients: FC = () => {
  const [updateId, setUpdateId] = useState<string>("");

  const { patients } = useSelector((state: RootState) => state.patients);
  const { wards } = useSelector((state: RootState) => state.wards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validations = {
    name: { required: "Name is required." },
    age: { required: "Age is required." },
    gender: { required: "Gender is required." },
    medicalHistory: { required: "Medical history is required." },
    email: { required: "Email is required." },
    phoneNumber: { required: "Phone number is required." },
    assignedWard: { required: "Assign ward is required." },
    admitDate: { required: "Admit date is required." },
    dischargeDate: {},
  };

  const handleAddPatient = (values: any) => {
    const { name, age, gender, medicalHistory, email, phoneNumber, assignedWard, admitDate, dischargeDate } = values;
    const patient = {
      name,
      age,
      gender,
      medicalHistory,
      contactInformation: { email, phoneNumber },
      assignedWard,
      admitDate,
      dischargeDate
    };
    dispatch(addPatient(patient))
      .unwrap()
      .then(() => {
        reset({
          name: "",
          age: "",
          gender: "",
          medicalHistory: "",
          email: "",
          phoneNumber: "",
          assignedWard: "",
          admitDate: "",
          dischargeDate: ""
        });
      });
  };

  const handleEditPatient = (patient: Record<string, any>) => {
    const {
      _id,
      name,
      age,
      gender,
      medicalHistory,
      contactInformation: { email, phoneNumber },
      assignedWard,
      admitDate,
      dischargeDate
    } = patient;
    reset({
      name,
      age,
      gender,
      medicalHistory,
      email,
      phoneNumber,
      assignedWard: assignedWard._id,
      admitDate: formatDate(admitDate),
      dischargeDate: dischargeDate ? formatDate(dischargeDate) : ""
    });
    _id && setUpdateId(_id);
  };

  const handleUpdatePatient = (values: any) => {
    const { name, age, gender, medicalHistory, email, phoneNumber, assignedWard, admitDate, dischargeDate } = values;
    const newPatient = {
      name,
      age,
      gender,
      medicalHistory,
      contactInformation: { email, phoneNumber },
      assignedWard,
      admitDate,
      dischargeDate
    };
    dispatch(updatePatient({ patientId: updateId, patient: newPatient }))
      .unwrap()
      .then(() => {
        reset({
          name: "",
          age: "",
          gender: "",
          medicalHistory: "",
          email: "",
          phoneNumber: "",
          assignedWard: "",
          admitDate: "",
          dischargeDate: ""
        });
        setUpdateId("");
      });
  };

  const handleDeletePatient = (id: string) => {
    dispatch(removePatient(id))
      .unwrap()
      .then(() => {
        alert("Patient details deleted successfully.");
      });
  };

  const handleViewStudent = (id?: String) => navigate(`/patient/${id}`);

  return (
    <div className="main-container">
      <div className="sub-container">
        <h3>{updateId ? "Edit Patient" : "Add Patient"}</h3>
        <form className="form" onSubmit={updateId ? handleSubmit(handleUpdatePatient) : handleSubmit(handleAddPatient)}>
          <div className="grid-element">
            <input {...register("name", validations.name)} type="text" name="name" placeholder="* Enter name" />
            {errors.name && <small>{errors.name.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <input {...register("age", validations.age)} type="number" name="age" placeholder="* Enter age" />
            {errors.age && <small>{errors.age.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <select {...register("gender", validations.gender)} name="gender">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <small>{errors.gender.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <input {...register("medicalHistory", validations.medicalHistory)} type="text" name="medicalHistory" placeholder="* Enter medical history" />
            {errors.medicalHistory && <small>{errors.medicalHistory.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <input {...register("email", validations.email)} type="email" name="email" placeholder="* Enter email" />
            {errors.email && <small>{errors.email.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <input {...register("phoneNumber", validations.phoneNumber)} type="tel" name="phoneNumber" placeholder="* Enter phone number" />
            {errors.phoneNumber && <small>{errors.phoneNumber.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <select {...register("assignedWard", validations.assignedWard)} name="assignedWard">
              <option value="">Select ward</option>
              {wards.map((ward) => (
                <option key={ward._id} value={ward._id}>
                  {ward.wardNumber}
                </option>
              ))}
            </select>
            {errors.assignedWard && <small>{errors.assignedWard.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <h5>Admit date</h5>
            <input {...register("admitDate", validations.admitDate)} type="date" name="admitDate" placeholder="* Enter admit date" />
            {errors.admitDate && <small>{errors.admitDate.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <h5>Discharge date</h5>
            <input {...register("dischargeDate", validations.dischargeDate)} type="date" name="dischargeDate" placeholder="* Enter admit date" />
            {errors.dischargeDate && <small>{errors.dischargeDate.message as ReactNode}</small>}
          </div>
          {updateId ? <button type="submit">Edit patient</button> : <button type="submit">Add patient</button>}
          <button type="reset" onClick={() => setUpdateId("")}>Reset</button>
        </form>
      </div>
      {patients.length > 0 ? (
        <div className="sub-container">
          <h3>Patient List</h3>
          <table border={1} cellPadding={10}>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
            {patients.map((patient) => (
              <tr>
                <td>{patient.name}</td>
                <td>{patient.age.toString()}</td>
                <td>{patient.gender}</td>
                <td>
                  <button onClick={() => handleViewStudent(patient._id)}>View</button>
                </td>
                <td>
                  <button onClick={() => handleEditPatient(patient)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeletePatient(patient._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <h3>No Patient</h3>
      )}
    </div>
  );
};
