import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setSession } from "@/auth/utils";
import { IUser } from "@/types/user";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  authLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.authLoading = false;
      state.accessToken = "";
      state.user = null;
      setSession(null);
      localStorage.removeItem("accessToken");
    },
    setToken: (state, action: PayloadAction<string>) => {
      setSession(action.payload);
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.authLoading = false;
      state.isAuthenticated = true;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
  },
});

export const { logout, setUser, setAuthLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
