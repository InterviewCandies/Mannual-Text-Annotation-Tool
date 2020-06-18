import React,{Component} from 'react'
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button
} from 'reactstrap'
import UserDatasetTable from '../Table/DatasetByUser/UserDatasetTable'
class UserRecordModal extends Component{
    constructor(props){
        super(props)
        this.toggle = this.props.toggle;
    }
    render(){
        return (
            <Modal isOpen={this.props.trigger} toggle={this.toggle} 
                className={'modal-xl modal-success ' + this.props.className} >
                <ModalHeader toggle={this.toggle}>{`Documents annotated by ${this.props.username}`}</ModalHeader>
                <ModalBody>
                    <UserDatasetTable projectId={this.props.projectId} 
                                      userId={this.props.userId}
                                      maxDocs={this.props.maxDocs}></UserDatasetTable>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

        )
    }
}

export default UserRecordModal