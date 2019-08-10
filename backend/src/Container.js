const awilix = require('awilix')
const App = require('./application/App')
const Server = require('./infra/webserver/Server')
const Router = require('./infra/webserver/Router')
const userRouter = require('./infra/webserver/User')
const projectRouter = require('./infra/webserver/Project')
const Database = require('./infra/database')
const config = require('./config')
const Controller = require('./deliveries/Controller')
const Gateway = require('./infra/gateway')
const UserManagement = require('./application/usecase/userManagement')
const ProjectManagement = require('./application/usecase/projectManagement')
const container = awilix.createContainer();
const Authentication= require('./infra/util/authentication')
const PasswordHasher = require('./infra/util/PasswordHasher')
const Sequelizer = require('./infra/sequelizer')
// System
container.register({
            app : awilix.asClass(App).singleton(),
            server : awilix.asClass(Server).singleton()
        })
        .register({
            router : awilix.asFunction(Router).singleton(),
            userRouter: awilix.asFunction(userRouter).singleton(),
            projectRouter: awilix.asFunction(projectRouter).singleton()
        })
        .register({
            config : awilix.asValue(config)
        })

//Controller 
container.register({
        userController : awilix.asClass(Controller.UserController).singleton(),
        projectController : awilix.asClass(Controller.ProjectController).singleton()
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

//Sequelizer 
container.register({
        userSequelizer : awilix.asClass(Sequelizer.UserSequelizer).singleton(),
        projectSequelizer : awilix.asClass(Sequelizer.ProjectSequelizer).singleton(),
        userProjectSequelizer : awilix.asClass(Sequelizer.UserProjectSequelizer).singleton()
})

//Gateway
container.register({
        userGateway : awilix.asClass(Gateway.UserGateway).singleton(),
        projectGateway :awilix.asClass(Gateway.ProjectGateway).singleton(),
        labelGateway : awilix.asClass(Gateway.LabelGateway).singleton()
})

//Database 
container.register({
           database : awilix.asValue(Database.database),
           UserModel : awilix.asValue(Database.UserModel),
           LabelModel : awilix.asValue(Database.LabelModel),
           ProjectModel: awilix.asValue(Database.ProjectModel),
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
        _removeUser : awilix.asClass(ProjectManagement.RemoveUser),
        _getProjectByUser : awilix.asClass(ProjectManagement.GetProjectByUser)
})

module.exports = container;
