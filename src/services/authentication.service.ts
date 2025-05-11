import axios from "axios";

axios.defaults.baseURL = 'https://localhost:7004';
class AuthenticationService {
	postLogin = (data: any) => {
		return axios.post("https://localhost:7004/api/User/Login", data)
	}
	postRegister = (data: any) => {
		return axios.post("https://localhost:7004/api/User/Register", data)
	}
}

export default new AuthenticationService();