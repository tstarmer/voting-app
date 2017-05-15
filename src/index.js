import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App"

// const http = require('http')

// console.log(window.initialData)

// var rawData ="";

// http.get('/api/polls', (res)=>{
// 	res.on("data",function(data){
// 		rawData += data;
// 	})
// 	res.on("end", ()=>{
// 		if(res.statusCode === 200){
// 			console.log("client rendering", typeof(rawData))
// 			var parsedData = JSON.parse(rawData)
// 			// console.log(parsedData)
			ReactDOM.render(
				<App 
					initialData={window.initialData}
					currentPoll={window.id}
				/>,
				document.getElementById('root')
			);
// 		}
// 	})
// })



