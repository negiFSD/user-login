import { createSlice } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  authenticateUser,
} from "../utils/localSotrageManager";

export interface userDataType {
  email: string;
  password: string;
}

interface userFeatureType {
  stateValue : string
}

const initialState: userFeatureType = {
  stateValue: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: () => {
      authenticateUser(true)
    },
    signUpUSer: (_, action: { payload: userDataType }) => {
      addUserToLocalStorage(action.payload);
    },
    logOutUser: (state) => {
      authenticateUser(false);
    },
  },
});

export const { signUpUSer, logOutUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
