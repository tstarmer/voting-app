import React, { Component } from 'react';
import config from '../../config'
import dataConnect from '../dataConnect'
import Login from './Login'
// import bcrypt from 'bcrypt'

import bcrypt from 'bcryptjs'

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
	
	hashItem = (itemToHash, saltRounds, callback)=>{
		console.log("hashing: ", itemToHash , " with ", saltRounds, " salts")

		return bcrypt.hash(itemToHash, saltRounds, (err,hash)=>{
			if(err){
				console.log("Hash error: ", err)
				return err
			}else{
				// console.log(hash)
				callback(hash)
			}
		})
	}

	addUser = (user) =>{
		console.log("adding to userdb user:", user)
		dataConnect.addUser(user)
	}

	registerUser = (user) =>{
		console.log("registering user")
		const {username, password, email} = user
		// let hashedPassword=""
		// let hashedEmail=""
		let newUser ={
			user: username,
			authorized:true,
			pollsVoted:[],
			pollsCreated:[]
		}

		dataConnect.getUser(username,(response)=>{
			console.log("Data connect response", response)
			if(response === null){
				//user doesn't exist
				console.log("new user")
				this.hashItem(password, 10, (res)=>{
					// hashedPassword = res
					newUser.pass = res

					this.hashItem(email, 10,(res)=>{
						// hashedEmail = res
						newUser.email = res
						console.log("New User is", newUser)
						this.addUser(newUser)
					})
				})
			}else{
				console.log("user exists")

			}
		})					
	}
	
	authenticateUser = (user) =>{
		// check if user exists
		const {username, password, email} = user

		const existingUser = checkUser(username)
			console.log("existing", existingUser)
		const existingPass = existingUser.pass
			
		//check if the password matches
			//hash the pasword and see if hashes match
		if(!existingUser){
			console.log("No user")

			return "Something went wrong"
		}else{
			//compare passwords hashed

			bcrypt.compare(password, existingPass, function(err, res){
				if(err){
					console.log(err)
				}else{
					console.log("compare result", res)
				}
				
			})
			//
			//return existingPass === this.hashItem(password, 10) ? "Success" : "Fail"

		}

	
	}

	loginHandler=(user, role, callback)=>{
		let errors = {
			username:null,
			email:null,
			password:null
		}

		const {username} = user

			console.log(`Login initiate for user:`, user , `role:${role}` )

		role === "Register" ? this.registerUser(user) : this.authenticateUser(user)
				
		this.props.loginHandler(username)

		callback(errors);
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
						handleLogin={this.loginHandler}
					/>
				}

			</div>
		)
	}
}

export default Modals