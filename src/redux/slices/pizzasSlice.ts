import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaSliceState, FetchPizzasParams, Status, PizzaItem} from "../../assets/types";

const initialState : PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};


export const fetchPizzasData = createAsyncThunk<PizzaItem[], FetchPizzasParams>('pizzas/fetchPizzasData', async(params ) => {
    const {categoryId, sortBy, searchValue, pageCount, perPageSize} = params;

    const response = await axios.get('https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas'
        ,
        {
            params: {
                category: categoryId !== 0 ? categoryId : "",
                sortBy: sortBy.sortProperty,
                order: "asc",
                search: searchValue,
                page: pageCount,
                limit: perPageSize,
            },
        }
    );
    return response.data;
});

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        },
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




export default pizzasSlice.reducer;