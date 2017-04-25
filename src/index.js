import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App"

const http = require('http')

var rawData ="";

http.get('api/polls', (res)=>{
	res.on("data",function(data){
		rawData += data;
	})
	res.on("end", ()=>{
		if(res.statusCode === 200){
			// console.log("success", typeof(rawData))
			var parsedData = JSON.parse(rawData)
			// console.log(parsedData)
			ReactDOM.render(
				<App initialData={parsedData}/>,
				document.getElementById('root')
			);
		}
	})
})



