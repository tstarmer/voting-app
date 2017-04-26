import React, {Component} from "react";


const ListItem = (props) =>{
	return <li className="votes">{props.option} : {props.votes}</li>
}



class Results extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="results-container">
				<h5>Current Votes</h5>
				{/*console.log(Object.keys(this.props.poll))*/}
				{this.props.poll.pollChoices.map((choice,i)=>{
					return <ListItem key={i} option={choice.option} votes={choice.votes}/>
				
				})}

			</div>
			)
	}
}

export default Results