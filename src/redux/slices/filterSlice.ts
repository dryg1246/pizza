import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FilterSliceState {
    categoryId: number;
    pageCount: number;
    sort: {
        name: string;
        sortProperty: string;
    };
}

const initialState: FilterSliceState = {
    categoryId: 0,
    pageCount: 1,
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
            state.categoryId = action.payload;
        },
        setSort: (state, action: PayloadAction<{ name: string; sortProperty: string }>) => {
            state.sort = action.payload;
        },
        setPageCount: (state, action) => {
            state.pageCount = action.payload;
        },

        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort
            state.pageCount = Number(action.payload.pageCount);
        }
    },
});

export const {setCategory, setSort, setPageCount, setFilters} = filterSlice.actions;

export default filterSlice.reducer;