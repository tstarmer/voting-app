import React, { Component } from "react"
import Poll from "./Poll"
import Polls from "./Polls"
import Nav from "./Nav"
import NewPoll from "./NewPoll"
import Modals from "./Modals"
import dataConnect from "../dataConnect.js"
/*
	Refactor Polls to be more self contained(ie poll, polls, newPoll as part of one component)
*/

const pushState = (object, url)=>{
	window.history.pushState(object,'',url);
}

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			authUser: false,
			currentPoll: this.props.currentPoll,
			activeModal: null,
			pollsVoted:[],
			polls:this.props.initialData
		}
	}

	componentDidMount =()=>{
		// console.log("Getting local storage info")
		if(typeof(Storage)!== undefined && localStorage.getItem("existingUser")){
			// console.log("Getting local storage info")
			let existingUser = JSON.parse(localStorage.getItem("existingUser"))

			this.setState({
				authUser: existingUser.authUser,
				pollsVoted: existingUser.pollsVoted
			})
		}
	}

	componentDidUpdate=(prevProps, prevState)=>{
		if(prevState.pollsVoted !== this.state.pollsVoted || prevState.authUser !== this.state.authUser){
			this.updateLocalStorage()
		}
	}

	updateLocalStorage = ()=>{
		// console.log("updating local storage")
		let user = {
			authUser: this.state.authUser,
			pollsVoted: this.state.pollsVoted
		}

		localStorage.setItem("existingUser", JSON.stringify(user))
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
		if(menuItem === "home"){
			menuItem = ""
		}
		
		pushState({currentPoll:menuItem || null}, `/${menuItem}`)
			
		this.setState({
			currentPoll:menuItem || null,
			activeModal:null
		})
	}

	userNavLoginHandler=(loginStatus)=>{
		loginStatus === "logout" ? 
			this.setState({
				authUser:false,
				activeModal:null
			}) : 
			this.setState({
				activeModal:loginStatus
			})
	}

	userLoginHandler=(user, votes)=>{
		this.setState({
			authUser:user,
			pollsVoted: votes,
			activeModal:null
		})
		this.closeModal();

	}

	voteSubmitHandler = (id, option) =>{
		const polls = [...this.state.polls];
		const pollsVoted = [...this.state.pollsVoted]
			// console.log("polls before", polls)
		

		let user = this.state.authUser
		let pollToChange = polls[id]	
		//need to have a conditional for custom not existing
		let choiceIndex = pollToChange.pollChoices.findIndex((element)=>{
			return element.option === option
		})
		
		pollToChange.pollChoices[choiceIndex].votes ++;

		let votes = pollToChange.pollChoices[choiceIndex].votes	

		pollsVoted.push(id)

		this.setState({
			polls:polls,
			pollsVoted:pollsVoted
		})

		dataConnect.vote(id, option, votes)
		dataConnect.updateUser(user, "pollsVoted", pollsVoted)
		// this.updateLocalStorage()
	}

	closeModal = ()=>{
		this.setState({
			activeModal: null
		})
	}

	currentPoll(){
		return this.state.polls[this.state.currentPoll]
	}

	addNewPoll=(poll)=>{
		const polls = [...this.state.polls]
		var newPollChoices = poll.choices.split(",")
		var newOptions = newPollChoices.map(function(item){
			return {
				"option":item,
				"votes": 0
			}
		})

		var newPoll = {
			id: polls.length,
			title: poll.title,
			creatorId: this.state.authUser,
			description: poll.description,
			pollChoices: newOptions 

		}
			
		polls.push(newPoll)
			
		this.setState({polls:polls})
		dataConnect.addPoll(newPoll)
		this.closeClickHandler();
	}

	deletePoll = (pollId, user)=>{
		let pollToRemove ={
			id: pollId,
			creatorId: user
		}
		const polls =[...this.state.polls]

		let filterPolls = polls.filter((poll)=>{
			return !(poll.id === pollToRemove.id && poll.creatorId === pollToRemove.creatorId)
		})

		this.setState({
			polls:filterPolls,
			pollsVoted:pollsVoted
		})

		dataConnect.deletePoll(pollToRemove);
		//update state
	}
	
	currentContent(){
		var currentUser = false;//switch hard coded to dynamic based on logged in
		if(this.state.currentPoll === "my-polls"){
			currentUser = this.state.authUser
		}

		if((this.state.currentPoll && this.state.currentPoll !=="my-polls") || this.state.currentPoll == 0){
			// console.log("showing single poll")
			if(this.state.currentPoll === "new"){

				return <NewPoll 
					onClose={this.closeClickHandler} 
					onSubmit={this.addNewPoll}
					/>
			}
			return <Poll 
						poll={this.state.polls[this.state.currentPoll]} 
						onClose={this.closeClickHandler} 
						onSubmit={this.voteSubmitHandler}
						voted={this.state.pollsVoted.includes(this.state.currentPoll)}
						user={this.state.authUser}
						delete={this.deletePoll}

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
				{this.state.activeModal && 
					<Modals 
						activeModal={this.state.activeModal} 
						closeModal={this.closeModal}
						loginHandler={this.userLoginHandler}
					/>
				}
				
				<Nav 
					user={this.state.authUser} 
					clickHandler={this.navHandler} 
					loginHandler={this.userNavLoginHandler}
				/>
				
				{this.currentContent()}
 				
			</div>
		);
	}
}

export default App;