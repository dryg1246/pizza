
import './scss/app.scss';
import {Header} from "./components/header/Header";
import {Categories} from "./components/main/categories/Categories";
import {Sort} from "./components/main/sorting/Sort";
import {PizzaBlock} from "./components/main/pizza-block/PizzaBlock";
import {Pizzas} from "./assets/pizzas";
import {PizzaBlocks} from "./assets/types";

function App()  {
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
                {Pizzas.map((pizza: PizzaBlocks, i: number) => (
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
