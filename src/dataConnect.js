import config from "../config";
import http from 'http'
import querystring from 'querystring'

const dataConnect = { } 
/*polls*/
/*
	Need to use node request method for posting data?


*/
// const host = config.host
const pollsRoute = `${config.serverUrl}/api/polls`

dataConnect.update = (id, key, value) =>{
	let updateRoute = `?id=${id}&key=${key}&value=${value}`
	http.post(`${pollsRoute}/${updateRoute}`, (res)=>{
		console.log(res)
	})
}

dataConnect.add = (id, key, value) =>{

}

dataConnect.delete = (id, key , value) =>{

}

dataConnect.vote = (id, choice, votes) =>{
		console.log(`"voting: id =${id} choice =${choice} votes= ${votes}`)

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
		/*body:{
			id: id,
			choice: choice,
			votes: votes
		}*/
	}

	const req = http.request(options, (res)=>{
		console.log("put request made")
		console.log("response", res)
	})

	req.write(data)
	req.end()
	
}

export default dataConnect