import React,{Component} from 'react'

export default class Spinner extends Component{
      constructor(props){
           super(props)
      }
      render(){
          return(
              <div className="text-center" style={{ position: 'fixed',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'}}>
                <div className="spinner-grow text-muted"></div>
                <div className="spinner-grow text-muted"></div>
                <div className="spinner-grow text-muted"></div>
                <div className="spinner-grow text-muted"></div>
                <div className="spinner-grow text-muted"></div>
                <h3 className="text-muted">{`Loading ${this.props.content?this.props.content:''} ... `}</h3>
              </div>
          )
      }
}