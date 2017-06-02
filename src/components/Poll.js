import React, { Component } from 'react';
import Results from "./Results"

class Poll extends Component{
	constructor(props){
		super(props);
		this.state={
			custom:false,
			customValue:""
		}
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		console.log("target[0]", e.target[0])
		console.log("targer id", e.target.id)
		//need a conditional for custom option
		let id = this.props.poll.id,
			
			choice = e.target[0].value
	
		return this.props.onSubmit(id, choice) 
	}

	deletePoll=()=>{
		let pollId = this.props.poll.id
		let user = this.props.user
		return this.props.delete(pollId, user)
	}

	customChoiceHandler=(e)=>{
		console.log("Custom selected")
		// console.log("target", e.target[0])
		console.log("value", e.target.value)
		e.target.value === "Custom Choice" ? this.setState({custom:true}) : this.setState({custom:false, customValue:""})
		//this.setState({custom:true})
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	render(){
		console.log("props", this.props)
		return(
			<div className="poll-container">
				<h1 className="poll-title">{this.props.poll.title}</h1>
				<p className="poll-description">{this.props.poll.description}</p>
				<div className="options-box">
					<form onSubmit={(e)=>{this.handleSubmit(e)}}>
						<select name="choices" onChange={this.customChoiceHandler}>
							{this.props.poll.pollChoices.map((choice,i)=>{
								return <option 
									key={i} 
									className="voting-option" 
									id={i} 
									value={choice.option}>
									{choice.option}
									</option>
							})}
							{this.props.user && <option 
								
								className="voting-option"
								id="custom-option">Custom Choice</option>}						
						</select>
						{this.state.custom && 
							<div className="form-group">
								<label for="custom-option">Custom choice:</label>
								<input id="custom-option" type="text" value={this.state.customValue}/>
							</div>
							}
						<br/>
						<div className="button-container">
							<button type="submit" disabled={this.props.voted} value="Submit">Submit</button>
							<button onClick={this.props.onClose}>Close</button>
							{this.props.user === this.props.poll.creatorId && <button onClick={this.deletePoll}>Delete</button>}
							{this.props.voted && <p>You voted on this poll</p>}
						</div>
					</form>
				</div>		
				<Results poll={this.props.poll}/>
			</div>

		)
	}
}

export default Poll