import React, {useEffect, useState} from "react";
import axios from "axios";
import {Sort} from "../components/Sort";
import {HomeProps, PizzaBlocks} from "../assets/types";
import {PizzaBlock} from "../components/pizza-block/PizzaBlock";
import Categories from "../components/Categories";
import {Pagination} from "antd";
import {useSelector, useDispatch} from "react-redux";
import  {setCategory, setSort} from "../redux/slices/filterSlice";

export const Home: React.FC<HomeProps> = ({searchValue}) => {
    const [items, setItems] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const perPageSize = 8;

    const category : any = useSelector<any>(state => state.filter.categoryId)
    const sortBy: any = useSelector<any>(state => state.filter.sort);
    const dispatch = useDispatch();

    const onClickCategory = (i: number) => {
        dispatch(setCategory(i))
    }
    const onClickSorting = (i : any) => {
        dispatch(setSort(i))
    }
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
                <Categories value={category} onClickCategory={onClickCategory}/>
                <Sort value={sortBy} onChangeSort={onClickSorting}/>
            </div>
            <div className="content__items">
                {items.filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((pizza: PizzaBlocks, i: number) => (
                    <div key={i} className="content__item">
                        <PizzaBlock key={i}  {...pizza} />
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
