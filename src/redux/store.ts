import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";

export const store : any = configureStore({
    reducer: {
        filter: filterSlice,
        cart:  cartSlice,
    }
})

