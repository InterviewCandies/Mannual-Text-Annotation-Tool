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
                return res.data;
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
   return axios.post('http://localhost:4000/textAnnotation/project/list/'+page,data)
            .then((res)=>{
                    return res.data;
            })
            .catch((err)=> {return err} )
}



export const search=(page,perPage,searchKey)=>{
    const data ={
        perPage : perPage,
        searchKey : searchKey
    }
   return axios.post('http://localhost:4000/textAnnotation/project/search/'+page,data)
            .then((res)=>{
                    return res.data;
            })
            .catch((err)=>{ return []} )
}


export const userProjectSearch=(user_id,page,perPage,searchKey)=>{
    const data ={
        page :page,
        perPage : perPage,
        searchKey : searchKey
    }
   return axios.post('http://localhost:4000/textAnnotation/project/userProjectSearch/'+user_id,data)
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
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/addUser/'+project_id,data)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return error;
    })
}

export const get= (id) =>{
  
    return  axios.post('http://localhost:4000/textAnnotation/project/get/'+id)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return false;
    })
}




export const removeUser= (user_id,project_id) =>{
    const data ={
        user_id : user_id,
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/removeUser/'+project_id,data)
            .then((res)=>{
                    return  Boolean( res.data );
            })
            .catch(error=>{
                return false;
    })
}
export const userProjectList=(user_id,page,perPage,sortKey,trend)=>{
    const data ={
        page : page,
        perPage : perPage,
        sortKey : sortKey,
        trend : trend
    }
   
    return  axios.post('http://localhost:4000/textAnnotation/project/userProjectList/'+user_id,data)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return [];
    })
}

