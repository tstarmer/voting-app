import React, { Component } from "react"

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			user: "Username",
			password: "Password"
		}
	}

	parseSubmit = (e) =>{
		e.preventDefault();

	}

	onChange = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	render(){
		return(
			<div className="container">
				<form onSubmit={this.parseSubmit}>
					<label>User</label>
					<input 
						type="text" 
						name="user" 
						onChange={this.onChange}
						value={this.state.user}>
					</input>
					<label>Password</label>
					<input 
						type="text" 
						name="password" 
						onChange={this.onChange}
						value={this.state.password}>
					</input>
				</form>

			</div>
			)
	}

}


export default Login