import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewWard, deleteWard, editWard, getAllWards, getWard } from "../apis";

export type WardStateTypes = {
  isLoading: Boolean;
  wards: Record<string, any>[];
  error: String | null;
};

const initialState: WardStateTypes = {
  isLoading: false,
  wards: [],
  error: null,
};

export const getWards = createAsyncThunk("wards/getWards", async () => {
  try {
    const response = await getAllWards();
    return response?.data;
  } catch (error) {}
});

export const addWard = createAsyncThunk("ward/addWard", async (ward: Record<string, any>) => {
  try {
    const response = await addNewWard(ward);
    return response?.data;
  } catch (error) {}
});

export const updateWard = createAsyncThunk("ward/updateWard", async ({ ward, wardId }: { ward: Record<string, any>; wardId: string }) => {
  try {
    const response = await editWard(ward, wardId);
    return response?.data;
  } catch (error) {}
});

export const removeWard = createAsyncThunk("ward/removeWard", async (wardId: string) => {
  try {
    const response = await deleteWard(wardId);
    return response?.data;
  } catch (error) {}
});

export const viewWard = createAsyncThunk("ward/viewWard", async (wardId: string) => {
  try {
    const response = await getWard(wardId);
    return response?.data;
  } catch (error) {}
});

export const wardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWards.fulfilled, (state, action) => {
        state.wards = action.payload.wards;
      })
      .addCase(addWard.fulfilled, (state, action) => {
        state.wards.push(action.payload.ward);
      })
      .addCase(updateWard.fulfilled, (state, action) => {
        const updatedward: any = action.payload.ward;
        state.wards = state.wards.map((ward) => (ward._id === updatedward._id ? { ...ward, ...updatedward } : ward));
      })
      .addCase(removeWard.fulfilled, (state, action) => {
        const deletedWard: any = action.payload.ward;
        state.wards = state.wards.filter((ward) => ward._id !== deletedWard._id);
      });
  },
});
