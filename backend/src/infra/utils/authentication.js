const jwt = require('jsonwebtoken')
module.exports =class Authentication{
      constructor({SECRET_KEY}){
            this.SECRET_KEY = SECRET_KEY
            this.sign = this.sign.bind(this)
            this.verify = this.verify.bind(this)
      }
      sign(payload){
             const token = jwt.sign(payload,this.SECRET_KEY);
            return token
      }

      verify(req,res,next){
            const token = req.header('auth-token');
            if(!token) return res.status(401).send('Acess denined')
            return jwt.verify(token,this.SECRET_KEY,function(err,decoded){
                  if(err) return res.status(400).send('Invalid token');
                  return next();
            })
      }

}