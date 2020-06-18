import React, { Component} from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Container,
} from 'reactstrap';
import { annotate, getDocument } from '../../functions/dataset.function';
import { listLabel } from '../../functions/label.function';
import { get } from '../../functions/project.function';
import Spinner from '../../component/Spinner/Spinner';
import NoRecord from '../Page/NoRecord/NoRecord';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class LabelCard  extends Component{
  onClick = (e) => {
       e.preventDefault();
       this.props.action(e,this.props.label)
  }
  render(){
    const {textColor,backgroundColor,shortcut,content} = this.props.label
    return(
      <ButtonGroup className="mr-sm-2 mb-sm-2">
        <Button  style={{background:backgroundColor, color:textColor}}>
            <i className="fa fa-times-circle" onClick={this.onClick} > {content}</i>
        </Button>
        <Button  disabled>{shortcut}</Button>
     </ButtonGroup>
    )
  }
  
}

let map= {};

class UserDocument extends Component {
  constructor(props) {
    super(props);
    this.state={
          size:0,
          doc : {},
          labels:[],
          labelList:[],
          labeled:0,
          map:{},
          loading : false
    }
    this.projectId = localStorage.getItem('projectId')
    document.onkeydown = document.onkeyup = this.onKeyPress;
  }
  async componentDidMount() {
          this.setState({
            labels : await listLabel(this.projectId) 
        })
        const project = await get(this.projectId)
        this.projectName = project.project_name
        
        const result = await getDocument(this.projectId)
        this.setState({
               size : result.size,
               labeled : result.labeled
        })
       
        if(result.labeled != result.size){
             this.setState({
                   doc: result.dataset[0],
                   labelList: result.dataset[0].labels,
             })
        } 
       this.setState({
           loading:true
       })
  }
  onClick =async () => {
       
        const { id } = this.state.doc;
        if (!id) return ;
        let result =await annotate(id,this.state.labelList) 
        if(result.response) {
          if(result.response.status === 400) toast.warn('Warning: ' +result.response.data.message)
        }
        
        document.getElementById('spinner').style.display='flex'
        document.getElementById('card').style.display='none'
        document.getElementById('next').style.visibility='hidden'

        result = await getDocument(this.projectId);

        document.getElementById('spinner').style.display='none'
        document.getElementById('card').style.display='flex'
        document.getElementById('next').style.visibility='visible'

        this.setState({
          size : result.size,
          labeled : result.labeled
        })
       
        if(result.labeled != result.size){
             this.setState({
                   doc: result.dataset[0],
                   labelList : result.dataset[0].labels,
             })
        } 
        else this.setState({ labelList: [], doc:{} });
  }
  onLabelClick =(e , label)=>{
     let {labelList} = this.state
     const i = labelList.find((l)=> l.content == label.content)
     if(!i)  labelList.push(label)
     this.setState({
          labelList: labelList
     });
  }
  onChange= (e) => {
      e.preventDefault();
      let shortcut =e.target.value;
      let { labelList } = this.state;
    
      let label = this.state.labels.find(label=> label.shortcut === shortcut)
      const i =label? labelList.find((l) => l.content == label.content):undefined;
      if(label && !i ) labelList.push(label);
      this.setState({
           labelList : labelList,
           shortcut:shortcut
      });
  }
  
  onRemoveLabel =(e,label) =>{
     let {labelList} = this.state;
     let i = labelList.indexOf(label);
     if(i !== -1) labelList.splice(i, 1);
     this.setState({
        labelList: labelList
     });
  }
    onKeyPress = (e)=>{
      e = e || window.event; 
      map[e.keyCode] = e.type === 'keydown';
      if(map[39]|| map[13]) {
        e.target.value=1
        this.onClick(e)
      }
      else {
            const { labels } =this.state;
              for(let i= 0;i<labels.length;i++) {
                let s = labels[i].shortcut;
                let code = true;
                for(let j=0; j<s.length; j++, code++)
                    if( !map[ s.toUpperCase().charCodeAt(j) ] ) {
                          code = false;
                        break;
                    }
                if(code && s) { 
                  e.target.value = s; 
                  this.onChange(e);
                } 
            }
        }
    }     
  

  render() {
    
    const {doc,size,labels,labelList,labeled} = this.state
    return (
        <div>
          <div>{this.state.loading?  
            <div>
                  <Container fluid className="m-lg-5">
                  <div class="callout callout-primary lead">
                    <div>Project: <strong>{this.projectName}</strong></div>
                    <div>{`Labels: ${labels.length}`}</div>
                    <div>{`Documents: ${size}`}</div>
                    <div>{`Labeled documents: ${labeled}/${size}`}</div>
                  </div>  
                  </Container>
             { (labeled !== size)?
                 <div> 
                  <div id="spinner" style={{display:'none'}}>
                      <Spinner content='document'></Spinner>
                  </div>
                  
                  <Card className="m-lg-5" id="card">
                    <CardHeader >
                      { (labels.length)? labels.map((label,i)=> <LabelCard label={label} action={this.onLabelClick} key={i}></LabelCard>): <div></div> }
                    </CardHeader>
                    <CardBody>
                        {
                          (labelList.length)? labelList.map((label,i)=><LabelCard label={label} action={this.onRemoveLabel} key={i}></LabelCard>) : <div></div>
                        }
                        <h4>{doc.content}</h4>
                        
                    </CardBody>
                  </Card>
                  <div className="d-flex flex-row justify-content-center "  >
                        <Button color="primary"  
                                id = "next"
                                className="mb-sm-2 btn btn-primary btn-lg" 
                                onClick={this.onClick} 
                                style={{width:'10%'}}>
                                Next  <i className="fa fa-forward"></i> 
                        </Button>
                  </div>     
              </div>
          : <NoRecord content="document"></NoRecord> } </div> : <Spinner content='document'></Spinner>}</div> 
        </div>
    );
  }
}

export default UserDocument;
