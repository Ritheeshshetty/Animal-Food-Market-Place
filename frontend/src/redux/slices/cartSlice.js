import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/cart/", { withCredentials: true });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const addOrUpdateCartItem = createAsyncThunk(
  "cart/addOrUpdateCartItem",
  async (item, thunkAPI) => {
    try {
      const res = await axios.post("/api/cart/", item, { withCredentials: true });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/cart/${productId}`, { withCredentials: true });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const res = await axios.delete("/api/cart/", { withCredentials: true });
      // Return empty array as cart is cleared
      return [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const initialState = {
  items: [], // Always an array
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add or Update Cart Item
      .addCase(addOrUpdateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addOrUpdateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Cart Item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // If backend returns cart array, use it, else fallback to []
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else if (action.payload && Array.isArray(action.payload.cart)) {
          state.items = action.payload.cart;
        } else {
          state.items = [];
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
