const awilix = require('awilix')
const App = require('./application/App')
const Server = require('./infra/webserver/Server')
const Router = require('./infra/webserver/Router')
const Database = require('./infra/database')
const PasswordHasher = require('./infra/util/PasswordHasher')
const Project = require('./application/usecase/projectManagement')
const Gateway = require('./infra/gateway')
const Controller = require('./deliveries/Controller')
const config = require('./config')

const container = awilix.createContainer();

// System
container.register({
            app : awilix.asClass(App).singleton(),
            server : awilix.asClass(Server).singleton()
        })
        .register({
            router : awilix.asFunction(Router).singleton()
        })
        .register({
            config : awilix.asValue(config)
        })


//Ultility 
container.register({
            passwordHasher : awilix.asValue(PasswordHasher)
        })

//Application 
container.register({
    createProject : awilix.asClass(Project.CreateProject),
    deleteProject : awilix.asClass(Project.DeleteProject),
    updateProject : awilix.asClass(Project.UpdateProject),
    listProject : awilix.asClass(Project.ListProject)
})
/*
//Controller
container.register({
     projectController : awilix.asValue(Controller.ProjectController)
})
*/

//Gateway 
container.register({
    projectGateway : awilix.asClass(Gateway.ProjectGateway).singleton()
})

//Database 
container.register({
           database : awilix.asValue(Database.database),
           UserModel : awilix.asValue(Database.UserModel),
           LabelModel : awilix.asValue(Database.LabelModel),
           ProjectModel: awilix.asValue(Database.ProjectModel),
           UserProjectModel : awilix.asValue(Database.UserProjectModel) 
        })


module.exports = container;
