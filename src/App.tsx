import './scss/app.scss';
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Cart from "./pages/Cart";
import {useState} from "react";


const App = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    return (
        <div className="wrapper">
            <Header searchValue={searchValue} onChangeSearch={(value) => setSearchValue(value)}/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
