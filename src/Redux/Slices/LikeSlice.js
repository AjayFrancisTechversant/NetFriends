import { createSlice } from '@reduxjs/toolkit'
import StaticVariables from '../../Preferences/StaticVariables'

const initialState = {
  likedUsers:StaticVariables.EMPTY_ARRAY
}

export const LikeSlice = createSlice({
  name: 'Likes',
  initialState,
  reducers: {
    updateLikes: (state,action) => {
      state.likedUsers=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateLikes} = LikeSlice.actions

export default LikeSlice.reducer