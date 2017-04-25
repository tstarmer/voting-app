import React, { Component } from 'react';

class Poll extends Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log("poll", this.props)
		return(
			<div className="poll-container">
				<h1 className="poll-title">{this.props.poll.title}</h1>
				<p className="poll-description">{this.props.poll.description}</p>
				<select>
					{this.props.poll.pollChoices.map((choice,i)=>{
						return <option key={i} className="voting-option" value={choice}>{choice}</option>
					
					})}
					
					
				</select>
				<button>Submit</button>
				<button onClick={this.props.onClose}>Close</button>

			</div>

			)
	}
}

export default Poll