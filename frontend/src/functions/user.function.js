import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const login=newLogin=>{
        return axios.post('http://localhost:4000/textAnnotation/user/login/',newLogin)
        .then(res=>{
             const token =res.data;   
             localStorage.setItem('userToken',token);
             const decoder = jwt_decode(token);
             return decoder;
        })
};
        
export const createUser = newUser=>{
          return axios.post('http://localhost:4000/textAnnotation/user/create/',newUser)
                      .then(res=>{
                            return res.data;
                      })
                      .catch(error=>{
                           return error;
                      })
}
    



