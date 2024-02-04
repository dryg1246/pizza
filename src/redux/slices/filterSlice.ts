import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSliceState {
    categoryId: number;
    sort: {
        name: string;
        sortProperty: string;
    };
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sort: {
        name: 'popular',
        sortProperty: 'rating',
    },
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            console.log("ddsd" + action.payload);
            state.categoryId = action.payload;
        },
        setSort: (state, action: PayloadAction<{ name: string; sortProperty: string }>) => {
            state.sort = action.payload;
        },
    },
});

export const { setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;