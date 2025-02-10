import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {PizzaItem} from "../assets/types";

export const PizzaInformation: React.FC = () => {
	const [pizza, setPizza] = React.useState<PizzaItem>();


	const {id} = useParams()
	const navigate = useNavigate()
	useEffect(  () => {
		async function fetchPizzas(){
			try {
				const {data} = await axios.get('https://65bb73b852189914b5bc2ea1.mockapi.io/pizzas/pizas/' + id)
				setPizza(data)
			}
			catch (e){
				alert('Произошла ошибка при получении данных пиццы')
				navigate('/')
			}
		}
		fetchPizzas()
	}, []);

	if(!pizza) {
		return <>Загрузка...</>
	}
	return (
		<>
			<div className="wrapper">
				<div className="container">
					<div className="pizza">
						{/* <img src={pizza.imageUrl} alt={pizza.title} /> */}
						<h1>{pizza.name}</h1>
						<h4>{pizza.price} </h4>
					</div>
				</div>
			</div>
		</>
	);
};
