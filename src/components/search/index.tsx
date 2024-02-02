import React from "react";
import "./Search.scss";
import {SearchOutlined} from "@ant-design/icons";
import {HeaderProps} from "../../assets/types";
export const Search: React.FC<HeaderProps> = ({searchValue, onChangeSearch}) => {
    console.log(searchValue)
    return (
        <div className="root">
        <input value={searchValue} placeholder={"Search..."} onChange={(i) => onChangeSearch(i.target.value)} className="search__input"/>
            <SearchOutlined  className="search__icon"/>

        </div>

    );

};
