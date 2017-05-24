import config from "../config";
import http from 'http'
import querystring from 'querystring'

const dataConnect = {} 

dataConnect.update = (id, key, value) =>{
	
}
dataConnect.delete = (id, key , value) =>{

}
dataConnect.checkUser =(user)=>{
	
}


dataConnect.addPoll = (poll) =>{
	const data = JSON.stringify(poll)
	const headers={
		'Content-Type': 'application/json',
		'Content-Length': data.length
	}
	const options = {
		hostname:config.host,
		port:config.port,
		path:`/api/polls`,
		method: 'POST',
		headers: headers
	}

	const req = http.request(options, (res)=>{
		console.log("put response", res)
	})

	req.write(data)
	req.end()
}

dataConnect.vote = (id, choice, votes) =>{
	const data = JSON.stringify({
		id: id,
		choice: choice,
		votes:votes
	})

	const headers={
		'Content-Type': 'application/json',
		'Content-Length': data.length
	}

	const options = {
		hostname:config.host,
		port:config.port,
		path:`/api/polls/1`,
		method: 'PUT',
		headers: headers
	}

	const req = http.request(options, (res)=>{
		console.log("put request made")
		console.log("response", res)
	})

	req.write(data)
	req.end()

}

export default dataConnect