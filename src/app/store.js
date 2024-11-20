
import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../feature/post/Postslice'

export const  store = configureStore({
    reducer: {
        post :  postReducer
    }
})

export default store;