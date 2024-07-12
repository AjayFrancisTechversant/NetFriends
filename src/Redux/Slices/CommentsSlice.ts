import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import StaticVariables from '../../Preferences/StaticVariables';
import {
  addNewComment,
  deleteComment,
  getAllComments,
  updateComment,
} from '../../Services/API/CommentsAPIs';
import {
  NewCommentDetailsType,
  UpdatingCommentDetailsType,
} from '../../Types/Types';

type CommentsReduxStateType = {
  comments: any[];
  loading: boolean;
  error: null | string;
};

const initialState: CommentsReduxStateType = {
  comments: StaticVariables.EMPTY_ARRAY,
  loading: false,
  error: null,
};

export const fetchAllComments = createAsyncThunk(
  'comments/fetchAllComments',
  async () => {
    const response = await getAllComments();
    return response;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newCommentDetails: NewCommentDetailsType) => {
    const response = await addNewComment(newCommentDetails);
    return response;
  },
);

export const deleteAComment = createAsyncThunk(
  'comments/deleteAComment',
  async (id: number) => {
    const response = await deleteComment(id);
    return response;
  },
);

export const updateAComment = createAsyncThunk(
  'comments/updateAComment',
  async (updatingCommentDetails: UpdatingCommentDetailsType) => {
    const response = await updateComment(updatingCommentDetails);
    return response;
  },
);

const CommentsSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = [...state.comments, ...action.payload];
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching users';
      })
      .addCase(addComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error adding comment';
      })
      .addCase(deleteAComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteAComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error deleting comment';
      })
      .addCase(updateAComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.map(comment =>
          comment.id === action.payload.id ? action.payload : comment,
        );
      })
      .addCase(updateAComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error updating comment';
      });
  },
});

// export const {} = CommentsSlice.actions

export default CommentsSlice.reducer;
