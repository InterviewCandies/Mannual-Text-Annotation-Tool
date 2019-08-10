import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { list } from './project.function';

export const login=newLogin=>{
        return axios.post('http://localhost:4000/textAnnotation/user/login/',newLogin)
        .then(res=>{
             const token =res.data;   
             localStorage.setItem('userToken',token);
             const decoder = jwt_decode(token);
             console.log(decoder)
             return decoder;
        })
};
        
export const createUser = (username,password,role)=>{
          const message = {
               username : username,
               password : password,
               role : role,
               jwt  : localStorage.getItem('userToken')
          }
          return axios.post('http://localhost:4000/textAnnotation/user/create/',message)
                      .then(res=>{
                            return res.data;
                      })
                      .catch(error=>{
                           return error;
                      })
}

export const UserList =()=>{
       const message = {
            jwt : localStorage.getItem('userToken')
       }
       return axios.post('http://localhost:4000/textAnnotation/user/list/',message)
                    .then(res=>{
                              return res.data;
                    })
                    .catch(error=>{
                         return error;
                    })
}    

export const getUser=(username)=>{
     const message = {
          username:username,
          jwt : localStorage.getItem('userToken')
     }
     return axios.post('http://localhost:4000/textAnnotation/user/get/',message)
                  .then(res=>{
                            return res.data;
                  })
                  .catch(error=>{
                       return error;
                  })
} 



