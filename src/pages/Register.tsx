import AuthenticationService from "../services/authentication.service";
import React, {useState} from "react";


const Register   = () => {
	const INITIAL_REGISTER_OBJ = {
		name: "",
		email: "",
		password: "",
	}


	const [formData, setFormData] = useState(INITIAL_REGISTER_OBJ)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const {name, value} = e.target;
		  setFormData({...formData, [name]: value});
	}
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await AuthenticationService.postRegister(formData);
			console.log("Ответ от сервера:", response.data);
			localStorage.setItem("token", response.data.token);
		} catch (error: any) {
			console.error("Ошибка регистрации:", error);
			if (error.response) {
				console.log("Ошибки валидации:", error.response.data.errors);
			}
		}
	};

	return (
		<form className="login" onSubmit={handleRegister}>
			<div className="login-container">
				<div className="login-container__content">
					<div className="login-container__content-input">
						<h1 className="">Register</h1>
						<input
							className="input"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Введите name"
							required
						/>
						<input
							className="input"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Введите email"
							required
						/>
						<input
							className="input"
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Введите пароль"
							required
						/>
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

export default Register