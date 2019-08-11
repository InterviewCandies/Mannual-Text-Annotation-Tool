import React, {Component} from 'react'
import {createProject} from '../../functions/project.function'
import {
   Button,
   ButtonGroup
} from 'reactstrap'
class CreateProjectForm extends Component {
    constructor(props){
        super(props)
        this.state={
            name : '',
            description : ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName=(e)=>{
        this.setState({
            name: e.target.value
        })
    }
    onChangeDescription=e=>{
        this.setState({
            description : e.target.value
        })
    }
    async onSubmit(e){
           e.preventDefault();
           const result =await createProject(this.state.name,this.state.description)
           if(result) return this.props.action()
    }
    render(){
        return (
            <form onSubmit={this.onSubmit}>
            <div class="form-group row">
              <label  for="projectname" class="col-sm-2 col-form-label">Name:</label>
              <div class="col-sm-10">
                <input type="text" 
                        className="form-control" 
                        id="projectname" 
                        value={this.state.name}
                        onChange={this.onChangeName}/>
              </div>
            </div>
            <div class="form-group row">
              <label for="Description" class="col-sm-2 col-form-label">Description:</label>
              <div class="col-sm-10">
              <input type="text" 
                     className="form-control" 
                     id="Description" 
                     value={this.state.description}
                     onChange={this.onChangeDescription}/>
              </div>
            </div>
            <div class="form-group row">
              <label for="file" class="col-sm-2 col-form-label">Dataset:</label>
              <div class="col-sm-10">
              <input type="file" 
                     
                     id="file" 
                    />
              </div>
            </div>
            <div className="float-right">
                <Button color="primary" onClick={this.props.toggle} type="submit">Submit</Button>{'   '}
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button> 
            </div>
                      
           
          </form>
        )
    }
}


export default CreateProjectForm;