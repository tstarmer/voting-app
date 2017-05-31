import express from 'express';
import data from '../src/test-poll-data';
import { MongoClient, ObjectID } from 'mongodb';
import config from "../config"
import bodyParser from 'body-parser'

const mongoUri = config.mongodbUri
const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}))
// Database endpoints e.g. api/users, api/polls
/*General lookups*/
router.get('/polls',(req,res)=>{
	MongoClient.connect(mongoUri, function(err,db){
        console.log("getting polls")
        
    	if(err){
                console.log("polls error 1 ", err)
        }else{
        	var pollsdb = db.collection('polls')

        	pollsdb.find({}).toArray(function(err, docs){
        		if(err){
        			console.log("polls error 2 ", err)
        		}else{
         			res.send(docs)
           		}   		
        	})
        }
        db.close();
    })
})

router.get('/users', (req, res)=>{
	//console.log("getting users")
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
        		}   		
        	})
        }
        db.close();
	})
})

/*Individual Polls*/
router.get('/polls/:pollId', (req,res)=>{
    var pollId =  parseInt(req.params.pollId)
    MongoClient.connect(mongoUri, function(err,db){
        if(err){
            console.log(err)
        }else{
            var pollsdb = db.collection('polls')

            pollsdb.findOne({id:pollId}, function(err,doc){
                if(err){
                    console.log(err)
                }else{
                    console.log("doc", doc)
                    res.send(doc)
                }
            })              
        }
        db.close()
    })
})

/*Individual User lookup; e.g. for profile page*/
router.get("/user/:userId", (req,res)=>{ 
    var userId = req.params.userId
    MongoClient.connect(mongoUri, function(err,db){
        if(err){
                console.log(err)
        }else{
            var usersdb = db.collection('users')

            usersdb.findOne({user:userId}, function(err, doc){
                if(err){
                    console.log(err)
                }else{
                    console.log("user", doc)
                    res.send(doc)
                } 
            })
        }
        db.close()
    })
})

/*Polls by User; polls by user lookup*/
router.get("/polls/user/*", (req,res)=>{
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
                }  
            })
        }
        db.close();
    })
})

/*Data update routes*/
router.post("/polls", (req,res)=>{
    //console.log("post body", req.body)
    let poll = req.body
    MongoClient.connect(mongoUri,function(err,db){
        if(err){
            console.log("Connect error", err)
        }else{
            var polldb = db.collection('polls')
            polldb.insertOne(poll)
        }
        db.close();
    })
})

router.put("/polls/*",  (req,res)=>{
    //console.log("req body ", req.body)
    let id = req.body.id
    let choice = req.body.choice
    let votes = req.body.votes
    MongoClient.connect(mongoUri,function(err,db){
        if(err){
            console.log("Connect error", err)
        }else{
            var polldb = db.collection('polls')

            polldb.updateOne({id:id, "pollChoices.option":choice},{
                $set:{
                    "pollChoices.$.votes":votes
                }  
            },{w:1}, function(err, result){
                if(err){
                    console.log("update error", err)
                }
                console.log("update happened?", result.result)
                res.send("updating votes")
            })
        }
        db.close();
    })
})

router.post("/users",  (req,res)=>{
    console.log("req body ", req.body)
    let user = req.body 
    MongoClient.connect(mongoUri,function(err,db){
        if(err){
            console.log("Connect error", err)
        }else{
            var polldb = db.collection('users')

            polldb.insertOne(user)
        }
        db.close();
    })
})

router.put("/users", (req,res)=>{
    let user = req.body.user
    let key = req.body.key
    let value = req.body.value
    MongoClient.connect(mongoUri,function(err,db){
        if(err){
            console.log("Connect error", err)
        }else{
            var userdb = db.collection('users')

            userdb.updateOne({user:user},
                {$set:{[key]:value}}, 
                function(err, result){
                    if(err){
                        console.log("update error", err)
                    }
                    console.log("update happened?", result.result)
                    res.send(`updated user:${user} to ${key}:${value}`)
            })
        }
        db.close();
    })
})

export default router;