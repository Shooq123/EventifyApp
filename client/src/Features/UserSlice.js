import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Create the thunk for user registration
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post("http://localhost:3001/registerUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return response.data.user; // Return the user from the server response
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for the rejected case
    }
  }
);

// Create the thunk for user login
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });
    return response.data.user; // Return the user from the server response
  } catch (error) {
    alert("Invalid credentials"); // Display error message
    throw new Error("Invalid credentials"); // Rethrow error for rejected case
  }
});

// Create the thunk for user logout
export const logout = createAsyncThunk("users/logout", async () => {
  try {
    await axios.post("http://localhost:3001/logout");
  } catch (error) {
    console.error(error);
  }
});

// Create the user slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.email !== action.payload);
    },
    updateUser: (state, action) => {
      const user = state.value.find((user) => user.email === action.payload.email);
      if (user) {
        user.name = action.payload.name;
        user.password = action.payload.password;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {};
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;