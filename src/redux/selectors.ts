export const selectorCartItemById = (id: number) => (state: any) => state.cart.items.find((obj: any) => obj.id === id)
export const selectCart = (state: any) => state.cart;

export const selectFilter = (state: any) => state.filter

export const selectItems = (state: any) => state.pizza