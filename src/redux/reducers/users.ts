import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"
import { UserOne, UserReducer, UserRegistrate } from "../../types/User";

const initialState: UserReducer = {
  users: [],
  currentUser: undefined
};

export const fetchUsers = createAsyncThunk(
  "fetchUsers",

  async () => {
    const response = await axios.get("https://api.escuelajs.co/api/v1/users");
    return response.data;
  }
);

export const login = createAsyncThunk(
  "login",
  async (token: string) => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return response.data
    } catch(e) {
      console.log(e)
    }
 }
);

  export const createUser = createAsyncThunk(
    "createUser",
    async (data: UserRegistrate) => {
      try {
        await axios.post("https://api.escuelajs.co/api/v1/users/", data);
      } catch (e) {
        console.log(e);
      }
    }
  );
  
  export const updateUser = createAsyncThunk(
    "updateUser",
    async (data: UserOne) => {
      console.log(data.id)
      try {
        await axios.put(`https://api.escuelajs.co/api/v1/users/${data.id}`, data);
      } catch (e) {
        console.log(e);
      }
    }
  );

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = undefined
      localStorage.clear()
    }
  },
  extraReducers: (build) => {
    build
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserOne[]>) => {
          state.users = action.payload;
        }
      )
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserOne>) => {
          state.currentUser = action.payload
        }
      );
  },
});

export const usersReducer = usersSlice.reducer;
export const {logOut} = usersSlice.actions;
