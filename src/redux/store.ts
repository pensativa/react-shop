import { configureStore } from "@reduxjs/toolkit"
import { cartReducer } from "./reducers/cartview"
import { catReducer } from "./reducers/category"
import { productsReducer } from "./reducers/products"
import { usersReducer } from "./reducers/users"


const store = configureStore({
  reducer: {
    productsReducer,
    cartReducer,
    catReducer,
    usersReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store