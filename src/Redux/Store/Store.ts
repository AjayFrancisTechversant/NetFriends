import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LikesReducer from '../Slices/LikeSlice';
import AddFriendReducer from '../Slices/AddFriendSlice';
import UsersReducer from '../Slices/UsersSlice';
import CommentsReducer from '../Slices/CommentsSlice';
import Form1DataReducer from '../Slices/Form1DataSlice';

// Configure persist options
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Likes', 'AddFriend','Form1Data'],
  blacklist: ['Users', 'Comments'],
};

//combine all reducers into rootreducers
const rootReducer = combineReducers({
  Likes: LikesReducer,
  AddFriend: AddFriendReducer,
  Users: UsersReducer,
  Comments: CommentsReducer,
  Form1Data:Form1DataReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using configureStore and the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// Create a persisted store using persistStore
const persistor = persistStore(store);

export {store, persistor};
