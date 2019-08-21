import React, { Component, lazy, Suspense } from 'react';
import faker from 'faker'
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { listDocument } from '../../functions/dataset.function';
import { listLabel } from '../../functions/label.function';
const LabelCard =props=>(
  <ButtonGroup className="mr-sm-2 mb-sm-2">
      <Button disabled  style={{background: props.label.backgroundColor, color:props.label.textColor}}>
          <i  className="fa fa-times-circle" > {props.label.content}</i>
      </Button>
      <Button  disabled>{props.label.shortcut}</Button>
  </ButtonGroup>
)



class UserDocument extends Component {
  constructor(props) {
    super(props);
    this.state={
          currentPage:1,
          size:0,
          document : {},
          labels:[]
    }
    this.projectId = localStorage.getItem('projectId')
  }
  async componentDidMount(){
          this.setState({
            labels : await listLabel(this.projectId) 
        })
        console.log(this.state.labels)
        const result = await listDocument(this.projectId,this.state.currentPage,1);
        if(result.size){
             this.setState({
                   document: result.dataset[0],
                   size : result.size
             })
        } 

  }
  onClick =async (e)=>{
        this.setState({
          currentPage : this.state.currentPage+await Number(e.target.value)
        })
        const result = await listDocument(localStorage.getItem('projectId'),this.state.currentPage,1);
        if(result.size){
             this.setState({
                   document: result.dataset[0]
             })
        } 

  }
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const {document,currentPage,size,labels} = this.state
    return (
      <div className="animated fadeIn">
         { 
           (document.content)?
            <div>
                <Progress className="m-lg-5" value={currentPage/ size *100}></Progress>
                <Card className="m-lg-5">
                  <CardHeader>
                    { (labels.length!=0)? labels.map(label=> <LabelCard label={label}></LabelCard>): <div></div> }
                  </CardHeader>
                  <CardBody>
                      <input className="border-0" type="text"></input>
                      <h4>{document.content}</h4>
                      
                  
                  </CardBody>
                </Card>
                <div className="d-flex flex-row justify-content-between">
                  {(currentPage!=1)?
                  <Pagination>
                    <PaginationItem>
                       <PaginationLink value="-1" onClick={this.onClick}>
                          <i className="fa fa-chevron-left"></i> Prev
                       </PaginationLink>
                    </PaginationItem>
                  </Pagination> : <div/>
                  }
                  {(currentPage !=this.state.size)?
                    <Pagination>
                      <PaginationItem>
                        <PaginationLink value="1" onClick={this.onClick}>
                          Next <i className="fa fa-chevron-right"></i> 
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>: <div/>
                  }
                </div>
                  
            </div>
            : <div className="animated fadeIn pt-1 text-center">(No document to show)</div>}
      </div>
    );
  }
}

export default UserDocument;
