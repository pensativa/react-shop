import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { CategoryProps } from "../../types/Category"

const initialState: CategoryProps[] = []

export const fetchCategories = createAsyncThunk(
    "fetchCategories",

   async () => {
    const jsonData = await fetch("https://api.escuelajs.co/api/v1/categories")
    return await jsonData.json()
   }
)

const catSlice = createSlice({
    name: "catSlice",
    initialState,
    reducers: {
        filterItem: (state, action) => {
            state.push(action.payload)
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchCategories.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export const catReducer = catSlice.reducer
export const { filterItem } = catSlice.actions