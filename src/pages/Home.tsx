import React, {useEffect, useState} from "react";
import axios from "axios";
import {Sort} from "../components/main/Sort";
import {PizzaBlocks} from "../assets/types";
import {PizzaBlock} from "../components/main/pizza-block/PizzaBlock";
import Categories from "../components/main/Categories";

export const Home: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [category, setCategory] = useState<number>(0);
    const [sortBy, setSortBy] = useState<{ name: string; sortProperty: string }>({
        name: "популярности",
        sortProperty: "rating",
    });

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get(`https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas`, {
                    params: {
                        category: category !== 0 ? category : "",
                        sortBy: sortBy.sortProperty,
                        order: "asc",
                    },
                });

                console.log("API Response:", response);

                setItems(response.data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };

        fetchPizzas();
    }, [category, sortBy]);

    return (
        <>
            <div className="content__top">
                <Categories value={category} onClickCategory={(i: number) => setCategory(i)} />
                {/* Pass the correct prop type to Sort component */}
                <Sort value={sortBy} onChangeSort={(sortObject) => setSortBy(sortObject)} />
            </div>
            <div className="content__items">
                {items.map((pizza: PizzaBlocks, i: number) => (
                    <div key={i} className="content__item">
                        <PizzaBlock {...pizza} />
                    </div>
                ))}
            </div>
        </>
    );
};