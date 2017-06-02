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
		let data = [["Choice", "Votes"]]
		
		let choices = this.props.poll.pollChoices
		choices.forEach((choice)=>{
			let row = []
			row.push(choice.option, choice.votes)
			data.push(row)
		})
		console.log(data)
		this.setState({
			data:data
		})
	}

	componentWillMount=()=>{
		this.mapData()
	}
	componentWillReceiveProps=()=>{
		this.mapData()

	}

	render(){
		return(
			<div className="results-container">
				<Chart 
					chartType="PieChart"
					data={this.state.data}
					options={this.state.options}
					width="100%"
					height="400px"
				s/>
				<h5>Current Votes</h5>
				{this.props.poll.pollChoices.map((choice,i)=>{
					return <ListItem key={i} option={choice.option} votes={choice.votes}/>
				
				})}
				
			</div>
			)
	}
}

export default Results