import express from 'express';
import data from '../src/test-poll-data'



const router = express.Router();

router.get('/polls',(req,res)=>{
	console.log(data)
	res.send({polls: 'test'})
})

export default router;