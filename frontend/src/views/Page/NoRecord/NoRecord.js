import React,{Component} from 'react'

export default class NoRecord extends Component{
      constructor(props){
           super(props)
      }
      render(){
          return(
              <div className="text-center" style={{ position: 'fixed',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'}}>
                <h3 className="text-muted">{`No ${this.props.content} to show`}</h3>
              </div>
          )
      }
}