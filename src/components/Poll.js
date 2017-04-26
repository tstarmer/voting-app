import React, { Component } from 'react';
import Results from "./Results"


class Poll extends Component{
	constructor(props){
		super(props);
	}

	render(){
		// console.log("poll", this.props)
		return(
			<div className="poll-container">
				<h1 className="poll-title">{this.props.poll.title}</h1>
				<p className="poll-description">{this.props.poll.description}</p>
				<div className="options-box">
					<select>
						{this.props.poll.pollChoices.map((choice,i)=>{
							return <option key={i} className="voting-option" value={choice.option}>{choice.option}</option>
						
						})}
						
					</select>
					<br/>
					<div className="button-container">
						<button>Submit</button>
						<button onClick={this.props.onClose}>Close</button>
					</div>
				</div>
				
				<Results poll={this.props.poll}/>
			</div>

			)
	}
}




export default Poll