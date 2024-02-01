
import './scss/app.scss';
import {Header} from "./components/header/Header";
import {Categories} from "./components/main/Categories";
import {Sort} from "./components/main/Sort";
import {PizzaBlock} from "./components/main/pizza-block/PizzaBlock";
import {PizzaBlocks} from "./assets/types";
import React, {useEffect, useState} from "react";
import axios from "axios";


function App()  {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get("https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas");
                setItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };

        fetchPizzas();
    }, []);
  return (
      <div className="wrapper">
         <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <div className="content__items">
                {items.map((pizza: PizzaBlocks, i: number) => (
                    <PizzaBlock
                        key={i}
                        {...pizza}
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
