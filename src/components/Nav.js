import React, { Component } from "react";

const Nav = (props)=>{
	console.log("props", props)
	return (<nav className="navbar">
		<ul>
			<li className="link">Home </li>
			{props.user && <li className="link">My Polls</li>}
			{props.user && <li className="link">New Poll</li>}
			{props.user && <li className="link">Sign Out</li>}
			{!props.user && <li className="link">Sign in</li>}
		</ul>
	</nav>)


}
	
	





export default Nav