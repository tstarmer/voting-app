import React, {Component} from "react";
import { Chart } from "react-google-charts"

const ListItem = (props) =>{
	return <li className="votes">{props.option} : {props.votes}</li>
}

class Results extends Component{
	constructor(props){
		super(props);
		this.state= {
			data:[],
			options:{
				title:"Votes",
				pieHole: 0.4,
				is3D:true
			}
		}
	}
	
	mapData =()=>{

	}


	render(){
		return(
			<div className="results-container">
				<h5>Current Votes</h5>
				{this.props.poll.pollChoices.map((choice,i)=>{
					return <ListItem key={i} option={choice.option} votes={choice.votes}/>
				
				})}
				<Chart 
					chartType="PieChart"
					data={this.state.data}
					options={this.state.options}
					width="100%"
					height="400px"
				s/>
			</div>
			)
	}
}

export default Results