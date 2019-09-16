import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { createProject } from '../../functions/project.function';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class CreateProjectModal extends Component{
    constructor(props){
        super(props);
        this.state = {
             name : '',
             description : ''
        }
        this.onToggle = this.props.toggle
    }
 

    onChangeName=(e)=>{
        this.setState({
            name : e.target.value
        })
       
    }
    onChangeDescription=(e)=>{
        this.setState({
            description : e.target.value
        })
      
    }
    onSubmit = async (e)=>{
        e.preventDefault()
      
        const {name,description} =this.state
        if(name ==='') { 
            return toast('Error: Project\'s name is required');
        }
        const result =await createProject(name,description)
        this.setState({
            name:'',
            description:''
        })
        if(result) toast.success('Project has been added')
        else toast.error('Error: Failed to create project')
        this.onToggle()
        this.props.action()
    }
       render(){
           return(
               <div>
                <Modal isOpen={this.props.trigger} toggle={this.onToggle}
                    className={'modal-success ' + this.props.className} onClick={(e)=>e.stopPropagation()}>
                <ModalHeader toggle={this.onToggle}>Create new project</ModalHeader>
                <ModalBody>
                  <form>
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
                    
                    </form>
                   
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.onSubmit}>Create</Button>{' '}
                    <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                  </ModalFooter>
               </Modal>
            </div>
           )
       }
}

export default CreateProjectModal