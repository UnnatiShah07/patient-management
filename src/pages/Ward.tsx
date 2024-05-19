import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState, addWard, removeWard, updateWard, useAppDispatch } from "../redux";
import { useNavigate } from "react-router-dom";

export const Wards: FC = () => {
  const [updateId, setUpdateId] = useState<string>("");
  
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
    wardNumber: { required: "Ward number is required." },
    capacity: { required: "Capacity is required." },
    specializations: { required: "Specializations  is required." },
  };

  const handleAddWard = (values: any) => {
    const { wardNumber, capacity, specializations } = values;
    const ward = {
      wardNumber,
      capacity,
      specializations,
    };
    dispatch(addWard(ward))
      .unwrap()
      .then(() => {
        reset();
      });
  };

  const handleEditWard = (ward: Record<string, any>) => {
    const { _id, wardNumber, capacity, specializations } = ward;
    reset({
      wardNumber,
      capacity,
      specializations: specializations?.join(", "),
    });
    _id && setUpdateId(_id);
  };

  const handleUpdateWard = (values: any) => {
    const { wardNumber, capacity, specializations } = values;
    const newWard = {
      wardNumber,
      capacity,
      specializations: specializations.split(","),
    };
    dispatch(updateWard({ wardId: updateId, ward: newWard }))
      .unwrap()
      .then(() => {
        reset({
          wardNumber: "",
          capacity: "",
          specializations: "",
        });
        setUpdateId("");
      });
  };

  const handleDeleteWard = (id: string) => {
    dispatch(removeWard(id))
      .unwrap()
      .then(() => {
        alert("Ward details deleted successfully.");
      });
  };

  const handleViewWard = (id: String) => navigate(`/ward/${id}`);

  return (
    <div className="main-container">
      <div className="sub-container">
        <h3>{updateId ? "Edit Ward" : "Add Ward"}</h3>
        <form className="form" onSubmit={updateId ? handleSubmit(handleUpdateWard) : handleSubmit(handleAddWard)}>
          <div className="grid-element">
            <input {...register("wardNumber", validations.wardNumber)} type="text" name="wardNumber" placeholder="* Enter ward number" />
            {errors.wardNumber && <small>{errors.wardNumber.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <input {...register("capacity", validations.capacity)} type="number" name="capacity" placeholder="* Enter capacity" />
            {errors.capacity && <small>{errors.capacity.message as ReactNode}</small>}
          </div>
          <div className="grid-element">
            <textarea {...register("specializations", validations.specializations)} placeholder="* Enter ward's specializations and differentiate by comma" name="specializations" cols={20} rows={3}></textarea>
            {errors.specializations && <small>{errors.specializations.message as ReactNode}</small>}
          </div>

          {updateId ? <button type="submit">Edit Ward</button> : <button type="submit">Add Ward</button>}
          <button type="reset">Reset</button>
        </form>
      </div>
      <div className="sub-container">
        <h3>Ward Details</h3>
        <table border={1} cellPadding={10}>
          <tr>
            <th>Ward Number</th>
            <th>Capacity</th>
            <th>Specializations</th>
          </tr>
          {wards?.map((ward) => (
            <tr>
              <td>{ward?.wardNumber}</td>
              <td>{ward?.capacity.toString()}</td>
              <td>{ward?.specializations?.join(", ")}</td>
              <td>
                <button onClick={() => handleViewWard(ward?._id)}>View</button>
              </td>
              <td>
                <button onClick={() => handleEditWard(ward)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteWard(ward?._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
