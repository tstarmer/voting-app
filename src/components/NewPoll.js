import React, { Component } from 'react';

class NewPoll extends Component{
	constructor(props){
		super(props);
		this.state={
			title: "Poll Title",
			description: "Poll description",
			choices:"choices...."
		}
	}
// value={} onChange={}
	parseSubmit = (e) =>{
		e.preventDefault();
		console.log(e.target)
		this.props.onSubmit(e)

	}

	onChange = (e) =>{
		console.log(e.target.value)
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	render(){
		return(
			<div className="container">
				
				<form onSubmit={this.parseSubmit}>	
					<h4>Poll Title</h4>
					<input type="text" className="title" name="title" onChange={this.onChange} value={this.state.title}></input>
					<h6>Poll Description</h6>
					<input type="text" className="description-text" name="description"onChange={this.onChange} value={this.state.description}></input>
					<h6>Poll Choices</h6>
					<input type="text" className="choices-text" name="choices" onChange={this.onChange} value={this.state.choices}></input>
					<input type="submit" className="btn"></input>
					<button onClick={this.props.onClose}>Close</button>
				</form>
			</div>

			)
	}
}

export default NewPoll 