import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { getUserData } from "@/app/lib/UserService";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as any,
    status: "idle",
    error: null as string | null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string | null;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await signIn("appIntroduction", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return rejectWithValue(result.error);
      }

      const userData = await getUserData(email);

      if (!userData) {
        return rejectWithValue("アドレスとパスワードに一致するユーザーが見つけられませんでした");
      }

      const { id, name, profile, appIntroductions } = userData;

      const formattedAppIntroductions = (appIntroductions).map((intro) => ({
        ...intro,
        createdAt: new Date(intro.createdAt).toISOString(),
        updatedAt: new Date(intro.updatedAt).toISOString(),
      }));

      return {
        id,
        name,
        profile,
        appIntroductions: formattedAppIntroductions,
      };
    } catch (error) {
      console.error("ログインに失敗しました", error);
      throw error;
    }
  }
);
