import React, { Component } from "react";
import Poll from "./Poll"

class Polls extends Component{
	constructor(props){
		super(props);
	}

	handleClick=(e)=>{
		
		this.props.onClick(parseInt(e.target.id))
	}


	render(){
		// console.log("polls", this.props)
		return(
			<div className="polls-container">
				<h2>Polls</h2>
				<p>Select one of the polls below to vote or sign in to create a new poll.</p>
				<ul className="polls-list">
				{this.props.polls.map((poll,i)=>{
					// console.log(this.props)
					return <li className="polls-list-item" key={i} id={poll.id} onClick={this.handleClick} >{poll.title}</li>
				})}
				</ul>
			</div>
			)
	}
}

export default Polls