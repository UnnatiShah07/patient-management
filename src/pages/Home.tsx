import axios from "axios";
import { FC, useEffect } from "react";
import { urls } from "../constants";

export const Home: FC = () => {
  useEffect(() => {
    getHospitalStatistics()
  }, []);

  const getHospitalStatistics = async () => {
    try {
      const response = await axios.get(urls.hospitalStatistics);
      console.log("🚀 ~ getHospitalStatistics ~ response:", response.data);
    } catch (error) {
      console.log("🚀 ~ getHospitalStatistics ~ error:", error);
    }
  };

  return <div>Home</div>;
};
