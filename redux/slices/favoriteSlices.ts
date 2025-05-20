import { getMyFavorites } from "@/service/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (customerId: string) => {
    const response = await getMyFavorites({ customerId });
    const data = await response;
    return data.data.milkteaIds; // assuming this is a string[]
  }
);

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    dispatchAddFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    dispatchRemoveFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (milkteaId) => milkteaId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const {
  setFavorites,
  clearFavorites,
  dispatchAddFavorite,
  dispatchRemoveFavorite,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
