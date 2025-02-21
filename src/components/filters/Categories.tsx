import React from "react";
import {CategoriesProps} from "../../assets/types";
import { useWhyDidYouUpdate } from 'ahooks';


export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy'];
    useWhyDidYouUpdate('Categories', { value, onClickCategory })
    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={category} className={value === index ? 'active' : ''}
                        onClick={() => onClickCategory(index)} >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
});