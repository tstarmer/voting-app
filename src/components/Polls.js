import React, { Component } from "react";
import Poll from "./Poll"

const ListItem =(props)=>{
	return <li className="polls-list-item" id={props.id} onClick={props.handleClick} >{props.title}</li>
}

class Polls extends Component{
	constructor(props){
		super(props);
	};

	handleClick=(e)=>{
		
		this.props.clickHandler(parseInt(e.target.id))
	}

	render(){
		let polls = this.props.polls
		let user = this.props.user

		if(this.props.user){
			// console.log("filter to show user polls")
			polls = polls.filter(function(poll){
				return poll.creatorId === user
			})
		} 

		return(
			<div className="polls-container">
				<h2>Polls</h2>
				<p>Select one of the polls below to vote or sign in to create a new poll.</p>
				<ul className="polls-list">
				
				{polls.map((poll,i)=>{
					// console.log(this.props)
					return <ListItem key={i} id={poll.id} handleClick={this.handleClick} title={poll.title}/>
				})}
				</ul>
			</div>
		)
	}
}

export default Polls