import React, { Component } from "react";
import Poll from "./Poll"

class Polls extends Component{


	render(){
		return(
			<div className="polls-container">
				<h2>Polls</h2>
				<p>Select one of the polls below to vote or sign in to create a new poll.</p>

				<Poll />
			</div>
			)
	}
}

export default Polls