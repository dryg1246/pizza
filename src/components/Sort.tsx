import React, { useState } from "react";
import { SortProps } from "../assets/types";




export const Sort: React.FC<SortProps> = ({ value, onChangeSort }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const sortPopup = [
        { name: "popular", sortProperty: "rating" },
        { name: "price", sortProperty: "price" },
        { name: "alphabet", sortProperty: "title" },
    ];

    const handleSortClick = (selectedSort: { name: string; sortProperty: string }) => {
        onChangeSort(selectedSort);
        setIsVisible(false);
    };
console.log(value)
    return (
        <div className="sort">
            <div className="sort__label">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG Path for the arrow icon */}
                </svg>
                <b>Sort by</b>
                <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
            </div>
            {isVisible && (
                <div className="sort__popup">
                    <ul>
                        {sortPopup.map((obj, i) => (
                            <li
                                key={i}
                                className={value.sortProperty === obj.sortProperty ? "active" : ""}
                                onClick={() => handleSortClick(obj)}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};