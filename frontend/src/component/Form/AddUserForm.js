import React,{Component} from 'react'
import SearchBar from '../Searchbar/SearchBar';
import {
    Button,
    Alert,
    ButtonGroup
} from 'reactstrap'
import { getUser } from '../../functions/user.function';
import { addUser } from '../../functions/project.function';

const User = (props) =>(
      <div className="d-flex justify-content-between ">
          <p>{props.user.username}</p>     
          <p>{props.user.role}</p>
      </div>
)


class AddUserForm extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            user: {},
            message : '',
            color : ''
        }
    }
   onChange=async (e)=>{
        this.setState({
            username : e.target.value,
           
        })
   }
  
    onSubmit=async(e)=>{
        e.preventDefault()
        this.setState({
            user: await getUser(this.state.username),
            username : ''
        })
        if(this.state.user.id){
            const result = await addUser(this.state.user.id,this.props.project.id);
            if(!result.message) this.setState({ message:'User has been added to this project',color:'text-success'})
            else this.setState({ message:result.message,color:'text-warning'})
        }
        else this.setState({ message:'User does not exist. Please try again',color:'text-danger'})
    
    }
  
    display=(e)=>{
     
      return(
          <div className="d-block">
               <h6 className={this.state.color}>{this.state.message}</h6>
          </div>
      )
      
   }
   render(){
       return(
           <div>
               <form className="d-flex flex-column" onSubmit={this.onSubmit} >
                   <div className="p-2">
                   <ButtonGroup style={{width:'100%'}}>
                        <input className="form-control " 
                               type="text" 
                               placeholder="Search..." 
                               value={this.state.username}
                               onChange={this.onChange}
                        >
                        </input>
                   </ButtonGroup>
                   </div>
                   <div className="p-2">
                        {this.display()}
                   </div>
                   
                   <div className="d-flex justify-content-end">
                       <Button color="primary" type="submit" style={{marginRight:'5px'}} >Add</Button>
                       <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                   </div>
               </form>
           </div>
       )
   }
}

export default AddUserForm