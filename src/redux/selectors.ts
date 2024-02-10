import {RootState} from "./store";

export const selectorCartItemById = (id: number) => (state: RootState) => state.cart.items.find((obj: any) => obj.id === id)
export const selectCart = (state: RootState) => state.cart;

export const selectFilter = (state: RootState) => state.filter

export const selectItems = (state: RootState) => state.pizza