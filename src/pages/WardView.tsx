import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, viewWard } from "../redux";

export const WardView: FC = () => {
  const [ward, setWard] = useState<Record<string, any>>({});

  const { wardId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (wardId) {
      dispatch(viewWard(wardId))
        .unwrap()
        .then((response) => {
          setWard(response?.ward);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="ward-view">
      <table cellPadding={10}>
        <tr>
          <td style={{ textAlign: "center" }} colSpan={2}>
            <h3>Ward Details</h3>
          </td>
        </tr>
        <tr>
          <td>Ward Number</td>
          <td>{ward?.wardNumber}</td>
        </tr>
        <tr>
          <td>Capacity</td>
          <td>{ward?.capacity}</td>
        </tr>
        <tr>
          <td>Specializations</td>
          <td>{ward?.specializations?.join(", ")}</td>
        </tr>
      </table>
    </div>
  );
};
