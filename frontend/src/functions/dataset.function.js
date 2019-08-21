import axios from "axios";

axios.defaults.headers.common={
    'auth-token' : localStorage.getItem('userToken'),
    'Content-Type': 'multipart/form-data' 
}

export const sendFile=(file,id)=>{
        let formData = new FormData()
        formData.set('file',file)
    
        axios.post('http://localhost:4000/textAnnotation/dataset/import/'+id,formData)
              .then((res)=>{
                   console.log(res.data)
              })
              .catch(err=>{
                  console.log(err)
              })
    
              
}

export const listDocument = (id,page,perPage) =>{
       const data ={
            page : page,
            perPage : perPage
       }
       return axios.post('http://localhost:4000/textAnnotation/dataset/list/'+id,data)
       .then((res)=>{
            return res.data
       })
       .catch(err=>{
            return []
       })

}
export const searchDocument = (id,page,perPage,value) =>{
     const data ={
          page : page,
          perPage : perPage,
          value: value
     }
     return axios.post('http://localhost:4000/textAnnotation/dataset/search/'+id,data)
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

export const deleteDocument = (id) =>{
    
     return axios.post('http://localhost:4000/textAnnotation/dataset/delete/'+id)
     .then((res)=>{
          return res.data
     })
     .catch(err=>{
          return false
     })

}