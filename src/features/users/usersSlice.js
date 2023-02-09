import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://blue-journalist-bbrpv.ineuron.app:4000/users");
  const users = await response.json();
  const userData = users.data;
  console.log(userData);
  return userData;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entries: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entries.push(action.payload);
    },
    userUpdated(state, action) {
      const  id = action.payload._id;
      const existingUser = state.entries.find((user) => user.id === id);
      if (existingUser) {
        existingUser.firstName = action.payload.firstName;
        existingUser.lastName = action.payload.lastName;
        existingUser.phoneNumber = action.payload.phoneNumber;
        
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entries.find((user) => user._id === id);
      if (existingUser) {
        state.entries = state.entries.filter((user) => user._id !== id);
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      console.log(action.payload);
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entries = [...state.entries, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
