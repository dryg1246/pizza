import './scss/app.scss';
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Cart from "./pages/Cart";
import React, {useState} from "react";
import {PizzaInfoPages} from "./pages/PizzaInfoPages";
import {MainLayout} from "./layouts/MainLayout";

export const SearchContext = React.createContext({searchValue: '', setSearchValue: (value: string) => {}});

const App = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route path="" element={<Home searchValue={searchValue}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="pizza/:id" element={<PizzaInfoPages/>}/>
                    </Route>
                </Routes>
            </SearchContext.Provider>
    );
};

export default App;
