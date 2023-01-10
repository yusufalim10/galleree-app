import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import searchReducer from './features/searchSlice';
import imagesReducer from './features/imagesSlice';
import navbarReducer from './features/navbarSlice'

const store = configureStore({
    reducer: {
        search: searchReducer,
        images: imagesReducer,
        navbar: navbarReducer
    }
})

export default store

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector