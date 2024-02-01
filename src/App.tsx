
import './scss/app.scss';
import {Header} from "./components/header/Header";
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Cart from "./pages/Cart";


 const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/cart" element={<Cart />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

 export default App;
