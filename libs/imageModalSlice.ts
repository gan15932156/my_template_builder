import { RootState } from "@/libs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageModallState {
  imageUrl: string;
  isOpen: boolean;
}

const initialState: ImageModallState = {
  imageUrl: "",
  isOpen: false,
};

export const imageModalSlice = createSlice({
  name: "imageModal",
  initialState,
  reducers: {
    setModalImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
      state.isOpen = true;
    },
    toggleImageModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    resetImageModalState: () => initialState,
  },
});

export default imageModalSlice.reducer;
export const { setModalImageUrl, toggleImageModal, resetImageModalState } =
  imageModalSlice.actions;
export const selectImageModal = (state: RootState) => state.imageModal;
