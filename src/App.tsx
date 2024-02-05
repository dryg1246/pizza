import './scss/app.scss';
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Cart from "./pages/Cart";
import React, {useState} from "react";

export const SearchContext = React.createContext({searchValue: '', setSearchValue: (value: string) => {}});

const App = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <Header />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>
                </div>
            </div>
            </SearchContext.Provider>
        </div>
    );
};

export default App;
