import React, { Component } from "react"
const initialState = {
			role: "Login",
			username: "Username",
			password: "Password",
			confirmPassword: "Confirm Password",
			email: "Email",
			toggle: true
}


class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			role: "Login",
			username: "Username",
			password: "Password",
			confirmPassword: "Confirm Password",
			email: "Email",
			toggle: true
		}
	}

	//need to scrub/reset the state after log in 

	validStyle = {
		color:"green"
	}

	invalidStyle ={
		color:"red"
	}

	validateEmail = (email)=>{
		const regex = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/i
		return regex.test(email)
	}

	validatePassword = (password)=>{
		//color of password is red until valid password is entered
		//valid password is ?
			//no spaces
			//contains at least?

		if(password.length < 8){
			console.log("Whoa Buddy, you sure you want to do that?")
		}
	}

	validateEntry = (e) =>{
		const entry = e.target.value
		let style = e.target.style
		const valid = this.validStyle
		const invalid = this.invalidStyle

		switch(e.target.name){
			case "username":
				entry.length < 4 ? style.color = invalid.color  : style.color = valid.color
				break;
			case "password":
				entry.length < 8 ? style.color = invalid.color: style.color = valid.color
				break;
			case "confirmPassword":
				entry !== this.state.password ? style.color = invalid.color: style.color = valid.color
				break;
			case "email":
				!this.validateEmail(entry) ? style.color = invalidStyle.color : style.color = validStyle.color
				break;
		}
	}

	checkExisting = (username)=>{

	}

	parseSubmit = (e) =>{
		e.preventDefault();
		
		let role = this.state.role
		let user ={
			username:e.target.username.value,
			email:e.target.email.value,
			password:e.target.password.value
		}
		
		this.state.role === "Register" ? registerUser(user) : authenticateUser(user)
		//scrub entries from state
		this.props.handleLogin(user, role, (errors)=>{
			console.log(errors)
		})
		this.setState(initialState)	
	}

	menuChange=(e)=>{
		this.setState({
			role:e.target.id,
			toggle:!this.state.toggle
		})
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	render(){

		return(
			<div className="login-container">
				{/* add register and login side by side */}
				<nav className="form-nav">
					<a className="close" onClick={this.props.closeModal} value="close">X</a>
					<ul>
						<li 
							className={this.state.toggle ? "active link" : "link"} 
							onClick={this.menuChange} 
							id="Login">
							Login
						</li>
						<li 
							className={!this.state.toggle ? "active link" : "link"}  
							onClick={this.menuChange} 
							id="Register">
							Register
						</li>
					</ul>
				</nav>
				{(this.state.role !== "reset") &&
					<form onSubmit={this.parseSubmit}>
						<input 
							style={this.inputStyle}
							type="text" 
							name="username" 
							onChange={this.onChange}
							onInput={this.validateEntry}
							value={this.state.username}>
						</input>
						<br/>
										
						<input 
							style={this.inputStyle}
							type="text" 
							name="password" 
							onChange={this.onChange}
							onInput={this.validateEntry}
							value={this.state.password}>
						</input>
						<br/>
						{!this.state.toggle && 
							<input 
								style={this.inputStyle}
								type="text" 
								name="confirmPassword" 
								onChange={this.onChange}
								onInput={this.validateEntry}
								value={this.state.confirmPassword}>
							</input>
						}
						<br/>
						{!this.state.toggle && 
							<input 
								style={this.inputStyle}
								type="text" 
								name="email" 
								onChange={this.onChange}
								onInput={this.validateEntry}
								value={this.state.email}>
							</input>
						}
						
						<div className="row">
							<button 
								type="submit" 
								className="btn submit" 
								value={this.state.role}
							>
							Submit
							</button>
							<button 
								className="btn close" 
								onClick={this.props.closeModal}>
								Cancel
							</button>
						</div>	

						{this.state.toggle && 
							<p> Forget your password? Reset Password Now</p>
						}
						
						{this.state.toggle && <a 
							className="link" 
							onClick={this.changeModal}
							value="Reset">Reset</a>
						}
					</form>
				}

				{(this.state.role === "reset") && <form>
					<input 
						type="text" 
						name="email" 
						onChange={this.onChange}
						value={this.state.email}>
					</input>

					<input type="submit">Reset Password</input>
				</form>}
			</div>
		)
	}
}

export default Login