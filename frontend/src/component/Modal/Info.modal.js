import React,{Component} from 'react'
import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader
} from 'reactstrap'
class InfoModal extends Component{
    constructor(props){
        super(props);
       this.toggle = this.props.toggle.bind(this);   
    }
    
       render(){
           return(
                <Modal isOpen={this.props.trigger} toggle={this.toggle}
                    className={'modal-info ' + this.props.className}>
                <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
                <ModalBody>
                     {React.cloneElement(this.props.children, { toggle: this.toggle })}
                </ModalBody>
               
               </Modal>

           )
       }
}

export default InfoModal