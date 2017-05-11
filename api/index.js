import express from 'express';
import data from '../src/test-poll-data';
import { MongoClient } from 'mongodb';
import config from "../config"


const mongoUri = config.mongodbUri




// const polls = data.polls


const router = express.Router();




router.get('/polls',(req,res)=>{
	// console.log(data)
	// res.send({polls: data})
	MongoClient.connect(mongoUri, function(err,db){
	if(err){
            console.log(err)
        }else{
        	var usersdb = db.collection('polls')

        	usersdb.find({}).toArray(function(err, docs){
        		if(err){
        			console.log(err)
        		}else{
        			res.send(docs)
        			db.close();
        		}
        		
        	})
        }
})


// Database endpoints e.g. api/users, api/polls

router.get('/users', (req, res)=>{
	console.log("getting users")
	//db connect
	MongoClient.connect(mongoUri, function(err,db){
	if(err){
            console.log(err)
        }else{
        	var usersdb = db.collection('users')

        	usersdb.find({}).toArray(function(err, docs){
        		if(err){
        			console.log(err)
        		}else{
        			res.send(docs)
        			db.close();
        		}
        		
        	})
        }
	})


})



export default router;