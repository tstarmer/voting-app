import React, { Component } from "react";
import Polls from "./Polls"


class App extends Component{
	constructor(){
		super();
		this.state={
			polls: []
		}
	}

	render(){

		return(
			<div className="App container">
				<nav>
					<ul>
						<li>Sign in</li>
					</ul>
				</nav>
				<Polls />
 				
			</div>

			);
	}
}


export default App;