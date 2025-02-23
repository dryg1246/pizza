import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaSliceState, FetchPizzasParams, Status, PizzaItem} from "../../assets/types";
import PizzaService from "../../services/pizza.service";

const initialState : PizzaSliceState = {
    items: [],
    status: Status.LOADING,
    count: 0,
};


export const fetchPizzasData = createAsyncThunk<PizzaItem[], FetchPizzasParams>('pizzas/fetchPizzasData', async(params ) => {
    const {categoryId, sortBy, searchValue, pageCount, perPageSize} = params;

    const response = await  PizzaService.getOnlyPizzas(categoryId, sortBy, searchValue, pageCount, perPageSize);
    return response.data;
});

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzasData.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzasData.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzasData.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
});


export const {setCount, setPizzas} = pizzasSlice.actions;

export default pizzasSlice.reducer;