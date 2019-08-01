const UserModal = require('../database/user.modal');
const User = require('../../domain/User')
const PasswordHasher = require('../util/PasswordHasher')
const IDChecker = require('./IDChecker')
const mongoose = require('mongoose');
class UserGateway {
    
    async findByUsername(userInfo){
        const {username,password} = userInfo;
        const result = await UserModal.findOne({username:username});
        if(!PasswordHasher.isMatched(password,result.password)) return {};
        const user = new User(result._id,result.username,result.password,result.created_at,result.updated_at);
        return user;
      
    }
    async createUser(userInfo) {
        let {username,password,role} = userInfo;
        password = PasswordHasher.hash(password);
        const user = {
             username : username,
             password : password,
             role: role
        }
        const result = await UserModal.insertMany(user);
        return result;
    }
    async deleteUser(userInfo){
        const {id} = userInfo;
        if ( IDChecker(id) ) return {};
        const result =await UserModal.deleteOne({_id:id});
        return result;
    }
}

module.exports = UserGateway;