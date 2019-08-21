import axios from "axios";

axios.defaults.headers.common={
    'auth-token' : localStorage.getItem('userToken')   
}


export const editProject = (id,name,description)=>{
    const data ={
        project_name : name,
        project_description : description,
    }
  
    return axios.post('http://localhost:4000/textAnnotation/project/update/'+id,data)
        .then(res=>{
                return Boolean( res.data );
        })
        .catch(error=>{
                return false;
        })
}


export const list =(page,perPage,sortKey,trend)=>{
    const data ={
        perPage : perPage,
        sortKey : sortKey,
        trend   : trend
    }
    console.log(page);
   return axios.post('http://localhost:4000/textAnnotation/project/list/'+page,data)
            .then((res)=>{
                    return res.data;
            })
            .catch((err)=>{ return []} )
}



export const search=(page,perPage,value)=>{
    const data ={
        perPage : perPage,
        value : value
    }
   return axios.post('http://localhost:4000/textAnnotation/project/search/'+page,data)
            .then((res)=>{
                    return res.data;
            })
            .catch((err)=>{ return []} )
}


export const userSearchProject=(user_id,page,perPage,value)=>{
    const data ={
        user_id: user_id,
        perPage : perPage,
        value : value
    }
   return axios.post('http://localhost:4000/textAnnotation/project/userSearchProject/'+page,data)
            .then((res)=>{
                    return res.data;
            })
            .catch((err)=>{ return []} )
}




export const deleteProject =(id)=>{
   
    return  axios.post('http://localhost:4000/textAnnotation/project/delete/'+id)
            .then((res)=>{
                    return Boolean( res.data );
            })
            .catch(error=>{
                return false;
           })
}

export const createProject= (name,description) =>{
    const data ={
        project_name : name,
        project_description : description
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/create/',data)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return false;
    })
}

export const addUser= (user_id,project_id) =>{
    const data ={
        user_id: user_id,
        project_id: project_id,
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/addUser/',data)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return false;
    })
}

export const listUser= (project_id) =>{
    const data ={
        project_id: project_id,
    }
    return  axios.post('http://localhost:4000/textAnnotation/user/getUserByProject',data)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return [];
    })
}

export const removeUser= (user_id,project_id) =>{
    const data ={
        user_id : user_id,
        project_id: project_id,
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/removeUser',data)
            .then((res)=>{
                    return  Boolean( res.data );
            })
            .catch(error=>{
                return false;
    })
}
export const getProjectByUser=(user_id,page,perPage)=>{
    const data ={
        user_id : user_id,
        perPage : perPage
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/getProjectByUser/'+page,data)
            .then((res)=>{
                    return res.data;
                    
            })
            .catch(error=>{
                return [];
    })
}

