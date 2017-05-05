import React, { Component } from "react";
import Login from "./Login"

class Modals extends Component{

	render(){
		console.log("Modal props", this.props)
		return(
			<div className="modal-overlay">

				{(this.props.activeModal === "login") && <Login/>}

			</div>

			

			)
	}
}

export default Modals