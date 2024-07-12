import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getUsers} from '../../Services/API/getUsers';
import StaticVariables from '../../Preferences/StaticVariables';

type UsersReduxStateType = {
  users: any[];
  loading: boolean;
  error: null | string;
};

const initialState: UsersReduxStateType = {
  users: StaticVariables.EMPTY_ARRAY,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    const response = await getUsers(page);
    return response;
  },
);

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching users';
      });
  },
});

export default UsersSlice.reducer;
