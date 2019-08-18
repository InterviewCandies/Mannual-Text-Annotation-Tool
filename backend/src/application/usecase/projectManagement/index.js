module.exports = {
    CreateProject : require('./createProject.usecase'),
    DeleteProject : require('./deleteProject.usecase'),
    ListProject   : require('./listProject.usecase'),
    UpdateProject : require('./updateProject.usecase'),
    AddUser       : require('./addUser.usecase'),
    RemoveUser    : require('./removeUser.usecase'),
    SearchProject : require('./search.usescase'),
    UserSearchProject : require('./userSearchProject.usecase'),
    GetProjectByUser : require('./getProjectByUser.usercase')
}