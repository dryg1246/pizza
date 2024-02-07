export interface PizzaBlocks {
    title: string;
    price: number;
    sizes: number[];
    imageUrl: string;
    rating: number;
    id: number
    type: string
    size: string
    count: number
}
export interface FetchPizzasParams {
    categoryId: number;
    sortBy: { sortProperty: string }; // Assuming sortProperty is a string
    searchValue: string;
    pageCount: number;
    perPageSize: number;
}

// Define PizzaBlocks type
export interface PizzaBlocks {
    // Define the structure of PizzaBlocks according to your data
    // For example:
    id: number;
    name: string;
    // Add more properties as needed
}
export interface CategoriesProps {
    value: number;
    onClickCategory: (index: number) => any
}

export interface SortProps {
    value: { name: string; sortProperty: string };
    onChangeSort: (obj: { name: string; sortProperty: string }) => void;
}

export type HeaderProps = {
    searchValue: string;
    onChangeSearch: (value: string) => void;
};
export interface HomeProps {
    searchValue: string
}

export interface FilterSliceState {
    categoryId: number;
    pageCount: number;
    sortBy: {
        name: string;
        sortProperty: string;
    };
}