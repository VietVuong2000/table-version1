import { configureStore } from '@reduxjs/toolkit'
import { table } from 'console'
import tableReducer from '..//features/table/tableSlice'
import { type } from 'os'

export const store = configureStore({
    reducer: {
      table: tableReducer,
    
    }
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch