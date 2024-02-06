import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Sort, sortPopup} from "../components/Sort"; // Import sortPopup from Sort
import { HomeProps, PizzaBlocks } from "../assets/types";
import { PizzaBlock } from "../components/pizza-block/PizzaBlock";
import Categories from "../components/Categories";
import qs from "qs";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSort, setPageCount } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";


export const Home: React.FC<HomeProps> = ({searchValue}) => {
    const [items, setItems] = useState<any[]>([]);
    const perPageSize = 8;
    const isSearch = useRef<boolean>(false);
    const isMounted = useRef<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pageCount: any = useSelector<any>(state => state.filter.pageCount)
    const category : any = useSelector<any>(state => state.filter.categoryId)
    const sortBy: any = useSelector<any>(state => state.filter.sort);

    const onClickCategory = (i: number) => {
        dispatch(setCategory(i))
    }
    const onClickSorting = (i : any) => {
        dispatch(setSort(i))
    }

    const onChangePage = (page: number) => {
        dispatch(setPageCount(page))
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
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };
        fetchPizzas();
    }, [category, sortBy, searchValue, pageCount]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            // Find the sort object or use a default value if not found
            const sort = sortPopup.find((obj: any) => obj.sortProperty === params.sortBy) || sortPopup[0];

            dispatch(setSort(sort));
            dispatch(setPageCount(Number(params.pageCount)));
            dispatch(setCategory(Number(params.categoryId)));
            isSearch.current = true
        }
        else {
            dispatch(setSort(sortPopup[0]));
            dispatch(setPageCount(1));
            dispatch(setCategory(0));
        }
    },[]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     if(!isSearch.current) {
    //
    //     }
    // }, []);

    useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                sortProperty: sortBy.sortProperty,
                categoryId: category,
                pageCount: pageCount
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [category, sortBy.sortProperty,  pageCount]);

    return (
        <>
            <div className="content__top">
                <Categories value={category} onClickCategory={onClickCategory}/>
                <Sort value={sortBy} onChangeSort={onClickSorting}/>
            </div>
            <div className="content__items">
                {items.filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((pizza: PizzaBlocks, i: number) => (
                    <div key={i} className="content__item">
                        <PizzaBlock key={i}   {...pizza} />
                    </div>
                ))}
            </div>
            <div className="pagination">
                <Pagination
                    current={pageCount as number ?? 1}
                    onChange={onChangePage}
                    defaultCurrent={1}
                    total={20} // Set the total based on the actual number of items
                />
            </div>
        </>
    );
};
