import './scss/app.scss';
import Loadable from 'react-loadable';
import {Route, Routes} from "react-router-dom";
import React, {Suspense, useState} from "react";
import {MainLayout} from "./layouts/MainLayout";
import Loading from "@ant-design/icons/lib/icons/LoadingOutlined";

import {Home} from "./pages/Home";

const PizzaInfoPages = React.lazy( () => import(/* webpackChunkName: "PizzaInfo" */ './pages/PizzaInfoPages'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
    loading: () => <Loading />,
});

export const SearchContext = React.createContext({searchValue: '', setSearchValue: (value: string) => {}});

const App = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route path="" element={<Home searchValue={searchValue}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="pizza/:id" element={<PizzaInfoPages/>}/>
                    </Route>
                </Routes>
                </Suspense>
            </SearchContext.Provider>
    );
};

export default App;
