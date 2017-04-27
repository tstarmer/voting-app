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
		console.log(id)
		// console.log(option)
		var poll =this.state.polls[id-1]
		// console.log(poll)

		// this.setState({polls[id-1]})
	}


	currentPoll(){
		return this.state.polls[this.state.currentPoll]
	}

	currentContent(){
		if(this.state.currentPoll){
			return <Poll poll={this.state.polls[this.state.currentPoll]} onClose={this.closeClickHandler} onSubmit={this.submitHandler}/>
		}
		return <Polls polls={this.state.polls} onClick={this.pollClickHandler}/>
	}

	render(){

		return(
			<div className="App container">
				<Nav />
				{this.currentContent()}
 				
			</div>

		);
	}
}


export default App;