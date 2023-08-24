import { configureStore } from "@reduxjs/toolkit";

import menuReducer from './menuReducers';

export const store = configureStore({
    reducer: {
        menu: menuReducer,
    },
})