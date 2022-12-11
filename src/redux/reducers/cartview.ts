import { createSlice } from "@reduxjs/toolkit"
import { ProductCart } from "../../types/Cart"

const initialState: ProductCart[] = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((el) => el.id !== action.payload);
    },
    increment: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.count += 1;
        }
      });
    },
    incrementmore: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.count += action.payload.count;
        }
      });
    },
    decrement: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          if (item.count === 1) {
            return item;
          } else {
            item.count -= 1;
          }
        }
      });
    },
  },
});

export const cartReducer = cartSlice.reducer
export const { addItem, removeItem, increment, incrementmore, decrement } = cartSlice.actions;