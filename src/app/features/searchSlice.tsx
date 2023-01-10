import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface searchModel {
    searchValue: string
}

const initialState: searchModel ={
    searchValue: ""
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        }
    }
})

export const { search } = searchSlice.actions

export default searchSlice.reducer