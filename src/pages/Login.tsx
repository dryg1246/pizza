import AuthenticationService from "../services/authentication.service";
import React, {useState} from "react";


const Login   = () => {
	const INITIAL_REGISTER_OBJ = {
		email: "",
		password: "",
	}

	const [formData, setFormData] = useState(INITIAL_REGISTER_OBJ)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {value, name} = e.target;
		setFormData({...formData, [name]: value});
	}

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.email === "") {
			console.log("email is required")
		} else if (formData.password === "") {
			console.log("password is required")
		} else {}
		try {
			const response = await AuthenticationService.postLogin(formData);
			console.log("Ответ от сервера:", response.data);

			localStorage.setItem("token", response.data.token);
		} catch (error: any) {
			console.error("Ошибка авторизации:", error);
			if (error.response) {
				console.log("Ошибки валидации:", error.response.data.errors);
			}
		}
	}

    return (
		<form className="login" onSubmit={handleLogin}>
			<div className="login-container">
				<div className="login-container__content">
				<div className="login-container__content-input">
					<h1 className="">Login</h1>
					<input className="input" type="email" onChange={handleChange} name="email" value={formData.email} placeholder="Введите email" required />
					<input className="input" type="password" onChange={handleChange} name="password" value={formData.password} placeholder="Введите пароль" required />
					<div className="login-container__content-button">
						<button type="submit" className="button pay-btn">
							Button
						</button>
					</div>
				</div>
				</div>
			</div>
		</form>
    )
}

export default Login