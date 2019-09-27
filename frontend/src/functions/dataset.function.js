import axios from "axios";
import jwt_decode from 'jwt-decode'
axios.defaults.headers.common={
    'auth-token' : localStorage.getItem('userToken'),
    'Content-Type': 'multipart/form-data' 
}

export const sendFile=(file,id)=>{
        let formData = new FormData()
        formData.set('file',file)
    
        return axios.post('http://localhost:4000/textAnnotation/dataset/import/'+id,formData)
              .then((res)=>{
                   return res.data
              })
              .catch(err=>{
                  return err
              })
    
              
}


export const exportData =(id,fileType)=>{
     const data = {
          fileType 
     }
     return axios.post('http://localhost:4000/textAnnotation/dataset/export/'+id,data)
           .then((res)=>{
                return res.data
           })
           .catch(err=>{
                
               return err
           })
 
           
}

export const listDocument = (id,page,perPage,sortKey,trend,searchKey,userId) =>{
       const data ={
            page : page,
            perPage : perPage,
            sortKey :sortKey,
            trend : trend,
            searchKey : searchKey,
            userId
       }
       return axios.post('http://localhost:4000/textAnnotation/dataset/list/'+id,data)
       .then((res)=>{
            return res.data
       })
       .catch(err=>{
            return []
       })

}
export const getDocument = (id) =>{
  
     return axios.post('http://localhost:4000/textAnnotation/dataset/get/'+id)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return []
     })

}

export const getAllDocument = (id) =>{
  
     return axios.post('http://localhost:4000/textAnnotation/dataset/getAll/'+id)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return []
     })

}

export const getUserDocs = (id,userId,maxDocs=100) =>{
     const data = {
           userId,
           maxDocs
     }
     return axios.post('http://localhost:4000/textAnnotation/dataset/getUserDocs/'+id,data)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return []
     })

}

export const editDocument = (id,content) =>{
     const data = {
           content:content
     }
     return axios.post('http://localhost:4000/textAnnotation/dataset/update/'+id,data)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return false
     })

}


export const annotate = (id,labels) =>{
     const token = localStorage.getItem('userToken');
     const decoder = jwt_decode(token);

     const data = {
          labels:labels,
          user_id : (decoder.role)? undefined : decoder.id,
          status : decoder.role
     }
     return axios.post('http://localhost:4000/textAnnotation/dataset/annotate/'+id,data)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return err
     })

}
export const verifyDocument = (id,status) =>{
     const data = {
          status:status
     }
     return axios.post('http://localhost:4000/textAnnotation/dataset/verify/'+id,data)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return false
     })

}


export const deleteDocument = (id) =>{
    
     return axios.post('http://localhost:4000/textAnnotation/dataset/delete/'+id)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return false
     })

}