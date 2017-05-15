import React, { Component } from "react";

const Nav = (props)=>{

	return (<nav className="navbar">
		<ul>
			<li 
				className="link" 
				onClick={()=>props.clickHandler("home")}>
				Home 
			</li>
			{props.user && <li 
				className="link" 
				onClick={()=>props.clickHandler("my-polls")}>
				My Polls
				</li>
			}
			{props.user && <li 
				className="link" 
				onClick={()=>props.clickHandler("new")}>
				New Poll
				</li>
			}
			{props.user && <li 
				className="link" 
				onClick={()=>props.loginHandler("logout")}>
				Sign Out
				</li>
			}
			{!props.user && <li 
				className="link" 
				onClick={()=>props.loginHandler("login")}>
				Sign in
				</li>
			}
		</ul>
	</nav>)

}

export default Nav