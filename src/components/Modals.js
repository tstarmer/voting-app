import React, { Component } from "react";
import config from "../../config"
import dataConnect from "../dataConnect"

import Login from "./Login"

class Modals extends Component{
	constructor(props){
		super(props);
		this.state={
			currentModal:this.props.activeModal
		}
	}

	parseClick=(e)=>{
		if(e.target.id === "overlay-background"){
			this.props.closeModal();
		}
	}

	checkUser = (username)=>{
		console.log("checking User")
		return dataConnect.getUser(username)
	}
	

	registerUser = (user) =>{
		//does the user already exist?

		//validate email
		if(this.validateEmail(user.email)){
			//hash the password
		}else{
			// prompt user to fix invalid

		}	
	}
	

	authenticateUser = (user) =>{
		// check if user exists
		const existingUser = checkUser(user.username)
		
		//check if the password matches
			//hash the pasword and see if hashes match
	
	}



	loginHandler=(user, role, callback)=>{
		let errors = {
			username:null,
			email:null,
			password:null
		}

		if(role === "Register"){

		}

	}
	

	authenticateUser = (user) =>{
		// check if user exists

		//check if the password matches
			//hash the pasword and see if hashes match
	
	}



	loginHandler=(user, role, callback)=>{
		let errors = {
			username:null,
			email:null,
			password:null
		}

		if(role === "Register"){

		}

		callback(errors);
		this.props.loginHandler(username)
	}

	render(){
		return(
			<div 
				className="modal-overlay" 
				id="overlay-background" 
				onClick={this.parseClick}
			>

				{(this.state.currentModal === "login") &&  
					<Login
						closeModal={this.props.closeModal} 
						handleLogin={this.props.loginHandler}
					/>
				}

			</div>
		)
	}
}

export default Modals