import axios from "axios";

axios.defaults.baseURL = 'https://localhost:7004';
class PizzaService {
	getOnlyPizzas() {
		return axios.get("https://localhost:7004/api/PizzaHut/GetOnlyPizzas");
	}
	getPizzaById(id: number) {
		return axios.get(`https://localhost:7004/api/PizzaHut/${id}`);
	}
	getImages() {
		return axios.get(`https://localhost:7004/api/PizzaHut/GetImages`);
	}
}

export default new PizzaService();