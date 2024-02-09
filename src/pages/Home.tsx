import axios from "axios";
import { FC, useEffect, useState } from "react";
import { urls } from "../constants";

export const Home: FC = () => {
  const [hospitalStatistics, setHospitalStatistics] = useState<Record<string, any>>({});

  useEffect(() => {
    getHospitalStatistics();
  }, []);

  const getHospitalStatistics = async () => {
    try {
      const response = await axios.get(urls.hospitalStatistics);
      console.log("🚀 ~ getHospitalStatistics ~ response:", response.data);
      setHospitalStatistics(response.data);
    } catch (error) {
      console.log("🚀 ~ getHospitalStatistics ~ error:", error);
    }
  };

  return (
    <div className="home">
      <h3>Hospital Statistics</h3>
      <div className="details">
        <div className="box">
          <h3 className="title">Total Patients</h3>
          <h3>{hospitalStatistics?.totalPatients}</h3>
        </div>
        <div className="box">
          <h3 className="title">Current Occupancy Rate</h3>
          <h3>{hospitalStatistics?.currentOccupancyRate?.toFixed(2)}%</h3>
        </div>
        <div className="box">
          <h3 className="title">Average Length of Stay</h3>
          <h3>{hospitalStatistics?.averageLengthOfStay} Days</h3>
        </div>
        <div className="box">
          <h3 className="title">Top Performing Ward</h3>
          <h3>{hospitalStatistics?.topPerformingWard}</h3>
        </div>
      </div>
    </div>
  );
};
