import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

import config from './config';

const http = require('http')

const serverRender = (pollId, callback) =>{

	var route = `${config.serverUrl}/api/polls`;

	http.get(`${route}`, (res)=>{
		var rawData ="";

		res.on("data", function(data){
			rawData += data;		
		})

		res.on("end", ()=>{
			if(res.statusCode === 200){
				var parsedData = JSON.parse(rawData)

				var content = ReactDOMServer.renderToString(
					<App 
						initialData={parsedData}
						currentPoll={parseInt(pollId)}
					/>
				);

				var initialData = {data:parsedData , id:pollId||null}

				callback(content, initialData)
			}
		})
	})
}
	
export default serverRender