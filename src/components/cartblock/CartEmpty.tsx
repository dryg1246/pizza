import React from "react";
let emptyCart = require("../../assets/images/empty-cart.png");

export const CartEmpty = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <div className="container container--cart">
                    <div className="cart cart--empty">
                        <h2>Cart Empty 😕</h2>
                        <p>
                            Most likely, you haven't ordered pizza yet. <br/>
                            To order pizza, go to the main page.
                        </p>
                        <img src={emptyCart} alt="Empty cart"/>
                        <a href="/public" className="button button--black">
                            <span>Go back</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
