import axios from "axios";
import { BASE_URL } from "../constants";

export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/patient`);
    return response;
  } catch (error) {
    console.log("🚀 ~ getAllPatients ~ error:", error)
  }
};

export const addNewPatient = async (newPatient: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/patient`, newPatient);
    return response;
  } catch (error) {
    console.error("🚀 ~ addNewPatient ~ error:", error);
  }
};

export const editPatient = async (updatedPatient: any, patientId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/patient/${patientId}`, updatedPatient);
    return response;
  } catch (error) {
    console.log("🚀 ~ editPatient ~ error:", error)
  }
};

export const deletePatient = async (patientId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/patient/${patientId}`);
    return response;
  } catch (error) {
    console.log("🚀 ~ deletePatient ~ error:", error)
  }
};

export const getPatient = async (patientId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/patient/${patientId}`);
    return response;
  } catch (error) {
    console.log("🚀 ~ getPatient ~ error:", error)
  }
};

