import axios from 'axios'

axios.defaults.headers.common={
    'auth-token' : localStorage.getItem('userToken')   
}

export const listLabel=(project_id)=>{
   
     return axios.post('http://localhost:4000/textAnnotation/label/list/'+project_id)
            .then(res=>{
                return res.data
            })
            .catch(error=>{
                return []
            })
}
export const createLabel=(project_id,content,shortcut,backgroundColor,textColor)=>{
    const data ={
        project_id : project_id,
        content : content,
        shortcut : shortcut,
        backgroundColor : backgroundColor,
        textColor : textColor
    }
    return axios.post('http://localhost:4000/textAnnotation/label/create/',data)
        .then(res=>{
            return res.data
        })
        .catch(error=>{
            return []
    })
}

export const removeLabel=(id)=>{
    
    return axios.post('http://localhost:4000/textAnnotation/label/delete/'+id)
        .then(res=>{
            return res.data
        })
        .catch(error=>{
            return false
    })
}