import React, { Component } from "react";

const Nav = (props)=>(
	
	return <nav className="navbar">
		<ul>
			<li className="link">Home </li>
			{this.props.user && <li className="link">My Polls</li>}
			{this.props.user && <li className="link">New Poll</li>}
			{!this.props.user && <li className="link">Sign in</li>}
		</ul>
	</nav>


	)


export default Nav