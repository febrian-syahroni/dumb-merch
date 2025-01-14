import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  roleId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  roleId: null,
  loading: false,
  error: null,
};

// Thunk untuk registrasi
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const message = (await response.json()).error || "Registration failed";
        throw new Error(message);
      }

      return await response.json(); // Respons API berhasil
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.roleId = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = registerSlice.actions;
export default registerSlice.reducer;
