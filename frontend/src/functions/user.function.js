import axios from 'axios'
import jwt_decode from 'jwt-decode'


axios.defaults.headers.common={
     'auth-token' : localStorage.getItem('userToken')   
 }

 
export const login=newLogin=>{
        return axios.post('http://localhost:4000/textAnnotation/user/login/',newLogin)
        .then(res=>{
             const token =res.data
             localStorage.setItem('userToken',token);
             const decorder = jwt_decode(token)
             return decorder;
        })
        .catch(error=>{  return error })
};
        
export const createUser = (username,password,role)=>{
          const message = {
               username : username,
               password : password,
               role : role,
          }
          return axios.post('http://localhost:4000/textAnnotation/user/create/',message)
                      .then(res=>{
                            return res.data;
                      })
                      .catch(error=>{
                           return error;
                      })
}
        
export const editUser = (id,username,password,role)=>{
     const data = {
          username : username,
          password : password,
          role : role,
     }
     return axios.post('http://localhost:4000/textAnnotation/user/update/'+id,data)
                 .then(res=>{
                       return res.data;
                 })
                 .catch(error=>{
                      return error;
                 })
}

export const userList =(page,perPage,sortKey,trend,searchKey)=>{
       const data = {
            sortKey ,
            perPage,
            trend,
            searchKey
       }
       return axios.post('http://localhost:4000/textAnnotation/user/list/'+page,data)
                    .then(res=>{
                              return res.data;
                    })
                    .catch(error=>{
                         return error;
                    })
}    


export const deleteUser =(id)=>{
     
     return axios.post('http://localhost:4000/textAnnotation/user/delete/'+id)
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



