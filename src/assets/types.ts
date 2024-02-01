export interface PizzaBlocks {
    title: string;
    price: number;
    sizes: number[];
    imageUrl: string;
    rating: number;
}

export interface CategoriesProps {
    value: number
    onClickCategory: (index: number) => void
}

export interface SortProps {
    value: { name: string; sortProperty: string };
    onChangeSort: (sortObject: { name: string; sortProperty: string }) => void;
}
