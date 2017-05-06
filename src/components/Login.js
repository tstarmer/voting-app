import React, { Component } from "react"

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			role: "login",
			user: "Username",
			password: "Password"
		}
	}

	parseSubmit = (e) =>{
		e.preventDefault();
		//validate entry
		let user ={
			user:e.target.user,
			//encrypt
			password:e.target.password
		}

		this.props.handleLogin({user})		


	}

	modalChange(e){
		this.setState({
			role:e.target.value
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

				<form onSubmit={this.parseSubmit}>
					<label>User</label><br/>

					<input 
						type="text" 
						name="user" 
						onChange={this.onChange}
						value={this.state.user}>
					</input>
					<br/>
					<label>Password</label><br/>
					<input 
						type="text" 
						name="password" 
						onChange={this.onChange}
						value={this.state.password}>
					</input>
					<br/>
					<input type="submit"></input>
					<button className="btn close" onClick={this.props.closeModal}>Cancel</button>
					
					{(this.state.role === "login") && <p> Forget your password? Reset Password Now</p>}
					{(this.state.role === "login") && <p> Not a member yet? Register below</p>}

					{(this.state.role !== "register")}<button className="btn register" onClick={this.changeModal} value="register">Register</button>

				</form>

			</div>
			)
	}

}


export default Login