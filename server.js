import config from "./config";
import apiRouter from "./api"
import sassMiddleware from "node-sass-middleware";
import path from "path";
import express from "express";
import serverRender from "./serverRender"

const server= express();

server.use(sassMiddleware({
	src: path.join(__dirname,"sass"),
	dest: path.join(__dirname,"public")
}))

server.set("view engine", "ejs")
server.get([ '/', '/polls/:pollId' ], (req,res)=>{

	serverRender(req.params.pollId, function(content, initialData){
		res.render('index', {content:content, initialData:initialData})
	})
})

server.use('/api', apiRouter)
server.use(express.static('public'));

server.listen(config.port, ()=>{
	console.info('Express listening on port', config.port)
})
