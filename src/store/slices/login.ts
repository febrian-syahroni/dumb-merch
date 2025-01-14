import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const loginUser = createAsyncThunk<
  { token: string; roleId: number }, // Fulfilled payload type
  { email: string; password: string }, // Arguments type
  { rejectValue: string } // Rejected payload type
>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const message = (await response.json()).error || 'Login failed';
        return thunkAPI.rejectWithValue(message);
      }

      const data = await response.json();
      return data; // { token, roleId }
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.roleId = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roleId = action.payload.roleId;

        // Simpan ke localStorage
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to login';
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
