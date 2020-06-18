import React,{Component} from 'react' 
import {Doughnut,Bar, HorizontalBar} from 'react-chartjs-2'
import Spinner from '../../../component/Spinner/Spinner'
import  { CSVLink } from 'react-csv'
import {
    CardBody,
    Card,
    CardHeader,
    Row,
    Col,
} from 'reactstrap'
import { getStatistics } from '../../../functions/project.function'
class Statistics extends Component {
     constructor(props){
          super(props)
          this.state={
                pieData: {},
                barData: {},
                HorizontalBarData: {},
                datasetSize : 0,
                labelsNumber:0,
                usersNumber:0,
                labeledDocs : 0,
                csvData: [],
                labelsCount : [],
                rightLabels : [],
                wrongLabels : [],
                loading : true
          }
          this.projectId = localStorage.getItem('projectId');
          this.projectName = '';
          this.csvLink = React.createRef();
          this.labels = [];
          this.users = [];
       
     }
     
     async componentDidMount(){
            
           const result = await getStatistics(this.projectId)
           if(!result.response){
             const { 
                project,
                datasetSize,
                labeledDocs,
                labelsCount,
                rightLabels,
                wrongLabels
             } = result; 
             let { users, labels } = result;
             this.setState({
                 datasetSize,
                 labeledDocs,
                 labelsCount,
                 labelsNumber : labels.length,
                 usersNumber : users.length,
                 rightLabels,
                 wrongLabels
             });
            //Pie chart 
            const pieData ={
                    datasets: [
                        {
                        data: [labeledDocs,datasetSize - labeledDocs],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 0, 0, 1)'],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(192, 0, 0, 0.2)']                        }
                     ],
                    labels: [
                        'Labeled',
                        'Unlabeled'
                    ]
            }
            this.setState({
                pieData
            });
           
           // Bar chart 
           if(!labels.response){
            labels = labels.map(label => label.content)
            this.labels = labels
            
            const barData = {
                datasets: [{
                    data: this.state.labelsCount,
                    backgroundColor : '#ffff9a',
                    borderColor : '#ffc001',
                    borderWidth : 2,
                    label : 'Labels'
                }],
                labels: labels
            }
            this.setState({
                barData
            })
           }
           //Horizontal data 
                this.projectName = project.project_name
                const usernames = users.map(user=>user.username)
                users = users.map(user=>user.id)
                this.users = usernames
               
                const HorizontalBarData = {
                    datasets: [{
                        data: this.state.rightLabels,
                        backgroundColor: "#98fb98",
                        borderColor: "#0bcb0b",
                        borderWidth : 2,
                        label : 'Correct annotation'
                    },{
                        data : this.state.wrongLabels,
                        backgroundColor: "rgba(206, 0, 0, 0.4)",
                        borderColor: "rgba(206, 0, 0, 1)",
                        borderWidth : 2,
                        label : 'Wrong annotation'
                    }],
                    labels: usernames
                    }
                    this.setState({
                        HorizontalBarData,
                    })
           }
           this.setState({ 
               loading: false
            });
     }
     handleCsvExport = () =>{
        const {datasetSize,labeledDocs,labelsNumber,usersNumber,labelsCount,rightLabels,wrongLabels} = this.state
        const csvData = [
                ['Project' , this.projectName] ,
                ['Total documents', datasetSize],
                ['Total labels' , labelsNumber],
                ['Total users', usersNumber],
                [''],
                ['Documents'],
                ['Labeled documents', labeledDocs],
                [ 'Unlabeled documents', datasetSize - labeledDocs]
        ]
        csvData.push([''])
        if(this.labels.length) csvData.push(['Labels'])
        for(let i =0; i< this.labels.length; i++) 
            csvData.push([this.labels[i],labelsCount[i]])
        csvData.push([''])
        if(this.users.length) csvData.push(['Users','Valid annotation','Invalid annotation'])
        for(let i =0; i< this.users.length; i++) 
            csvData.push([ this.users[i], rightLabels[i], wrongLabels[i]])
        this.setState({
            csvData
        })
     }
     render(){
           const {datasetSize,labelsNumber,usersNumber} = this.state
           return(
                <div>
                    {this.state.loading?<Spinner content="charts"></Spinner>:
                                       <div>
                                           <Row className=" mr-sm-2 mt-sm-3 justify-content-end">
                                               <CSVLink
                                                    data={this.state.csvData}
                                                    filename={this.projectId+'.csv'}
                                                    className="hidden"
                                                    target="_blank" 
                                                    asyncOnClick={true}
                                                    style={{textDecoration: 'none'}}
                                                    onClick={(event, done) => {
                                                        this.handleCsvExport();
                                                        done();
                                                     }}>       
                                                    <div><i className="fa fa-download"></i>  <strong>Download report</strong></div>
                                                </CSVLink> 
                                           </Row>
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
                                                        >
                                                    </Bar>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardHeader>Users</CardHeader>
                                                <CardBody>
                                                    <HorizontalBar data ={this.state.HorizontalBarData}
                                                        options={ {
                                                            responsive :true,
                                                            maintainAspectRatio: false,
                                                            scales: {
                                                                xAxes: [{
                                                                  stacked: true
                                                                }],
                                                                yAxes: [{
                                                                  stacked: true
                                                                }]
                                                              }
                                                        }}                                                    
                                                      >
                                                    </HorizontalBar>
                                                </CardBody>
                                            </Card>
                                    </div>
                    }
                </div>
           )
     }
}
export default Statistics