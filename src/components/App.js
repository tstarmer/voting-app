import React, { Component } from "react"
import Poll from "./Poll"
import Polls from "./Polls"
import Nav from "./Nav"
import NewPoll from "./NewPoll"

const pushState = (object, url)=>{
	// console.log("pushing history")
	window.history.pushState(object,'',url);
}


class App extends Component{
	constructor(props){
		super(props);
		this.state={
			authUser: true,
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

	navHandler=(menuItem)=>{
			// console.log("setting nav")
		//temporary value for testing purposes
		if(menuItem = "my-polls"){
			var currentuser = "mortise"
		}
		pushState({currentPoll:menuItem}, `/${menuItem}`)
		this.setState({authUser: currentuser,
			currentPoll:menuItem})
	}


	submitHandler=(id, option)=>{
			
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

	addNewPoll=(poll)=>{
		
		const polls = [...this.state.polls]
			// console.log("Polls copy", polls)
		var newPollChoices = poll.choices.split(",")
			// console.log("choices", newPollChoices)
		
		var newOptions = newPollChoices.map(function(item){
			return {
				"option":item,
				"votes": 0
			}
		})

		var newPoll = {
			id: polls.length,
			title: poll.title,
			creatorId: "mortise",
			description: poll.description,
			pollChoices: newOptions 

		}
			// console.log("new Poll", newPoll)
		polls.push(newPoll)
			// console.log("new polls", polls)
		this.setState({polls:polls})
		//push new poll into data
		this.closeClickHandler();
	}

	
	currentContent(){
		var currentUser = false;
		if(this.state.currentPoll === "my-polls"){
			currentUser = this.state.authUser
		}

		if((this.state.currentPoll && this.state.currentPoll !=="my-polls") || this.state.currentPoll == 0){
			// console.log("showing single poll")
			if(this.state.currentPoll === "new"){
				return <NewPoll onClose={this.closeClickHandler} onSubmit={this.addNewPoll}/>
			}
			return <Poll poll={this.state.polls[this.state.currentPoll]} onClose={this.closeClickHandler} onSubmit={this.submitHandler}/>
		}
		return <Polls polls={this.state.polls} clickHandler={this.pollClickHandler} user={currentUser}/>
	}

	render(){

		return(
			<div className="App container">
				<Nav user={this.state.authUser} clickHandler={this.navHandler}/>
				{this.currentContent()}
 				
			</div>

		);
	}
}


export default App;