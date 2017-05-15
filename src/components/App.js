import React, { Component } from "react"
import Poll from "./Poll"
import Polls from "./Polls"
import Nav from "./Nav"
import NewPoll from "./NewPoll"
import Modals from "./Modals"

/*
	Refactor Polls to be more self contained(ie poll, polls, newPoll as part of one component)
*/

const pushState = (object, url)=>{
	console.log("pushing history", object)
	window.history.pushState(object,'',url);
}

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			authUser: true,
			currentPoll: this.props.currentPoll,
			activeModal: null,
			polls:this.props.initialData
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
		
		// console.log("setting nav to ", menuItem)
		var currentuser = this.state.authUser
		//temporary value for testing purposes
		if(menuItem === "my-polls"){
			currentuser = "mortise"
		}
		if(menuItem === "home"){
			menuItem = ""
		}
		pushState({currentPoll:menuItem || null}, `/${menuItem}`)
			
		this.setState({
			authUser: currentuser,
			currentPoll:menuItem || null,
			activeModal:null
		})
	
	}

	userLoginHandler=(loginStatus)=>{
		
		if(loginStatus === "logout"){
			this.setState({
				authUser:false,
				activeModal:null
			})			
		}else{
			this.setState({
				//change after auth and db integration
				authUser:"pheobe",
				activeModal:loginStatus
			})
		}
		//add login form
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

	closeModal = ()=>{
		console.log("close the modal")
		this.setState({
			activeModal: null
		})
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
		var currentUser = false;//switch hard coded to dynamic based on logged in
		if(this.state.currentPoll === "my-polls"){
			// currentUser = this.state.authUser
			currentUser ="mortise"
		}

		if((this.state.currentPoll && this.state.currentPoll !=="my-polls") || this.state.currentPoll == 0){
			// console.log("showing single poll")
			if(this.state.currentPoll === "new"){

				return <NewPoll 
					onClose={this.closeClickHandler} 
					onSubmit={this.addNewPoll}
					/>
			}
				console.log("single poll", this.state.polls[this.state.currentPoll])
			return <Poll 
						poll={this.state.polls[this.state.currentPoll]} 
						onClose={this.closeClickHandler} 
						onSubmit={this.submitHandler}
					/>
		}
		return <Polls 
					polls={this.state.polls} 
					clickHandler={this.pollClickHandler} 
					user={currentUser}
				/>
	}

	render(){

		return(
			<div className="App container">
				{this.state.activeModal && <Modals activeModal={this.state.activeModal} closeModal={this.closeModal}/>}
				
				<Nav 
					user={this.state.authUser} 
					clickHandler={this.navHandler} 
					loginHandler={this.userLoginHandler}
				/>
				
				{this.currentContent()}
 				
			</div>

		);
	}
}


export default App;