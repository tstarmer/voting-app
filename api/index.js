import express from 'express';
import data from '../src/test-poll-data'

// const polls = data.polls


const router = express.Router();

router.get('/polls',(req,res)=>{
	// console.log(data)
	res.send({polls: data.polls})
})

export default router;