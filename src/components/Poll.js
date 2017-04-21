import React, { Component } from 'react';

class Poll extends Component{
	render(){
		return(
			<div className="poll-container">
				<h1 className="poll-title">Poll Title</h1>
				<p className="poll-description"></p>
				<ul>
					<li className="voting-option">Option 1</li>
					<li className="voting-option">Option 2</li>
				</ul>
				<button>Submit</button>

			</div>

			)
	}
}

export default Poll