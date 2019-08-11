import React,{Component} from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,ModalFooter
} from 'reactstrap'
import { deleteProject } from '../../functions/project.function';
class DangerModal extends Component{
    constructor(props){
        super(props)
        this.toggleDanger = this.props.toggle.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    async onClick(e){
          if(this.props.subject =="PROJECT"){
               await deleteProject(this.props.id);
               this.action =this.props.action();
          }
          
          return this.toggleDanger()
           
    }
      render(){
          return(
              <div>
                <Modal isOpen={this.props.trigger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>{this.props.title}</ModalHeader>
                  <ModalBody>
                        {`DO YOU REALLY WANT TO DELETE THIS ${this.props.subject} ?`}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.onClick}>YES</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDanger}>NO</Button>
                  </ModalFooter>
                </Modal>

              </div>
          )
      }
}


export default DangerModal