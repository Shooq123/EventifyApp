import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import bookReducer from "../Features/BookSlice"; 

export const store = configureStore({
  reducer: {
    users: usersReducer,
    books: bookReducer, 
  },
});