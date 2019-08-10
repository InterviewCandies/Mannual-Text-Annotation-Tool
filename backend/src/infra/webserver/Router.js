
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = ({userRouter,projectRouter})=>{
        const router = express.Router();
        router.use(cors());
        router.use(bodyParser.json());
        router.use('/textAnnotation',userRouter);
        router.use('/textAnnotation',projectRouter);
        router.use('/textAnnotation',require('./Label')());
        return router;
}
