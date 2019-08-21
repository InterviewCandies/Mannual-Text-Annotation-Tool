import React,{Component} from 'react'
import DatasetTable from '../../../component/Table/Dataset/DatasetTable';

class Dataset extends Component{
      constructor(props){
          super(props)
      }
      render(){
          return(
              <DatasetTable projectId={this.props.match.params.id}></DatasetTable>
          )
      }
}

export default Dataset