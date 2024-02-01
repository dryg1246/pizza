import React from "react";
import {CategoriesProps} from "../../assets/types";


export const Categories : React.FC<CategoriesProps> = ({value, onClickCategory}) => {
    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];


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
};

export default Categories;