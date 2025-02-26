import axios from "axios";

axios.defaults.baseURL = 'https://localhost:7004';
class PizzaService {
	getOnlyPizzas(categoryId : number, sortBy: {sortProperty: string}, searchValue: string, pageCount: number, perPageSize: number) {
		return axios.get('https://localhost:7004/api/PizzaHut/GetOnlyPizzas/'
			,
			{
				params: {
					sortProperty: categoryId,
					sortBy: sortBy.sortProperty,
					//order: "asc",
					search: searchValue,
					pageCount,
					limit: perPageSize,
				},
			}
		);
	}
	getTotalCountPizza() {
		return axios.get("https://localhost:7004/api/PizzaHut/GetTotalPizzas")
	}
	getPizzaById(id: number) {
		return axios.get(`https://localhost:7004/api/PizzaHut/${id}`);
	}
	getImages() {
		return axios.get(`https://localhost:7004/api/PizzaHut/GetImages`);
	}
	getCart() {
		return axios.get(`https://localhost:7004/api/PizzaHut/GetCart`);
	}

	addToCart(cartId: number, count: number = 1) {
		return axios.get(`https://localhost:7004/api/PizzaHut/AddToCart/${cartId}`);
	}

	removeFromCart(cartId: number, ) {
		return axios.get(`https://localhost:7004/api/PizzaHut/RemoveFromCart/${cartId}`);
	}
}

export default new PizzaService();