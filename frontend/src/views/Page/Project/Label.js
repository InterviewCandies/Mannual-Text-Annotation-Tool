import React,{Component} from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    ButtonGroup,
    Container
} from 'reactstrap'
import { createLabel, listLabel, removeLabel } from '../../../functions/label.function';

const LabelCard =props=>(
    <div class="input-group col mb-sm-1">
        <Button disabled  style={{background: props.backgroundColor, color:props.textColor}}>
            <i  className="fa fa-times-circle" onClick={async (e)=>{ await removeLabel(props.id) }}> {props.content}</i>
        </Button>
        <div class="input-group-append">
            <Button  disabled>{props.shortcut}</Button>
        </div>
    </div>
)
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
    onChangeContent=(e)=>{
        this.setState({
            content: e.target.value
        })
    }
    onChangeShortcut=(e)=>{
        this.setState({
           shortcut : e.target.value
        })
    }
    onChangeBackgroundColor=(e)=>{
        this.setState({
            backgroundColor : e.target.value
        })
    }
    onChangeTextColor=(e)=>{
        this.setState({
           textColor : e.target.value
        })
    }
   
    onSubmit = async (e)=>{
        e.preventDefault()
        const {content,shortcut,backgroundColor,textColor} = this.state
        await createLabel(this.props.match.params.id,content,shortcut,backgroundColor,textColor)
        this.setState({
            content:'',
            shortcut:'',
            backgroundColor: '#FFFFFF',
            textColor: '#000000'
        })
        
    }
    onReset = async(e) =>{
        e.preventDefault()
        this.setState({
            content:'',
            shortcut:'',
            backgroundColor: '#FFFFFF',
            textColor: '#000000'
        })
    }
    async componentDidMount(){
            this.setState({
                labels : await listLabel(this.props.match.params.id) 
            })
    }
    async componentDidUpdate(){
        this.setState({
            labels : await listLabel(this.props.match.params.id) 
        })
    }
    render(){
        return(
           
            <Card className="m-sm-5">
                <CardHeader>
                    <h5>Label editor</h5>
                </CardHeader>
                <CardBody>
                 <div className="row">
                        {this.state.labels.map((label,i)=>{ 
                            return <LabelCard content={label.content} 
                                            shortcut={label.shortcut}
                                            backgroundColor={label.backgroundColor}
                                            textColor={label.textColor}
                                            id={label.id}>
                                            
                                    </LabelCard>
                        }
                        )}
                </div>
                <hr></hr>
                <form onSubmit={this.onSubmit}>

                        <div class="form-group row">
                            <label  for="content" class="col-sm-2 col-form-label"><strong>Preview:</strong></label>
                        
                            <LabelCard content={this.state.content} 
                                        shortcut={this.state.shortcut}
                                        backgroundColor={this.state.backgroundColor}
                                        textColor={this.state.textColor}
                                       ></LabelCard>
                        
                        </div>
                
                        
                        <div class="form-group row">
                            <label  for="content" class="col-sm-2 col-form-label"><strong>Content:</strong></label>
                            <div class="col-sm-10">
                                <input type="text" 
                                        className="form-control" 
                                        id="content" 
                                        value={this.state.content}
                                        onChange={this.onChangeContent}/>
                            </div>
                        </div>
                        <div class="form-group row">
                        <label  for="shortcut" class="col-sm-2 col-form-label"><strong>Shortcut:</strong></label>
                            <div class="input-group col-sm-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="shortcut">@</span>
                                </div>
                                    <input type="text" class="form-control" value={this.state.shortcut} onChange={this.onChangeShortcut}/>
                            </div>
                        </div>
                        <div class="form-group row">
                        <label  for="color" class="col-sm-2 col-form-label" ><strong>Background color:</strong></label>
                        <div class="col-sm-10">
                                <input type="color" value={this.state.backgroundColor} className="form-control" onChange={this.onChangeBackgroundColor}></input>
                            </div>
                        </div>
                        <div class="form-group row">
                        <label  for="color" class="col-sm-2 col-form-label"><strong>Text color:</strong></label>
                        <div class="col-sm-10">
                                <input type="color"  value={this.state.textColor} className="form-control" onChange={this.onChangeTextColor}></input>
                            </div>
                        </div>   
                        </form>
                        <Button color="info"  onClick={this.onSubmit}>Add</Button>{'   '}
                        <Button color="secondary" onClick={this.onReset} >Reset</Button>
                
                </CardBody>
                
            </Card>
            
           
        )
    }
}

export default Label