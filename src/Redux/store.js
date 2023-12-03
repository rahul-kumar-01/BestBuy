
import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./reducer/sessionReducer";
import { itemsReducer } from "./reducer/itemsReducer";
export const store = configureStore({
    reducer: {
        sessionReducer,
        itemsReducer,
    },
});
