import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterSliceState} from "../../assets/types";


const initialState: FilterSliceState = {
    categoryId: 0,
    pageCount: 1,
    sortBy: {
        name: 'popular',
        sortProperty: 'rating',
    },
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.categoryId = action.payload;
        },
        setSort: (state, action: PayloadAction<{ name: string; sortProperty: string }>) => {
            state.sortBy = action.payload;
        },
        setPageCount: (state, action) => {
            state.pageCount = action.payload;
        },
    },
});

export const {setCategory, setSort, setPageCount} = filterSlice.actions;

export default filterSlice.reducer;