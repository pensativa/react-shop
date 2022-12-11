import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { ProductItem } from "../../types/Product"

const initialState: ProductItem[] = []

export const fetchProducts = createAsyncThunk(
    "fetchProducts",

   async () => {
    const jsonData = await fetch("https://api.escuelajs.co/api/v1/products")
    return await jsonData.json()
   }
)

const productsSlice = createSlice({
    name: "productsSlice",
    initialState,
    reducers: {
        
    },
    extraReducers: (build) => {
        build.addCase(fetchProducts.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const productsReducer = productsSlice.reducer