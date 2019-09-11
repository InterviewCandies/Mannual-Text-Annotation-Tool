import React,{Component} from 'react' 
import {Doughnut,Bar} from 'react-chartjs-2'
import { listDocument } from '../../../functions/dataset.function'
import Spinner from '../../../component/Spinner/Spinner'
import {
    CardBody,
    Card,
    CardHeader,
    Row,
    Col
} from 'reactstrap'
import { listLabel } from '../../../functions/label.function'
import {  get } from '../../../functions/project.function'
class Statistics extends Component {
     constructor(props){
          super(props)
          this.state={
                pieData: {},
                barData: {},
                datasetSize : 0,
                labelsNumber:0,
                usersNumber:0,
                loading : true
          }
          this.projectId = localStorage.getItem('projectId')
       
     }
     countByLabel(labels,dataset){
        let a=[]
        for(let i=0;i<labels.length;i++) a[ labels[i] ]=0

        for(let i =0;i<dataset.length;i++)
            dataset[i].labels.map(label=> a[label.content]+=1)
        let b=[]

        for(let i=0;i<labels.length;i++) b.push(a[ labels[i]])
        
        return b
     }
     async componentDidMount(){
            
           const result = await listDocument(this.projectId)
           const dataset = result.dataset 
           this.setState({ 
                datasetSize  : result.size
            })
           //Pie chart 
           const pieData ={
                datasets: [{
                data: [result.labeled,result.size],
                backgroundColor : ['#63c2de','#f86c6b']
                }],
                labels: [
                    'Labeled',
                    'Unlabeled'
                ]
           }
           // Bar chart 
           let labels = await listLabel(this.projectId)
           labels = labels.map(label => label.content)
           this.setState({
                labelsNumber : labels.length
           })
           const barData = {
            datasets: [{
                data: this.countByLabel(labels,dataset),
                backgroundColor : '#4dbd74',
                label : 'Labels'
            }],
            labels: labels
           }
           this.setState({
               pieData : pieData,
               barData : barData
           })
           let project = await get(this.projectId)
           const users = project.users
           this.setState({ 
               usersNumber : users.length,
               loading: false
            })
     }
     render(){
           const {datasetSize,labelsNumber,usersNumber} = this.state
           return(
                <div>
                    {this.state.loading?<Spinner content="Charts"></Spinner>:
                                       <div>
                                           <Row className="mt-sm-3">
                                               <Col xs="16" sm="8" lg="4">
                                                 <Card className="text-white bg-primary">
                                                    <CardBody>
                                                        <div className="text-value">{datasetSize}</div>
                                                        <p>Documents</p>
                                                    </CardBody>
                                                 </Card>
                                               </Col>
                                               <Col xs="16" sm="8" lg="4">
                                                 <Card className="text-white bg-warning">
                                                    <CardBody>
                                                        <div className="text-value">{labelsNumber}</div>
                                                        <p>Labels</p>
                                                    </CardBody>
                                                 </Card>
                                               </Col>
                                               <Col xs="16" sm="8" lg="4">
                                                 <Card className="text-white bg-danger">
                                                    <CardBody>
                                                        <div className="text-value">{usersNumber}</div>
                                                        <p>Users</p>
                                                    </CardBody>
                                                 </Card>
                                               </Col>
                                           </Row>
                                           <Card>
                                                <CardHeader>Documents</CardHeader>
                                                <CardBody>
                                                    <Doughnut data={this.state.pieData}
                                                              options={{  
                                                                responsive :true,
                                                                maintainAspectRatio: false,
                                                               }} 
                                                               width="300" 
                                                               height="300">   
                                                    </Doughnut>
                                                </CardBody>
                                           </Card>
                                           <Card>
                                                <CardHeader>Labels</CardHeader>
                                                <CardBody>
                                                    <Bar data ={this.state.barData}
                                                        options={ {
                                                            responsive : true,
                                                            maintainAspectRatio: false,
                                                            scales: {
                                                                yAxes: [
                                                                        {
                                                                            ticks: {
                                                                            min: 0,
                                                                            max: datasetSize
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                        }}
                                                        width="500" 
                                                        height="500">
                                                    </Bar>
                                                </CardBody>
                                            </Card>
                                    </div>
                    }
                </div>
           )
     }
}
export default Statistics