

module.exports = class UserPresenter{
       present(user){
           return {
               id: user._id,
               username: user.username,
               password: user.password,
               role: user.role
           }
       }
}