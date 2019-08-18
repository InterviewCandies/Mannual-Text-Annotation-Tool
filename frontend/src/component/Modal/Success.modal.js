import React,{Component} from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
 } from 'reactstrap'


class SuccessModal extends Component{
        constructor(props){
            super(props)
            this.state={
                success: true
            }
        }
        toggleSuccess=(e)=>{
                this.setState({
                    success:!this.state.success
                })
        }
        render(){
            return(
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                className={'modal-success ' + this.props.className}>
                    <ModalHeader toggle={this.toggleSuccess}>Modal title</ModalHeader>
                    <ModalBody>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggleSuccess}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }
}


export default SuccessModal