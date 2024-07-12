import {createSlice} from '@reduxjs/toolkit';
import StaticVariables from '../../Preferences/StaticVariables';

type AddFriendReduxStateType = {
  addedFriends: any[];
};

const initialState: AddFriendReduxStateType = {
  addedFriends: StaticVariables.EMPTY_ARRAY,
};

export const AddFriendSlice = createSlice({
  name: 'AddFriend',
  initialState,
  reducers: {
    updateFriends: (state, action) => {
      state.addedFriends = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateFriends} = AddFriendSlice.actions;

export default AddFriendSlice.reducer;
