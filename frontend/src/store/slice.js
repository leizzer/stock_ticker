import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: {
    maximum: 0,
    minimum: 0,
    average: 0,
  },
  volume: {
    maximum: 0,
    minimum: 0,
    average: 0,
  },
};

export const calculatedValuesSlice = createSlice({
  name: "calculatedValues",
  initialState,
  reducers: {
    setPriceValues: (state, action) => {
      state.price = action.payload;
    },
    setVolumeValues: (state, action) => {
      state.volume = action.payload;
    },
  },
});

export const { setPriceValues, setVolumeValues } =
  calculatedValuesSlice.actions;

export default calculatedValuesSlice.reducer;
