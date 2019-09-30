import React,{Component} from 'react' 
import {Doughnut,Bar, HorizontalBar} from 'react-chartjs-2'
import { getAllDocument } from '../../../functions/dataset.function'
import Spinner from '../../../component/Spinner/Spinner'
import  {CSVDownload,CSVLink} from 'react-csv'
import {
    CardBody,
    Card,
    CardHeader,
    Row,
    Col,
    Button
} from 'reactstrap'
import { listLabel } from '../../../functions/label.function'
import {  get } from '../../../functions/project.function'
import { getUser } from '../../../functions/user.function'
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
          this.projectId = localStorage.getItem('projectId')
          this.projectName = ''
          this.csvLink = React.createRef();
          this.labels=[]
          this.users =[]
       
     }
     countByLabel(labels,dataset=[]){
        let a=[]
        for(let i=0;i<labels.length;i++) a[ labels[i] ]=0

        for(let i =0;i<dataset.length;i++)
            dataset[i].labels.map(label=> a[label.content]+=1)
        let b=[]

        for(let i=0;i<labels.length;i++) b.push(a[ labels[i]])
        
        return b
     }
     countByUser(users,dataset=[],mistakes=0){
        let a=[]
        for(let i=0;i<users.length;i++) a[ users[i] ]=0

        for(let i =0;i<dataset.length;i++)
        if(dataset[i].status == mistakes) a[ dataset[i].user]+=1
        let b=[]

        for(let i=0;i<users.length;i++) b.push(a[ users[i]])
        
        return b
     }
     
     async componentDidMount(){
            
           const result = await getAllDocument(this.projectId)
           if(!result.response){
            const dataset = result.dataset 
            this.setState({ 
                    datasetSize  : result.size,
                    labeledDocs : result.labeled
                })
            //Pie chart 
            const pieData ={
                    datasets: [
                        {
                        data: [result.labeled,result.size-result.labeled],
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
            })
           
           // Bar chart 
           let labels = await listLabel(this.projectId)
           if(!labels.response){
            labels = labels.map(label => label.content)
            this.labels = labels
            this.setState({
                    labelsNumber : labels.length,
                    labelsCount : this.countByLabel(labels,dataset)
            })
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
            let project = await get(this.projectId)
            if(!project.response){
                let users = project.users
                this.projectName = project.project_name
                const usernames = users.map(user=>user.username)
                users = users.map(user=>user.id)
                this.users = usernames
                this.setState({
                    rightLabels : this.countByUser(users,dataset),
                    wrongLabels : this.countByUser(users,dataset,1)
                })
                const HorizontalBarData = {
                    datasets: [{
                        data: this.state.rightLabels,
                        backgroundColor: "#98fb98",
                        borderColor: "#0bcb0b",
                        borderWidth : 2,
                        label : 'Right annotation'
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
                        usersNumber : users.length
                    })
            }
           }
           this.setState({ 
               loading: false
            })
     }
     handleCsvExport = (e) =>{
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
            csvData.push([ this.users[i],rightLabels[i],wrongLabels[i]])
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