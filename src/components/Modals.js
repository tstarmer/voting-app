import React, { Component } from 'react';
import config from '../../config'
import dataConnect from '../dataConnect'
import Login from './Login'
import MessageBox from './MessageBox'
import bcrypt from 'bcryptjs'

/*Default Messages*/
const wrongMessage = "Something went wrong. Please try again."
const noMatch = "Username and/or password do not match an existing user and password combination"
const userExists = "Username or email already in use please choose another"

class Modals extends Component{
	constructor(props){
		super(props);
		this.state={
			currentModal:this.props.activeModal,
			message: "Hello!",
			errors:{
				username:null,
				email:null,
				password:null
			}
		}
	}

	parseClick=(e)=>{
		if(e.target.id === "overlay-background"){
			this.props.closeModal();
		}
	}
		
	hashItem = (itemToHash, saltRounds, callback)=>{
		// console.log("hashing: ", itemToHash , " with ", saltRounds, " salts")
		return bcrypt.hash(itemToHash, saltRounds, (err,hash)=>{
			if(err){
				console.log("Hash error: ", err)
				return err
			}else{
				callback(hash)
			}
		})
	}

	registerUser = (user) =>{
		console.log("registering user")
		const {username, password, email} = user
		let newUser ={
			user: username,
			pass:"",
			email:"",
			authorized:true,
			pollsVoted:[],
			pollsCreated:[]
		}

		dataConnect.getUser(username,(response)=>{
			// console.log("Data connect response", response)
			if(response === null){
				//user doesn't exist
				this.hashItem(password, 10, (res)=>{
					newUser.pass = res

					this.hashItem(email, 10,(res)=>{
						newUser.email = res
						dataConnect.addUser(newUser)//add to db
					})
				})
			}else{
				// console.log("user exists")
				this.modalSwitch("messagebox", userExists)
			}
		})					
	}
	
	authenticateUser = (user) =>{
		const {username, password, email} = user
		let existingUser, existingPass;

		dataConnect.getUser(username, (response)=>{
			
			if(response === null){
				console.log("No user")
				this.modalSwitch("message", noMatch)
				return false
			}else{
				existingUser = response.user
				existingPass = response.pass
				//compare passwords hashed
				bcrypt.compare(password, existingPass, (err, res)=>{
					if(err){
						console.log(err)
						this.modalSwitch("messagebox", wrongMessage)
						return false
					}else{
						console.log("compare result", res)
						if(!res){
							this.modalSwitch("messagebox", noMatch)
						}else{
							this.props.loginHandler(username)
						}
						return res
					}	
				})
			}
		})
	}

	loginHandler=(user, role)=>{
		if(role === "Register"){
			this.registerUser(user)
		}else {
			console.log("Authenticate")
			this.authenticateUser(user)
		}
		this.props.closeModal()
	}
	
	modalSwitch =(newModal, message)=>{
		this.setState({
			currentModal: newModal,
			message: message
		})
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
						errors={this.state.errors}
					/>
				}
				{(this.state.currentModal === "messagebox") &&
					<MessageBox 
						closeModal={this.props.closeModal}
						message={this.state.message}
					/>
				}
			</div>
		)
	}
}
export default Modals