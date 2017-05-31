import React, { Component } from "react"
const initialState = {
			role: "Login",
			username: "Username",
			password: "Password",
			confirmPassword: "Confirm Password",
			email: "Email",
			validCount: 0,
			toggle: true
}

class Login extends Component{
	constructor(props){
		super(props);
		this.state={...initialState}
	}
	//need to scrub/reset the state after log in 

	validStyle = {
		color:"green"
	}

	invalidStyle ={
		color:"red"
	}

	componentDidMount(){
		this.validTimer = setInterval(()=>this.validEntries(), 1000)
	}

	componentWillUnmount(){
		clearInterval(this.validTimer)
	}

	validEntries = () =>{
		var count = 0

		if(this.state !== initialState){
			//valid username
			this.state.username.length >= 4 && count++
			//valid Password
			this.validatePassword(this.state.password) && count++
			//valid Confirm
			this.state.password === this.state.confirmPassword && count++
			//check email
			this.validateEmail(this.state.email) && count++
		}
		this.setState({
			validCount: count
		})
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
		return (password.length >= 8)
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
				entry.length < 8 ? style.color = invalid.color : style.color = valid.color
				break;
			case "confirmPassword":
				//validate when password is changed after?
				entry !== this.state.password ? style.color = invalid.color : style.color = valid.color
				break;
			case "email":
				!this.validateEmail(entry) ? style.color = invalid.color : style.color = valid.color
				break;
		}
	}

	clearInitial = (e)=>{
		if(e.target.value === initialState[e.target.name]){
			this.setState({
				[e.target.name]:""
			})	
		}
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

	parseSubmit = (e) =>{
		e.preventDefault();
		//console.log("Submitting")
		let role = this.state.role
		
		let user ={
			username:e.target.username.value,
			password:e.target.password.value
		}

		if(role === "Register"){
			user.email = e.target.email.value
		}

		//scrub entries from state
		console.log("user submitted", user)

		this.props.handleLogin(user, role, (errors)=>{
			console.log(errors)
		})
		this.setState(initialState)	
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
							onFocus={this.clearInitial}
							onInput={this.validateEntry}
							value={this.state.username}>
						</input>
						<br/>
										
						<input 
							style={this.inputStyle}
							type="text" 
							name="password" 
							onChange={this.onChange}
							onFocus={this.clearInitial}
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
								onFocus={this.clearInitial}
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
								onFocus={this.clearInitial}
								onInput={this.validateEntry}
								value={this.state.email}>
							</input>
						}
						
						<div className="row">
							<button 
								type="submit" 
								className="btn submit" 
								value={this.state.role}
								disabled={!(
									this.state.toggle ?
									this.state.validCount === 2
									 : this.state.validCount === 4)
									}
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