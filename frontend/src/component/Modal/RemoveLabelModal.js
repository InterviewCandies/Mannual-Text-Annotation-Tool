import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
import { removeLabel } from '../../functions/label.function';
class RemoveLabelModal extends Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.data.id,
            label : '',
            labels:this.props.labels
        }
       this.toggle = this.props.toggle  
    }
    onChange=(e)=>{
         console.log(e.target.value)
         this.setState({
             label : e.target.value
         })
    }
    onClick =async (e)=>{
        await removeLabel(this.state.label)
        this.props.action()
        this.toggle()
    }
    
    async componentDidUpdate(oldProps){
        const props = this.props
        if(oldProps.labels!=props.labels) {
           this.setState({
             id : props.data.id,
              labels : props.labels
           })
        }
      
    }
    
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.toggle}
                    className={'modal-danger ' + this.props.className}>
                <ModalHeader toggle={this.toggle}>Remove label</ModalHeader>
                <ModalBody>
                    <select class="custom-select" onChange={this.onChange}>
                    <option selected>Choose...</option>
                      {this.state.labels.map((label)=><option value={label.id}>{label.content}</option>)}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onClick}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
               
               </Modal>

           )
       }
}

export default RemoveLabelModal