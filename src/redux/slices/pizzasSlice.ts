import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzasData = createAsyncThunk('pizzas/fetchPizzasData', async(params, thunkAPI ) => {
    const response = await axios.get('https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas');
    console.log(thunkAPI)
    return response.data;
});
const initialState: {items: { id: string, type: string, size: string }[]} = {
    items: [],
};

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload;
        },
    },
});



export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;