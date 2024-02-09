import React, {useEffect, useRef, useState} from "react";
import { SortProps } from "../assets/types";

type SortItem = {
    name: string;
    sortProperty: string;
}

export const sortPopup: SortItem[] = [
    { name: "popular", sortProperty: "rating" },
    { name: "price", sortProperty: "price" },
    { name: "alphabet", sortProperty: "title" },
];


 export const Sort: React.FC<SortProps> = ({ value, onChangeSort }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const handleSortClick = (selectedSort: SortItem) => {
        onChangeSort(selectedSort);
        setIsVisible(false);
    };


     useEffect(() => {
         const handleOutsideClick = (event: MouseEvent) => {
             if (sortRef.current && !event.composedPath().includes(sortRef.current)){
                 setIsVisible(false);
                 console.log('ddd')
             }
         }

         document.body.addEventListener ('click', handleOutsideClick);

         return () => document.body.removeEventListener ('click', handleOutsideClick);
     }, []);
    return (
        <div ref={sortRef}  className="sort">
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
