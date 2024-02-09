import axios from "axios";
import { BASE_URL } from "../constants";

export const getAllWards = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ward`);
    return response;
  } catch (error) {
    console.error("error while getting all ward==>>", error);
  }
};

export const addNewWard = async (newWard: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/ward`, newWard);
    return response;
  } catch (error) {
    console.log("🚀 ~ addNewWard ~ error:", error)
  }
};

export const editWard= async (updatedWard: any, wardId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/ward/${wardId}`, updatedWard);
    return response;
  } catch (error) {
  console.log("🚀 ~ editWard ~ error:", error)
  }
};

export const deleteWard = async (wardId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/ward/${wardId}`);
    return response;
  } catch (error) {
  console.log("🚀 ~ deleteWard ~ error:", error)
  }
};

export const getWard = async (wardId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/ward/${wardId}`);
    return response;
  } catch (error) {
  console.log("🚀 ~ getWard ~ error:", error)
  }
};