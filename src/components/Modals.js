import React, { Component } from "react";
import Login from "./Login"

class Modals extends Component{
	constructor(props){
		super(props);
		this.state={
			currentModal:this.props.activeModal
		}
	}


	changeModal=()=>{

	}

	render(){
		console.log("Modal props", this.props)
		return(
			<div className="modal-overlay" onClick={this.props.closeModal}>

				{(this.state.currentModal === "login") && <Login closeModal={this.props.closeModal} handleLogin={this.props.login}/>}

			</div>

			

			)
	}
}

export default Modals