import React, { Component} from "react"

function MessageBox(props){
	console.log("message props", props)
	return(
		<div className="message-box">
			<a className="close" onClick={props.closeModal} value="close">X</a>
			<p>{props.message}</p>
		</div>
	)
}

export default MessageBox