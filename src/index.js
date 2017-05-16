import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App"

ReactDOM.render(
	<App 
		initialData={window.initialData}
		currentPoll={window.id}
	/>,
	document.getElementById('root')
);
