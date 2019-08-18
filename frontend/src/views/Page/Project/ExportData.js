import React,{Component} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Container
} from 'reactstrap'
import navigation from '../../../navRoutes/ProjectNav';
import SideBar from '../../../component/SideBar/SideBar'
class ExportData extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
           
            <Card className="m-sm-5" >
                <CardHeader>
                    <h5>Export Dataset</h5>
                </CardHeader>
                <CardBody>
                    <strong>There are two data format you can download. the CSV and JSON</strong>
                   
                    <br></br>
                   
                    <div className="mt-sm-5">
                        <Button color="primary"  >Download CSV file</Button>{' '}
                        <Button color="primary">Download JSON file</Button>
                    </div>
                </CardBody>
            </Card>
            
               
            
        )
    }
} 

export default ExportData