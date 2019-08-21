
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = ({userRouter,projectRouter,labelRouter,datasetRouter})=>{
        const router = express.Router();
        router.use(cors());
        router.use(bodyParser.json());
        router.use('/textAnnotation',userRouter);
        router.use('/textAnnotation',projectRouter);
        router.use('/textAnnotation',labelRouter);
        router.use('/textAnnotation',datasetRouter)
        return router;
}
