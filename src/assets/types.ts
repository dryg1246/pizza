

export interface PizzaItem {
    id: number;
    name: string;
    price: number;
    size: string;
    image: null;
}

export interface FetchPizzasParams {
    categoryId: number;
    sortBy: { sortProperty: string };
    searchValue: string;
    pageCount: number;
    perPageSize: number;
}

// Define PizzaBlocks type
export interface PizzaItem {
    // Define the structure of PizzaBlocks according to your data
    // For example:
    id: number;
    name: string;
    // Add more properties as needed
}
export interface CategoriesProps {
    value: number;
    onClickCategory: (index: number) => void;
}

export interface SortProps {
    value: { name: string; sortProperty: string };
    onChangeSort: (obj: { name: string; sortProperty: string }) => void;
}

//export type HeaderProps = {
//    searchValue: string;
//    onChangeSearch: (value: string) => void;
//};
export interface HomeProps {
    searchValue: string
}

export enum CategoryProps {
    All,
    Meat,
    Vegetarian,
    Grill,
    Spicy
}

export type FilterSliceState = {
    categoryId: number;
    pageCount: number;
    sortBy: {
        name: string;
        sortProperty: string
    };
}
export interface CartItem {
    id: string;
    type: string;
    size: string;
    count: number;
    price: number;
}
export interface CartSliceState {
    items: CartItem[];
    totalPrice: number;
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}

