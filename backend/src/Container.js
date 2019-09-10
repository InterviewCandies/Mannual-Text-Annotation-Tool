const awilix = require('awilix')
const App = require('./application/App')
const Server = require('./infra/webserver/server')
const Router = require('./infra/webserver/router')
const userRouter = require('./infra/webserver/user')
const projectRouter = require('./infra/webserver/project')
const labelRouter = require('./infra/webserver/label')
const datasetRouter = require('./infra/webserver/dataset')
const Database = require('./infra/database')
const Controller = require('./deliveries/controller')
const Gateway = require('./infra/gateway')
const UserManagement = require('./application/usecase/user-management')
const ProjectManagement = require('./application/usecase/project-management')
const LabelManagement = require('./application/usecase/label-management')
const DatasetManagement = require('./application/usecase/dataset-management')
const container = awilix.createContainer();
const Authentication= require('./infra/utils/authentication')
const PasswordHasher = require('./infra/utils/password-hasher')
const FileHandler = require('./infra/utils/file-handler')
const Mapper = require('./infra/mapper')
// System
container.register({
            app : awilix.asClass(App).singleton(),
            server : awilix.asClass(Server).singleton()
        })
        .register({
            router : awilix.asFunction(Router).singleton(),
            userRouter: awilix.asFunction(userRouter).singleton(),
            projectRouter: awilix.asFunction(projectRouter).singleton(),
            labelRouter : awilix.asFunction(labelRouter).singleton(),
            datasetRouter: awilix.asFunction(datasetRouter).singleton()
        })
      

//Controller 
container.register({
        userController : awilix.asClass(Controller.UserController).singleton(),
        projectController : awilix.asClass(Controller.ProjectController).singleton(),
        labelController : awilix.asClass(Controller.LabelController).singleton(),
        datasetController : awilix.asClass(Controller.DatasetController).singleton()
})


//Middleware 
container.register ({
       authentication : awilix.asClass(Authentication).singleton(),
       passwordHasher : awilix.asClass(PasswordHasher).singleton(),
       fileHandler    : awilix.asClass(FileHandler).singleton()
})



//Mapper
container.register({
        userMapper : awilix.asClass(Mapper.UserMapper).singleton(),
        projectMapper : awilix.asClass(Mapper.ProjectMapper).singleton(),
        labelMapper : awilix.asClass(Mapper.LabelMapper).singleton(),
        documentMapper : awilix.asClass(Mapper.DocumentMapper).singleton()
})

//Gateway
container.register({
        userGateway : awilix.asClass(Gateway.UserGateway).singleton(),
        projectGateway :awilix.asClass(Gateway.ProjectGateway).singleton(),
        labelGateway : awilix.asClass(Gateway.LabelGateway).singleton(),
        datasetGateway : awilix.asClass(Gateway.DatasetGateway).singleton()
        
})

//Database 
container.register({
           database : awilix.asValue(Database.database),
           UserModel : awilix.asValue(Database.UserModel),
           LabelModel : awilix.asValue(Database.LabelModel),
           ProjectModel: awilix.asValue(Database.ProjectModel),
           DocumentModel : awilix.asValue(Database.DocumentModel),
        })

//App
//User management
container.register({
        _login : awilix.asClass(UserManagement.Login),
        createUser : awilix.asClass(UserManagement.CreateUser),
        deleteUser : awilix.asClass(UserManagement.DeleteUser),
        editUser   : awilix.asClass(UserManagement.EditUser),
        searchUser : awilix.asClass(UserManagement.SearchUser),
        getUser   : awilix.asClass(UserManagement.GetUser),
        listUser  : awilix.asClass(UserManagement.ListUser),
})
//Project management
container.register({
        createProject : awilix.asClass(ProjectManagement.CreateProject),
        deleteProject : awilix.asClass(ProjectManagement.DeleteProject),
        editProject : awilix.asClass(ProjectManagement.UpdateProject),
        listProject : awilix.asClass(ProjectManagement.ListProject),
        _addUser : awilix.asClass(ProjectManagement.AddUser),
        getProject : awilix.asClass(ProjectManagement.Get),
        searchProject : awilix.asClass(ProjectManagement.SearchProject),
        _userProjectSearch : awilix.asClass(ProjectManagement.UserProjectSearch),
        _removeUser : awilix.asClass(ProjectManagement.RemoveUser),
        _userProjectList : awilix.asClass(ProjectManagement.UserProjectList)
})
// Label management
container.register({
        createLabel : awilix.asClass(LabelManagement.CreateLabel),
        deleteLabel : awilix.asClass(LabelManagement.DeleteLabel),
        editLabel   : awilix.asClass(LabelManagement.EditLabel),
        listLabel   : awilix.asClass(LabelManagement.ListLabel)
})
container.register({
        importDataset : awilix.asClass(DatasetManagement.Import),
        exportDataset : awilix.asClass(DatasetManagement.Export),
        listDocument : awilix.asClass(DatasetManagement.List),
        editDocument: awilix.asClass(DatasetManagement.Edit),
        getDocument : awilix.asClass(DatasetManagement.Get),
        deleteDocument : awilix.asClass(DatasetManagement.Delete),
        verifyDocument: awilix.asClass(DatasetManagement.Verify),
        searchDocument : awilix.asClass(DatasetManagement.Search),
        annotateDocument : awilix.asClass(DatasetManagement.Annotate)
 
})
module.exports = container;
