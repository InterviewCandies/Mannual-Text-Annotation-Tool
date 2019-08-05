const jwt = require('jsonwebtoken')
module.exports = {
      sign(obj){
        const token =jwt.sign(obj,process.env.SECRET_KEY);
        return token;
       },
       vertify(req){
          return  decoder = jwt.verify(req.body.jwt,process.env.SECRET_KEY,function(err,decoded){
             if(err) return false;
             return true;
          });
        
       }
       
}