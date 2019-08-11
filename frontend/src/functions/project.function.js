import axios from "axios";



export const editProject = (id,name,description)=>{
    const message ={
        id : id,
        project_name : name,
        project_description : description,
        jwt : localStorage.getItem('userToken')

    }
    return axios.post('http://localhost:4000/textAnnotation/project/update/',message)
                .then(res=>{
                      return res.data;
                })
                .catch(error=>{
                     return error;
                })
}


export const list =()=>{
    return  axios.get('http://localhost:4000/textAnnotation/project/list/',{
                    headers:{
                        'auth-token' : localStorage.getItem('userToken')
                    }
            })
            .then((res)=>{
                    console.log(res.data)
                    return res.data;
            })
}


export const deleteProject =(id)=>{
    const message ={
        id : id,
        jwt : localStorage.getItem('userToken')
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/delete/',message)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return error;
           })
}

export const createProject= (name,description) =>{
    const message ={
        project_name : name,
        project_description : description,
        jwt : localStorage.getItem('userToken')
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/create/',message)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return error;
    })
}

export const addUser= (user_id,project_id) =>{
    const message ={
        user_id: user_id,
        project_id: project_id,
        jwt : localStorage.getItem('userToken')
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/addUser/',message)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return error;
    })
}

export const listUser= (project_id) =>{
    const message ={
        project_id: project_id,
        jwt : localStorage.getItem('userToken')
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/listUser',message)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return error;
    })
}

export const removeUser= (user_id,project_id) =>{
    const message ={
        user_id : user_id,
        project_id: project_id,
        jwt : localStorage.getItem('userToken')
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/removeUser',message)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return error;
    })
}
export const getProject=(user_id)=>{
    const message ={
        user_id : user_id,
        jwt : localStorage.getItem('userToken')
    }
    return  axios.post('http://localhost:4000/textAnnotation/project/userProjectList',message)
            .then((res)=>{
                    return res.data;
            })
            .catch(error=>{
                return error;
    })
}