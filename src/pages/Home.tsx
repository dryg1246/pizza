import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Sort, sortPopup } from "../components/Sort";
import { HomeProps, PizzaBlocks } from "../assets/types";
import { PizzaBlock } from "../components/pizza-block/PizzaBlock";
import Categories from "../components/Categories";
import qs from "qs";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSort, setPageCount } from "../redux/slices/filterSlice";
// import {fetchPizzasData} from "../redux/slices/pizzasSlice";
import {useNavigate} from "react-router-dom";
import {setPizzas} from "../redux/slices/pizzasSlice";
import {selectFilter, selectItems} from "../redux/selectors";
import {FilterSliceState} from "../assets/types";



export const Home: React.FC<HomeProps> = ({ searchValue }) => {
    const perPageSize = 8;
    const isSearch = useRef<boolean>(false);
    const isMounted = useRef<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {categoryId, sortBy, pageCount}: FilterSliceState = useSelector(selectFilter);
    const {items}: any = useSelector<any>(selectItems);


    const onClickCategory = (i: number) => {
        dispatch(setCategory(i));
    };
    const onClickSorting = (i: any) => {
        dispatch(setSort(i));
    };

    const onChangePage = (page: number) => {
        dispatch(setPageCount(page));
    };

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                // await dispatch(fetchPizzasData());
                const response = await axios.get(
                    `https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas`,
                    {
                        params: {
                            category: categoryId !== 0 ? categoryId : "",
                            sortBy: sortBy.sortProperty,
                            order: "asc",
                            search: searchValue,
                            page: pageCount,
                            limit: perPageSize,
                        },
                    }
                );
                dispatch(setPizzas(response.data));
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };
        fetchPizzas();
    }, [categoryId, sortBy, searchValue, pageCount, dispatch]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort =
                sortPopup.find((obj: any) => obj.sortProperty === params.sortBy) ||
                sortPopup[0];

            dispatch(setSort(sort));
            dispatch(setPageCount(Number(params.pageCount)));
            dispatch(setCategory(Number(params.categoryId)));
            isSearch.current = true;
        } else {
            dispatch(setSort(sortPopup[0]));
            dispatch(setPageCount(1));
            dispatch(setCategory(0));
        }
    }, [dispatch]); // Include dispatch in dependencies

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortBy.sortProperty,
                categoryId: categoryId,
                pageCount: pageCount,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortBy.sortProperty, pageCount, navigate]);

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort value={sortBy} onChangeSort={onClickSorting} />
            </div>
            <div className="content__items">
                {items
                    .filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((pizza: PizzaBlocks, i: number) => (
                        <div key={i} className="content__item">
                            <PizzaBlock key={i} {...pizza} />
                        </div>
                    ))}
            </div>
            <div className="pagination">
                <Pagination
                    current={pageCount as number ?? 1}
                    onChange={onChangePage}
                    defaultCurrent={1}
                    total={20} // Dynamically calculate total based on items length
                />
            </div>
        </>
    );
};