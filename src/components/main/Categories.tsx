import React, { useState } from "react";

interface CategoriesProps {
    // Define any additional props your component might take
}

export const Categories : React.FC<CategoriesProps> = (props) => {
    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
    const [activeCategory, setActiveCategory] = useState<number>(0);

    const handleCategoryClick = (index : number) => {
        setActiveCategory(index);
    };

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={category} className={activeCategory === index ? 'active' : ''}
                        onClick={() => handleCategoryClick(index)} >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;