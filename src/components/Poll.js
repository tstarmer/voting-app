import React, { Component } from 'react';
import Results from "./Results"

class Poll extends Component{
	constructor(props){
		super(props);
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		let id = this.props.poll.id,
			choice = e.target[0].value
	
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
								return <option 
									key={i} 
									className="voting-option" 
									id={i} 
									value={choice.option}>
									{choice.option}
									</option>
							
							})}
							
						</select>
						<br/>
						<div className="button-container">
							<button type="submit" disabled={this.props.voted} value="Submit">Submit</button>
							<button onClick={this.props.onClose}>Close</button>
							{this.props.voted && <p>You have already voted on this poll</p>}
						</div>
					</form>
				</div>
				
				<Results poll={this.props.poll}/>
			</div>

		)
	}
}

export default Poll