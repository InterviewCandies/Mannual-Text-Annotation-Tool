

module.exports=  class UserPresenter{
       present({id,username,password,role,created_at,updated_at}){
           return {
               id: id,
               username: username,
               password: password,
               role: role,
               created_at : created_at,
               updated_at : updated_at
           }
       }
}

