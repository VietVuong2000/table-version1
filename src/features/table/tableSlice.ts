
import { createSlice } from '@reduxjs/toolkit'
import { start } from 'repl';

const initialState : any = {
  tables: []


};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {

    getDataTable: (state, action) => {
      state.tables = action.payload
    },
    getDataDelete: (state, action) => {
      state.tables = [
        ...state.tables,
      ]
    }
  }
})

// Action creators are generated for each case reducer function
export const { getDataTable, getDataDelete } = tableSlice.actions

export default tableSlice.reducer