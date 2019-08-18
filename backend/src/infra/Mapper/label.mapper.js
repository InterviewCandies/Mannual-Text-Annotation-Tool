const Label = require('../../domain/Label')

module.exports =class LabelMapper {
    constructor(){

    }
    toEntity(data) {
        const {_id,project_id,content,shortcut,backgroundColor,textColor,created_at,updated_at} = data
        return new Label(_id,project_id,content,shortcut,backgroundColor,textColor,created_at,updated_at);
    }
    toDatabase(data){
        const {project_id,content,shortcut,backgroundColor,textColor} = data
        const label = {
            project_id : project_id,
            content : content,
            shortcut : shortcut,
            backgroundColor : backgroundColor,
            textColor : textColor,
            updated_at : Date.now()
        }
        return label
    }
    
}