import React, { Component } from "react"
import Poll from "./Poll"
import Polls from "./Polls"
import Nav from "./Nav"

const pushState = (object, url)=>{
	console.log("pushing history")
	window.history.pushState(object,'',url);
}


class App extends Component{
	constructor(props){
		super(props);
		this.state={
			authUser: false,
			currentPoll: null,
			polls:this.props.initialData.polls
		}
	}

	pollClickHandler =(id)=>{
		pushState({currentPoll:id}, `/polls/${id}`)
		this.setState({currentPoll:id})
	}

	closeClickHandler = ()=>{
		pushState({currentPoll: null},"/")
		this.setState({currentPoll:null})

	}

	submitHandler=(id, option)=>{
			// console.log("id", id)
			// console.log("option", option)
		const polls = [...this.state.polls];
			// console.log(polls)
		
		var pollToChange = polls[id]
			// console.log("poll", pollToChange)
		var choiceIndex = pollToChange.pollChoices.findIndex((element)=>{
			return element.option === option
		})
			// console.log("choicei", choiceIndex)
			// console.log("v before", (pollToChange.pollChoices[choiceIndex].votes))
		pollToChange.pollChoices[choiceIndex].votes ++;
			

		this.setState({polls:polls})
	}


	currentPoll(){
		return this.state.polls[this.state.currentPoll]
	}

	currentContent(){
		if(this.state.currentPoll || this.state.currentPoll == 0){
			console.log("showing single poll")
			return <Poll poll={this.state.polls[this.state.currentPoll]} onClose={this.closeClickHandler} onSubmit={this.submitHandler}/>
		}
		return <Polls polls={this.state.polls} onClick={this.pollClickHandler}/>
	}

	render(){

		return(
			<div className="App container">
				<Nav user={this.state.authUser}/>
				{this.currentContent()}
 				
			</div>

		);
	}
}


export default App;