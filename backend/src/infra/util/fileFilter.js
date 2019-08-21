module.exports =(req,file,cb)=>{
    if (!file.originalname.match(/\.(txt|json|csv)$/)) {
        return cb(new Error('Only txt/json files are allowed!'), false);
    }
    cb(null, true);
}