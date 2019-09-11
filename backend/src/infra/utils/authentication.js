const jwt = require('jsonwebtoken')
const config = require('config')
const SECRET_KEY = config.get('Server.SECRET_KEY')
module.exports =class Authentication{
      constructor(){
            this.sign = this.sign.bind(this)
            this.verify = this.verify.bind(this)
      }
      sign(payload){
             const token = jwt.sign(payload,SECRET_KEY);
            return token
      }
      verify(req,res,next){
            const token = req.header('auth-token');
            if(!token) return res.status(401).send('Acess denined')
            return jwt.verify(token,SECRET_KEY,function(err,decoded){
                  if(err) return res.status(400).send('Invalid token');
                  return next();
            })
      }

}