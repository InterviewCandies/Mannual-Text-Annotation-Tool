module.exports =(req,file,cb)=>{
    if (!file.originalname.match(/\.(txt|json)$/)) {
        req.fileValidationError = 'Wrong format';
        return cb(null, false);
    }
    cb(null, true);
}