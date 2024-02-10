import React, { useCallback, useContext, useState } from "react";
import "./Search.scss";
import { SearchOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import { SearchContext } from "../../App";

export const Search = () => {
    const [value, setValue] = useState<string>("");
    const { setSearchValue } = useContext(SearchContext);


    const updateSearchValue = useCallback(
        debounce((str: string) => {
            setSearchValue(str);
        }, 1000),
        []
    );

    const OnClickSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className="root">
            <input
                value={value}
                placeholder={"Search..."}
                onChange={OnClickSearch}
                className="search__input"
            />
            <SearchOutlined className="search__icon" />
        </div>
    );
};