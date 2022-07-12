import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  loading?: boolean;
  modalOpened?: boolean;
  navSize?: string
}

const initialState: AppState = {
  loading: false,
  modalOpened: false,
  navSize: "large"
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state: AppState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOpenModal: (state: AppState, action: PayloadAction<boolean | undefined>) => {
      state.modalOpened = action.payload;
    },
    setNavSize: (state: AppState, action: PayloadAction<string>) => {
      state.navSize = action.payload;
    }
  },
});

export const { setOpenModal, setLoading, setNavSize } = appSlice.actions;

export default appSlice.reducer;
