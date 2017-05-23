import React, { Component } from "react"

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			role: "Login",
			user: "Username",
			email: "Email",
			password: "Password",
			toggle: true
		}
	}

	parseSubmit = (e) =>{
		e.preventDefault();
		//validate entry
			console.log(e.target)
		let user ={
			user:e.target.user,
			//encrypt
			password:e.target.password
		}
		// this.props.handleLogin({user})		
	}

	modalChange=(e)=>{
		//console.log("e", e.target, "text", e.target.text, "value", e.target.value,"name", e.target.name)
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
							onClick={this.modalChange} 
							id="Login">
							Login
						</li>
						<li 
							className={!this.state.toggle ? "active link" : "link"}  
							onClick={this.modalChange} 
							id="Register">
							Register
						</li>
					</ul>
				</nav>
				{(this.state.role !== "reset") &&
					<form onSubmit={this.parseSubmit}>
						<input 
							type="text" 
							name="user" 
							onChange={this.onChange}
							value={this.state.user}>
						</input>
						<br/>
						{!this.state.toggle && 
							<input 
								type="text" 
								name="email" 
								onChange={this.onChange}
								value={this.state.email}>
							</input>
						}						
						<input 
							type="text" 
							name="password" 
							onChange={this.onChange}
							value={this.state.password}>
						</input>
						<br/>
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