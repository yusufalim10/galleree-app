import { createSlice } from "@reduxjs/toolkit";

interface navbarModel {
    onHomepage: boolean,
    onLikedPage: boolean
}

const initialState: navbarModel = {
    onHomepage: true,
    onLikedPage: false
}

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        likedPageClick: (state) => {
            state.onHomepage = false
            state.onLikedPage = true
        },

        homePageClick: (state) => {
            state.onHomepage = true
            state.onLikedPage = false
        }
    }
})

export const { likedPageClick, homePageClick } = navbarSlice.actions

export default navbarSlice.reducer