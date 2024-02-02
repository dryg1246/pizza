import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sort } from "../components/Sort";
import { HomeProps, PizzaBlocks } from "../assets/types";
import { PizzaBlock } from "../components/pizza-block/PizzaBlock";
import Categories from "../components/Categories";
import { Pagination } from "antd";

export const Home: React.FC<HomeProps> = ({ searchValue }) => {
    const [items, setItems] = useState<any[]>([]);
    const [category, setCategory] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(1);
    const [sortBy, setSortBy] = useState<any>({
        name: "popular",
        sortProperty: "rating",
    });
    const perPageSize = 8;
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get(
                    `https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas`,
                    {
                        params: {
                            category: category !== 0 ? category : "",
                            sortBy: sortBy.sortProperty,
                            order: "asc",
                            search: searchValue,
                            page: pageCount,
                            limit: perPageSize,
                        },
                    }
                );

                console.log("API Response:", response);

                setItems(response.data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };

        fetchPizzas();
    }, [category, sortBy, searchValue, pageCount]);

    return (
        <>
            <div className="content__top">
                <Categories value={category} onClickCategory={(a) => setCategory(a)} />
                <Sort value={sortBy} onChangeSort={(i) => setSortBy(i)} />
            </div>
            <div className="content__items">
                {items.filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((pizza: PizzaBlocks, i: number) => (
                    <div key={i} className="content__item">
                        <PizzaBlock {...pizza} />
                    </div>
                ))}
            </div>
            <div className="pagination">
            <Pagination
                current={pageCount}
                onChange={(pageNumber: number) => setPageCount(pageNumber)}
                defaultCurrent={1}
                total={20} // Set the total based on the actual number of items
            />
            </div>
        </>
    );
};
