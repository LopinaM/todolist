import { createAppSlice, handleServerAppError, handleServerNetworkError } from "src/common/utils";
import { Inputs } from "../lib/schemas";
import { ResultCode } from "src/common/enums";
import { setAppStatusAC } from "src/app/app-clice";
import { authApi } from "../api/authApi";
import { AUTH_TOKEN } from "src/common/constants";
import { clearDataAC } from "src/common/actions";
import { current } from "@reduxjs/toolkit";

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: Inputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await authApi.login(data);

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            localStorage.setItem(AUTH_TOKEN, res.data.data.token);
            return { isLoggedIn: true };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_args, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await authApi.logout();

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            dispatch(clearDataAC());
            localStorage.removeItem(AUTH_TOKEN);
            return { isLoggedIn: false };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await authApi.me();

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            return { isLoggedIn: true };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
        //settled выполняется как для fulfilled, так и для rejected экшенов (аналог finally для promise)
        settled: (state) => {
          state.isInitialized = true;
        },
      },
    ),
  }),
});

export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors;
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions;
export const authReducer = authSlice.reducer;
