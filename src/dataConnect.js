import config from "../config";
import http from 'http'
// import querystring from 'querystring'

const dataConnect = {} 

dataConnect.update = (id, key, value) =>{
	
}
dataConnect.delete = (id, key , value) =>{

}

dataConnect.getUser =(user, callback)=>{
	const userId = user
	const route = `${config.serverUrl}/api/user/${userId}`
	http.get(route, (res)=>{
		let rawData ="";
		res.on('data', (data)=>{
			rawData += data;
		})
		res.on("end", ()=>{	

			if(res.statusCode===200 && rawData.length !== 0){
					console.log("user exists")
				let parsedData = JSON.parse(rawData)
				
				return callback(parsedData)	
			}else if(rawData.length===0){
					console.log("EMpty data = no user")
				return callback(null)
			}else if(res.statusCode !== 200){
					console.log("user doesn't exist res =", res.statusCode)
				return callback(null);
			}
		})
	})
}

dataConnect.addUser = (user) =>{
	const data = JSON.stringify(user)
	const headers={
		'Content-Type': 'application/json',
		'Content-Length': data.length
	}
	const options = {
		hostname:config.host,
		port:config.port,
		path:`/api/users`,
		method: 'POST',
		headers: headers
	}
	const req = http.request(options, (res)=>{
		console.log("user post response", res)
	})

	req.write(data)
	req.end()
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