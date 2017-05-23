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

/*Individual Polls*/
router.get('/polls/:pollId', (req,res)=>{
    var pollId =  parseInt(req.params.pollId)

    console.log("pollId", pollId)

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
                    db.close
                }
            })
               
            db.close()          
        }
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

            usersdb.findOne({id:userId}).toArray(function(err, docs){
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

/*Data update routes*/
/*Update userdb: userID= ,key= , value=*/

/* Update poll */
/*router.post("/polls/:pollId-:key-:value", (req,res)=>{
    var pollId = req.params.pollId
    var key = req.params.key
    var value = req.params.value
    
    MongoClient.connect(mongoUri,function(err,db){
        if(err){
            console.log(err)
        }else{
            var polldb = db.collections('polls')

            polldb.update({id:id},{
                $set:{
                    [key]:value
                }
            })
        }
    })
}) 
*/
/* Vote on Poll */

router.put("/polls/*",  (req,res)=>{
    
    //res.send("received put request")
    // console.log(req)
    console.log("req body ", req.body)

    let id = req.body.id
    let choice = req.body.choice
    let votes = req.body.votes

    console.log("id ", typeof(id),"choice ", typeof(choice),"votes ", typeof(votes))

    MongoClient.connect(mongoUri,function(err,db){
        if(err){
            console.log("Connect error", err)
        }else{
            var polldb = db.collection('polls')

            // console.log(polldb)

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
                db.close();
            })
        }
    })


})

router.put("/polls/:id/:choice/:value", (req,res)=>{
    console.log("vote recieved")
    var id = req.params.id
    var choice = req.params.choice

    MongoClient.connect(mongoUri,function(err,db){
        if(err){
            console.log(err)
        }else{
            var polldb = db.collections('polls')

            polldb.update({id:id, pollChoices:{option:choice}},{
                $set:{
                    votes:value
                }
                
            })
                res.send("updating votes")
            db.close();

        }
    })
})

export default router;