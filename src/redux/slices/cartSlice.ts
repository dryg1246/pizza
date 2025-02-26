import {createSlice} from "@reduxjs/toolkit";
import {CartSliceState} from "./../../assets/types";

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0
}


//export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
//    const response = await fetch("http://localhost:5000/api/cart/1");
//    return await response.json();
//});
//
//export const addToCart = createAsyncThunk("cart/addToCart", async (pizza) => {
//    await fetch("http://localhost:5000/api/cart/", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({ pizzaId: pizza.id, count: 1 }),
//    });
//    return pizza;
//});
//
//export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (pizzaId) => {
//    await fetch(`http://localhost:5000/api/cart/1/remove/${pizzaId}`, { method: "DELETE" });
//    return pizzaId;
//});
const refactorFindItem = (state: CartSliceState, payload: { id: string, type: string, size: string }) => {
    return state.items.find((obj) => {
        return obj.id === payload.id && obj.type === payload.type && obj.size === payload.size;
    });
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, { payload }) {
            const { id, price } = payload;
            const item = state.items.find((item) => item.id === id && item.price === price );

            if (item) {
                item.count += 1;
            } else {
                state.items.push({
                    ...payload,
                    count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        minusItem(state, {payload}){
            const findItem = refactorFindItem(state, payload);
            if(findItem) {
                findItem.count--;
            }
        },
        removeItem(state, { payload }) {
            state.items = state.items.filter((obj) => {
                return !(obj.id === payload.id && obj.type === payload.type && obj.size === payload.size);
            });
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0
        }
    },
});


export const {clearItem, addItem, removeItem, minusItem} = cartSlice.actions;

export default cartSlice.reducer;