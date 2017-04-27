import React, { Component } from 'react';
import Results from "./Results"

class Poll extends Component{
	constructor(props){
		super(props);
	}

	handleSubmit = (e) =>{
		e.preventDefault();
			// console.log("this id", this.props.poll.id)
		// console.log("targ=", e.target[0],"value=", e.target[0].value)
		var id = this.props.poll.id
			// console.log("poll id", id)
		var choice = e.target[0].value
	
		return this.props.onSubmit(id, choice) 
	}

	render(){
		// console.log("poll", this.props)
		return(
			<div className="poll-container">
				<h1 className="poll-title">{this.props.poll.title}</h1>
				<p className="poll-description">{this.props.poll.description}</p>
				<div className="options-box">
					<form onSubmit={(e)=>{this.handleSubmit(e)}}>
						<select name="choices">
							{this.props.poll.pollChoices.map((choice,i)=>{
								return <option key={i} className="voting-option" id={i} value={choice.option}>{choice.option}</option>
							
							})}
							
						</select>
						<br/>
						<div className="button-container">
							<input type="submit"  value="Submit"></input>
							<button onClick={this.props.onClose}>Close</button>
						</div>
					</form>
				</div>
				
				<Results poll={this.props.poll}/>
			</div>

			)
	}
}


export default Poll