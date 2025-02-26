import React from "react";
import { PizzaItem } from "../../assets/types";
import { currency } from "../../assets/constans";
import { useDispatch, useSelector } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/slices/cartSlice";
import {selectItems} from "../../redux/selectors";

export const CartItem: React.FC<PizzaItem> = ({ id, name, price, size }) => {
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const count = 2;
    console.log(items);

    const onClickPlus = () => {
        dispatch(addItem({ id, price }));
    };

    const onClickMinus = () => {
        if (count > 1) {
            dispatch(minusItem({ id, size }));
        } else {
            onClickRemove();
        }
    };

    const onClickRemove = () => {
        dispatch(removeItem({ id, size }));
    };

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{name}</h3>
                <p>{size}</p>
            </div>
            <div className="cart__item-count">
                <button onClick={onClickMinus} className="button button--outline button--circle cart__item-count-minus">
                    -
                </button>
                <b>{count}</b>
                <button onClick={onClickPlus} className="button button--outline button--circle cart__item-count-plus">
                    +
                </button>
            </div>
            <div className="cart__item-price">
                <b>{price * count} {currency}</b>
            </div>
            <div onClick={onClickRemove} className="cart__item-remove">
                <button className="button button--outline button--circle">X</button>
            </div>
        </div>
    );
};
