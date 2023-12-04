
import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./reducer/sessionReducer";
import { itemsReducer } from "./reducer/itemsReducer";
import { sessionItemReducer } from "./reducer/sessionItemReducer";
export const store = configureStore({
    reducer: {
        sessionReducer,
        itemsReducer,
        sessionItemReducer
    },
});
