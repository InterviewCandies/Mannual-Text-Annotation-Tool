const moogose = require('mongoose');

module.exports = class UserProjectSequelizer{
       toDatabase(data){
         const {user_id,project_id} = data;
         return {
              user_id : user_id,
              project_id : project_id
         } 
       } 
       joinUser(data){
           const {project_id} =data
           const id = moogose.Types.ObjectId(project_id);
           return [
               {
                   $match:{
                       project_id: id
                   }
               },
               {
                    $lookup:
                    {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        
                        as: "users"
                    }
               },
               { $unwind: {path :"$users"} },
               {
                   $project: {
                       "_id" : 0,
                       "created_at" : 0,
                       "updated_at" : 0,
                       "project_id" : 0,
                       "user_id" : 0,
                       "__v" : 0,
                       
                   }
               },
               { $replaceRoot: { newRoot: "$users" } }
           
           ]
       }
       joinProject(data){
        const {user_id} =data
        const id = moogose.Types.ObjectId(user_id);
        return [
            {
                $match:{
                   user_id: id
                }
            },
            {
                 $lookup:
                 {
                     from: "projects",
                     localField: "project_id",
                     foreignField: "_id",
                     
                     as: "projects"
                 }
            },
            { $unwind: {path :"$projects"} },
            {
                $project: {
                    "_id" : 0,
                    "created_at" : 0,
                    "updated_at" : 0,
                    "project_id" : 0,
                    "user_id" : 0,
                    "__v" : 0,
                    
                }
            },
            { $replaceRoot: { newRoot: "$projects" } }
        
        ]
    }
}