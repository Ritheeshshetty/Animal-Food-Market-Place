// File: frontend/src/redux/slices/cartSlice.js
// This file manages the shopping cart state in a Redux store, including fetching the cart, adding
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Thunks
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get("/api/cart/", { withCredentials: true });
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// export const addOrUpdateCartItem = createAsyncThunk(
//   "cart/addOrUpdateCartItem",
//   async (item, thunkAPI) => {
//     try {
//       const res = await axios.post("/api/cart/", item, { withCredentials: true });
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// export const removeCartItem = createAsyncThunk(
//   "cart/removeCartItem",
//   async ({ product, quantityLabel }, thunkAPI) => {
//     try {
//       const res = await axios.delete(`/api/cart/${product}?quantityLabel=${encodeURIComponent(quantityLabel)}`, {
//         withCredentials: true,
//       });
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// export const clearCart = createAsyncThunk(
//   "cart/clearCart",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.delete("/api/cart/", { withCredentials: true });
//       return [];
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
// };





// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addOrUpdateCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(addOrUpdateCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeCartItem.fulfilled, (state, action) => {
//         state.loading = false;
//         if (Array.isArray(action.payload)) {
//           state.items = action.payload;
//         } else if (action.payload && Array.isArray(action.payload.cart)) {
//           state.items = action.payload.cart;
//         } else {
//           state.items = [];
//         }
//       })
//       .addCase(removeCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(clearCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(clearCart.fulfilled, (state) => {
//         state.loading = false;
//         state.items = [];
//       })
//       .addCase(clearCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default cartSlice.reducer;


// --- Updated cartSlice.js ---
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Load guest cart from localStorage
// const getGuestCartFromStorage = () => {
//   try {
//     return JSON.parse(localStorage.getItem("guestCart")) || [];
//   } catch {
//     return [];
//   }
// };

// const saveGuestCartToStorage = (cart) => {
//   localStorage.setItem("guestCart", JSON.stringify(cart));
// };

// // Thunks
// export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
//   try {
//     const res = await axios.get("/api/cart/", { withCredentials: true });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// export const addOrUpdateCartItem = createAsyncThunk("cart/addOrUpdateCartItem", async (item, thunkAPI) => {
//   const { auth } = thunkAPI.getState();
//   if (!auth?.user) {
//     thunkAPI.dispatch(addGuestItem(item));
//     return;
//   }

//   try {
//     const res = await axios.post("/api/cart/", item, { withCredentials: true });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// export const migrateGuestCart = createAsyncThunk("cart/migrateGuestCart", async (_, thunkAPI) => {
//   const { cart } = thunkAPI.getState();
//   try {
//     for (const item of cart.guestItems) {
//       await axios.post("/api/cart/", item, { withCredentials: true });
//     }
//     thunkAPI.dispatch(clearGuestCart());
//     return [];
//   } catch (err) {
//     return thunkAPI.rejectWithValue("Failed to migrate guest cart");
//   }
// });

// export const removeCartItem = createAsyncThunk("cart/removeCartItem", async ({ product, quantityLabel }, thunkAPI) => {
//   try {
//     const res = await axios.delete(`/api/cart/${product}?quantityLabel=${encodeURIComponent(quantityLabel)}`, {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
//   try {
//     await axios.delete("/api/cart/", { withCredentials: true });
//     return [];
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// const initialState = {
//   items: [],
//   guestItems: getGuestCartFromStorage(),
//   loading: false,
//   error: null,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addGuestItem: (state, action) => {
//       const existing = state.guestItems.find(
//         (i) => i.product === action.payload.product && i.quantityLabel === action.payload.quantityLabel
//       );
//       if (existing) {
//         existing.quantity += action.payload.quantity;
//       } else {
//         state.guestItems.push(action.payload);
//       }
//       saveGuestCartToStorage(state.guestItems);
//     },
//     clearGuestCart: (state) => {
//       state.guestItems = [];
//       saveGuestCartToStorage([]);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addOrUpdateCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload) state.items = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(addOrUpdateCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeCartItem.fulfilled, (state, action) => {
//         state.loading = false;
//         if (Array.isArray(action.payload)) {
//           state.items = action.payload;
//         } else if (action.payload && Array.isArray(action.payload.cart)) {
//           state.items = action.payload.cart;
//         } else {
//           state.items = [];
//         }
//       })
//       .addCase(removeCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(clearCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(clearCart.fulfilled, (state) => {
//         state.loading = false;
//         state.items = [];
//       })
//       .addCase(clearCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { addGuestItem, clearGuestCart } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/cart/", { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addOrUpdateCartItem = createAsyncThunk("cart/addOrUpdateCartItem", async (item, thunkAPI) => {
  try {
    const res = await axios.post("/api/cart/", item, { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async ({ product, quantityLabel }, thunkAPI) => {
  try {
    const res = await axios.delete(`/api/cart/${product}?quantityLabel=${encodeURIComponent(quantityLabel)}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    await axios.delete("/api/cart/", { withCredentials: true });
    return [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const initialState = {
  items: [],
  guestItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addGuestItem: (state, action) => {
      const existing = state.guestItems.find(
        (i) => i.product === action.payload.product && i.quantityLabel === action.payload.quantityLabel
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.guestItems.push(action.payload);
      }
      localStorage.setItem("guest_cart", JSON.stringify(state.guestItems));
    },
    clearGuestCart: (state) => {
      state.guestItems = [];
      localStorage.removeItem("guest_cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      });
  },
});

export const { addGuestItem, clearGuestCart } = cartSlice.actions;
export default cartSlice.reducer;