const awilix = require('awilix')
const App = require('./application/App')
const Server = require('./infra/webserver/Server')
const Router = require('./infra/webserver/Router')
const userRouter = require('./infra/webserver/User')
const projectRouter = require('./infra/webserver/Project')
const labelRouter = require('./infra/webserver/Label')
const datasetRouter = require('./infra/webserver/Dataset')
const Database = require('./infra/database')
const config = require('./config')
const Controller = require('./deliveries/Controller')
const Gateway = require('./infra/gateway')
const UserManagement = require('./application/usecase/userManagement')
const ProjectManagement = require('./application/usecase/projectManagement')
const LabelManagement = require('./application/usecase/labelManagement')
const DatasetManagement = require('./application/usecase/datasetManagement')
const container = awilix.createContainer();
const Authentication= require('./infra/util/authentication')
const PasswordHasher = require('./infra/util/PasswordHasher')
const Mapper = require('./infra/Mapper')
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
        .register({
            config : awilix.asValue(config)
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
       passwordHasher : awilix.asClass(PasswordHasher).singleton()
})


//Secret key for jwt 
container.register({
      SECRET_KEY : awilix.asValue('SECRET_KEY')
})

//Mapper
container.register({
        userMapper : awilix.asClass(Mapper.UserMapper).singleton(),
        projectMapper : awilix.asClass(Mapper.ProjectMapper).singleton(),
        userProjectMapper : awilix.asClass(Mapper.UserProjectMapper).singleton(),
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
           UserProjectModel : awilix.asValue(Database.UserProjectModel) 
        })

//App
//User management
container.register({
        _login : awilix.asClass(UserManagement.Login),
        _createUser : awilix.asClass(UserManagement.CreateUser),
        _deleteUser : awilix.asClass(UserManagement.DeleteUser),
        _editUser   : awilix.asClass(UserManagement.EditUser),
        _getUser   : awilix.asClass(UserManagement.GetUser),
        _listUser  : awilix.asClass(UserManagement.ListUser),
        _getUserByProject : awilix.asClass(UserManagement.GetUserByProject)
})
//Project management
container.register({
        _createProject : awilix.asClass(ProjectManagement.CreateProject),
        _deleteProject : awilix.asClass(ProjectManagement.DeleteProject),
        _editProject : awilix.asClass(ProjectManagement.UpdateProject),
        _listProject : awilix.asClass(ProjectManagement.ListProject),
        _addUser : awilix.asClass(ProjectManagement.AddUser),
        searchProject : awilix.asClass(ProjectManagement.SearchProject),
        _userSearchProject : awilix.asClass(ProjectManagement.UserSearchProject),
        _removeUser : awilix.asClass(ProjectManagement.RemoveUser),
        _getProjectByUser : awilix.asClass(ProjectManagement.GetProjectByUser)
})
// Label management
container.register({
        createLabel : awilix.asClass(LabelManagement.CreateLabel),
        deleteLabel : awilix.asClass(LabelManagement.DeleteLabel),
        editLabel   : awilix.asClass(LabelManagement.EditLabel),
        listLabel   : awilix.asClass(LabelManagement.ListLabel)
})
container.register({
        _importData : awilix.asClass(DatasetManagement.Import),
        listDocument : awilix.asClass(DatasetManagement.List),
        editDocument: awilix.asClass(DatasetManagement.Edit),
        deleteDocument : awilix.asClass(DatasetManagement.Delete),
        verifyDocument: awilix.asClass(DatasetManagement.Verify),
        searchDocument : awilix.asClass(DatasetManagement.Search)

})
module.exports = container;
