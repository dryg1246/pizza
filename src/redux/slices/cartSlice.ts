import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import produce from 'immer';
interface CartItem {
    id: string;
    type: string;
    size: string;
    count: number;
    price: number;
}

interface CartSliceState {
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0
}

const refactorFindItem = (state: CartSliceState, payload: any): any => {
    return state.items.find((obj) => {
        return obj.id === payload.id && obj.type === payload.type && obj.size === payload.size;
    });
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, { payload }) {
            const findItem = refactorFindItem(state, payload);
            if (findItem) {
                findItem.count += 1;
            } else {
                state.items.push({
                    ...payload,
                    count: 1
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
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