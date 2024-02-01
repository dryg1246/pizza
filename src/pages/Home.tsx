import React, {useEffect, useState} from "react";
import axios from "axios";
import {Sort} from "../components/main/Sort";
import {PizzaBlocks} from "../assets/types";
import {PizzaBlock} from "../components/main/pizza-block/PizzaBlock";
import Categories from "../components/main/Categories";

export const Home: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get("https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas");
                setItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };

        fetchPizzas();
    }, []);
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <div className="content__items">
                {items.map((pizza: PizzaBlocks, i: number) => (
                    <div className="content__item">
                        <PizzaBlock
                            key={i}
                            {...pizza}
                        />
                    </div>
                ))}
            </div>
        </>

    );
};
