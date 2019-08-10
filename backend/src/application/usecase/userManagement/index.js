module.exports = {
    CreateUser : require('./createUser.usecase'),
    DeleteUser: require('./deleteUser.usecase'),
    EditUser: require('./editUser.usecase'),
    Login : require('./login.usecase'),
    ListUser : require('./listUser.usecase'),
    GetUser : require('./getUser.usecase'),
    GetUserByProject: require('../userManagement/getUserByProject.usecase'),
    
}