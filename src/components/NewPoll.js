import React, { Component } from 'react';

class NewPoll extends Component{
	constructor(props){
		super(props)
	}
// value={} onChange={}
	parseSubmit = (e) =>{
		e.preventDefault();
		console.log(e.target)
		this.props.onSubmit(e)

	}


	render(){
		return(
			<div className="container">
				
				<form onSubmit={this.parseSubmit}>	
					<h4>Poll Title</h4>
					<input type="text" className="title"></input>
					<h6>Poll Description</h6>
					<input type="text" className="title"></input>
					<h6>Poll Choices</h6>
					<input type="text" className="title"></input>
					<input type="submit" className="btn"></input>
					<button onClick={this.props.onClose}>Close</button>
				</form>
			</div>

			)
	}
}

export default NewPoll 