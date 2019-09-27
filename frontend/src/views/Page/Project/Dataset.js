import React,{Component} from 'react'
import DatasetTable from '../../../component/Table/Dataset/DatasetTable';
import { get } from '../../../functions/project.function';

class Dataset extends Component{
      constructor(props){
          super(props)
          this.state={
              users: []
          }
      }
      async componentDidMount(){
           const project = await get(this.props.match.params.id)
           const users = project.users
           this.setState({
               users
           })
      }
      render(){
          return(
              <DatasetTable projectId={this.props.match.params.id} users={this.state.users}></DatasetTable>
          )
      }
}

export default Dataset