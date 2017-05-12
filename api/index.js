import express from 'express';
import data from '../src/test-poll-data';
import { MongoClient } from 'mongodb';
import config from "../config"

const mongoUri = config.mongodbUri

// const polls = data.polls

const router = express.Router();

// Database endpoints e.g. api/users, api/polls
/*General lookups*/
router.get('/polls',(req,res)=>{
	// console.log(data)
	// res.send({polls: data})
	MongoClient.connect(mongoUri, function(err,db){
	if(err){
            console.log(err)
        }else{
        	var pollsdb = db.collection('polls')

        	pollsdb.find({}).toArray(function(err, docs){
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

/*Database query end points */
/*Specific End points*/
/*Individual User lookup; e.g. for profile page*/
router.get("/user/*", (req,res)=>{
    console.log("looking up user", req.params[0])
    
    var userId = req.params[0]

    MongoClient.connect(mongoUri, function(err,db){
        if(err){
                console.log(err)
            }else{
                var usersdb = db.collection('users')

                usersdb.find({id:userId}).toArray(function(err, docs){
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
})

/*Polls by User; polls by user lookup*/
router.get("/polls/user/*", (req,res)=>{
    console.log("looking up user", req.params[0])
    
    var userId = req.params[0]

    MongoClient.connect(mongoUri, function(err,db){
        if(err){
                console.log(err)
            }else{
                var usersdb = db.collection('polls')

                usersdb.find({creatorId:userId}).toArray(function(err, docs){
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
})

/*Data update routes*/
/*Update userdb: userID= ,key= , value=*/
router.post("/user/*", (req,res)=>{
    var userId = req.params[0]

    MongoClient.connect(mongoUri,function(err,db)){
        if(err){
            console.log(err)
        }else{
            var usersdb = db.collections('users')


        }
    }
})

export default router;