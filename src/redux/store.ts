import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";

export const store : any = configureStore({
    reducer: {
        filter: filterSlice,
    }
})

