import React, {useEffect, useState} from "react";
import {PizzaItem} from "../../assets/types";
import {currency} from "../../assets/constans";
import {Link} from "react-router-dom";
import PizzaService from "../../services/pizza.service";


interface PizzaBlockProps {
    id: number;
}

export const PizzaBlock = ({ id }: PizzaBlockProps) => {
    const [activeSizeSelector, setActiveSizeSelector] = useState<number>(0);
    const selectorChoice = ["thin", "traditional"];
    const [pizza, setPizza] = useState<PizzaItem | null>(null);

 /*    const onClickAdd = () => {
        const item: PizzaItem = {
            id,
            title,
            price,
            imageUrl,
            type: selectorChoice[activeSizeSelector],
            size: sizes[activeSize],
        }
        dispatch(addItem(item))
    } */

    useEffect(() => {
        PizzaService.getPizzaById(id).then(res => {
            console.log("Image response:", res.data);
            if (res.data) {
                setPizza(res.data);
            }
        }).catch(err => {
            console.error('Error fetching pizza:', err);
        });
    }, [id])

    console.log("Image: " + pizza?.name)
    return (
        <div className="pizza-block">

            <div className="wrapper">
                <Link to={`/pizza/${id}`}>
                    <img className="pizza-block__image" src={`/images/${pizza?.image}`} alt="Pizza" onError={(e) => console.error('Image error:', e)} />
                </Link>
                <h4 className="pizza-block__title">{pizza?.name}</h4>
                <p>{pizza?.size}</p>
                <div className="pizza-block__selector">
                    <ul>
                        {selectorChoice.map((type, i) => {
                            return (
                                <li
                                    key={i}
                                    className={activeSizeSelector === i ? "active" : ""}
                                    onClick={() => setActiveSizeSelector(i)}
                                >
                                    {type}
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        {/* {sizes.map((size, i) => { */}
                        {/*     return <li */}

                        {/*         className={activeSize === i ? "active" : ""} onClick={() => setActiveSize(i)} */}
                        {/*                key={"active"}>{size} cm</li>; */}
                        {/* })} */}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{pizza?.price}{currency}</div>
                    <button
                            className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Added</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
