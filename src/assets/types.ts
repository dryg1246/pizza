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