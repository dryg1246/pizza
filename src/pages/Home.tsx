import React, {useCallback, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { setCategory, setSort, setPageCount } from "../redux/slices/filterSlice";
import {useNavigate} from "react-router-dom";
import {fetchPizzasData} from "../redux/slices/pizzasSlice";
import {selectFilter, selectItems} from "../redux/selectors";
import {FilterSliceState} from "../assets/types";
import {useAppDispatch} from "../redux/hooks/useAppDispatch";

import {HomeProps, PizzaBlocks} from "../assets/types";
import qs from "qs";
import { Pagination } from "antd";

import {Categories, PizzaBlock, Sort, sortPopup} from "../components";



export const Home: React.FC<HomeProps> = ({ searchValue }) => {
    const perPageSize = 8;
    const isSearch = useRef<boolean>(false);
    const isMounted = useRef<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {categoryId, sortBy, pageCount}: FilterSliceState = useSelector(selectFilter);
    const {items}: any = useSelector(selectItems) ;


    const onClickCategory = useCallback((i: number) => {
        dispatch(setCategory(i));
    }, []);
    const onClickSorting = (i: { sortProperty: string , name: string}) => {
        dispatch(setSort(i));
    };

    const onChangePage = (page: number) => {
        dispatch(setPageCount(page));
    };

    useEffect(() => {
        if (isSearch.current) {
            dispatch(fetchPizzasData({searchValue, categoryId, sortBy, pageCount, perPageSize}));
        }
        isSearch.current = true;
    }, [categoryId, sortBy, pageCount, perPageSize, searchValue]);

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
                    .map((pizza : PizzaBlocks, i: number) => (
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
                    total={20}
                />
            </div>
        </>
    );
};