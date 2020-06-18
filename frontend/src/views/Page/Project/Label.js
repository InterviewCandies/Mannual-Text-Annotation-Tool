import React,{Component} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    ButtonGroup,
} from 'reactstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createLabel, listLabel } from '../../../functions/label.function';
import EditLabelModal from '../../../component/Modal/EditLabelModal';

class LabelTag extends Component{
      constructor(props){
        super(props)
        this.state={
            edit:false
        }
      }
      onEdit= () => {
          this.setState(prevState => ({
              edit : !prevState.edit
          }))
      }

      render(){
          const { backgroundColor,textColor,id,content,shortcut,project_id } = this.props;
          const label ={ 
                id : id,
                project_id:project_id,
                backgroundColor:backgroundColor,
                textColor:textColor,
                content:content,
                shortcut:shortcut
          }
          return(
            <ButtonGroup className="mr-sm-2 mb-sm-2">
            <Button  style={{background:backgroundColor, color:textColor}} onClick={this.onEdit}>
                <i  className="fa fa-times-circle"> {content}</i>
            </Button>
            <EditLabelModal trigger={this.state.edit}
                            toggle={this.onEdit}
                            label={label}
                            action={this.props.action}>

            </EditLabelModal>
         
            <Button  disabled>{shortcut}</Button>
            
            </ButtonGroup>
          )
      }
    
}

class Label extends Component{
    constructor(props){
        super(props)
        this.state = {
            content : '',
            shortcut : '',
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            labels: []
       }
    }
    async componentDidMount() {
        this.setState({
            labels : await listLabel(this.props.match.params.id)
        });
    }

    onChange = async(e) => {
        this.setState({
            labels : await listLabel(this.props.match.params.id) 
        });
    }

    onChangeContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    onChangeShortcut = (e) => {
        this.setState({
           shortcut : e.target.value
        })
    }
    onChangeBackgroundColor = (e) => {
        this.setState({
            backgroundColor : e.target.value
        })
    }
    onChangeTextColor = (e) => {
        this.setState({
           textColor : e.target.value
        })
    }
   
    onSubmit = async(e) => {
        e.preventDefault();
        const { content, shortcut, backgroundColor, textColor } = this.state;
        if(content === '') {
              toast.warn('Warning: Label\'s content is required');
              return;

        }
        await createLabel(this.props.match.params.id,content,shortcut,backgroundColor,textColor);
        this.setState({
            content:'',
            shortcut:'',
            backgroundColor: '#FFFFFF',
            textColor: '#000000'
        })
        this.onChange();
        
    }
    onReset = async(e) => {
        e.preventDefault();
        this.setState({
            content:'',
            shortcut:'',
            backgroundColor: '#FFFFFF',
            textColor: '#000000'
        })
    }
  
    render(){
        return(
            <div>
           
            <Card className="m-sm-5">
                <CardHeader>
                    <h5>Label editor</h5>
                </CardHeader>
                <CardBody>
                 <div className="d-flex flex-row flex-wrap">
                        {this.state.labels.map((label,i)=>{ 
                            return <LabelTag content={label.content} 
                                            shortcut={label.shortcut}
                                            backgroundColor={label.backgroundColor}
                                            textColor={label.textColor}
                                            id={label.id}
                                            project_id={this.props.match.params.id}
                                            action={this.onChange}>
                                            
                                    </LabelTag>
                        }
                        )}
                </div>
                <hr></hr>
                <form onSubmit={this.onSubmit}>

                        <div class="form-group row">
                            <label  for="content" class="col-sm-3 col-form-label"><strong>Preview:</strong></label>
                             <div className="col-sm-5">
                                <LabelTag   content={this.state.content} 
                                            id={this.state.content}
                                            shortcut={this.state.shortcut}
                                            backgroundColor={this.state.backgroundColor}
                                            textColor={this.state.textColor}
                                ></LabelTag>
                            </div>
                        
                        </div>
                 
                        <div class="form-group row">
                            <label  for="content" class="col-sm-3 col-form-label"><strong>Content:</strong></label>
                            <div class="col-sm-8">
                                <input type="text" 
                                        className="form-control" 
                                        id="content" 
                                        value={this.state.content}
                                        onChange={this.onChangeContent}/>
                            </div>
                        </div>
                        <div class="form-group row">
                        <label  for="shortcut" class="col-sm-3 col-form-label"><strong>Shortcut:</strong></label>
                        <div class="input-group col-sm-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="shortcut">@</span>
                            </div>
                                <input type="text" class="form-control" value={this.state.shortcut} onChange={this.onChangeShortcut}/>
                        </div>
                        </div>
                        <div class="form-group row">
                        <label  for="color" class="col-sm-3 col-form-label" ><strong>Background:</strong></label>
                        <div class="col-sm-9">
                                <input type="color" value={this.state.backgroundColor} className="form-control col-sm-5" onChange={this.onChangeBackgroundColor}></input>
                            </div>
                        </div>
                        <div class="form-group row">
                        <label  for="color" class="col-sm-3 col-form-label"><strong>Text color:</strong></label>
                        <div class="col-sm-9">
                                <input type="color"  value={this.state.textColor} className="form-control col-sm-5" onChange={this.onChangeTextColor}></input>
                            </div>
                        </div>   
                        </form>
                        <Button color="info"  onClick={this.onSubmit}>Add</Button>{'   '}
                        <Button color="secondary" onClick={this.onReset} >Reset</Button>
                
                </CardBody>
                
            </Card>
            </div>
           
        )
    }
}

export default Label