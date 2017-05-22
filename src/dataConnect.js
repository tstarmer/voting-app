import config from "../config";
import http from 'http'

const dataConnect = { } 
/*polls*/
/*
	Need to use node request method for posting data?


*/

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
	const updateRoute = `/${id}/${choice}/${votes}`
		console.log("Route", updateRoute)
		console.log(`postroute: ${pollsRoute}${updateRoute}`)

	const options = {
		hostname:`${pollsRoute}`,
		port:config.port,
		path:`${updateRoute}`,
		method: 'PUT'
	}
	console.log(`Options:`, options)
	
	http.request(options, (res)=>{
		console.log("posting votes")//not seeing this yet
		console.log(`Server status ${res.statusCode}`)
		console.log(`Response headers ${res.headers}`)
	})
}

export default dataConnect