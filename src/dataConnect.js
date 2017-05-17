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

dataConnect.vote = (id, choice) =>{

}

export default dataConnect