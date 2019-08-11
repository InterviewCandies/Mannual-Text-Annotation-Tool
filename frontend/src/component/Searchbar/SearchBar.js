import React,{Component} from 'react'
import {
    Button,
    ButtonGroup
} from 'reactstrap'

class SearchBar extends Component {
       render(){
           return(
            <ButtonGroup style={{width:'100%'}}>
                    <input className="form-control " type="text" placeholder="Search..."></input>
                    <Button className="btn bg-primary" type="button"><i className="fa fa-search"></i></Button>
            </ButtonGroup>
           )
       }
}

export default SearchBar