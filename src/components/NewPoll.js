import React, { Component } from 'react';

class NewPoll extends Component{

	render(){
		return(
			<div className="container">
				
				<form>	
					<h4>Poll Title</h4>
					<input type="text" className="title" value={} onChange={}></input>
					<h6>Poll Description</h6>
					<input type="text" className="title" value={} onChange={}></input>
					<h6>Poll Choices</h6>
					<input type="text" className="title" value={} onChange={}></input>
					<input type="submit" className="btn" value={}></input>
					<button onClick={}>Close</button>
				</form>
			</div>/*end container*/

			)
	}
}

export default NewPoll 