import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

import config from './config';

const http = require('http')

var rawData ="";

const serverRender = (pollId, callback) =>{
	console.log("server render", "pollID =", pollId)

	var route = `${config.serverUrl}/api/polls`;

	http.get(`${route}`, (res)=>{
		res.on("data", function(data){
			rawData += data;
		})
		res.on("end", ()=>{
			if(res.statusCode === 200){
				// rawData = rawData.toString()
				var parsedData = JSON.parse(rawData)
					// console.log("parsed data is", parsedData, "typeof", typeof(parsedData))
				
				var content = ReactDOMServer.renderToString(
					<App 
						initialData={parsedData}
						currentPoll={parseInt(pollId)}
					/>
				);

				var initialData = {data:parsedData , id:pollId||null}

				console.log("serverRender data = ", initialData)

				callback(content, initialData)
			}
			// console.log("Server Render error " + err)
		})
	})
}
	
export default serverRender