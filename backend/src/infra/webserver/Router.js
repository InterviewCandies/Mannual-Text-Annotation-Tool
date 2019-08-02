
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = ()=>{
        const router = express.Router();
        router.use(cors());
        router.use(bodyParser.json());
        router.use('/textAnnotation',require('./User')());
        router.use('/textAnnotation',require('./Project')());
        router.use('/textAnnotation',require('./Label')());
        return router;
}
