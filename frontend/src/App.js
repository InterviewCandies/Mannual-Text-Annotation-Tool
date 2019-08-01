import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const UserLayout = React.lazy(()=>import('./containers/UserLayout/UserLayout'));
const AdminLayout = React.lazy(()=>import('./containers/AdminLayout/AdminLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login/Login'));


class App extends Component {
  constructor(props){
    super(props);
    this.state={
        user:{}
    }
    this.onUserChange = this.onUserChange.bind(this);
  }
 
   onUserChange = (user)=>{
       this.setState({
         user:user
       })
   }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login  {...props} onUserChange={this.onUserChange}/>} />
              <Route  path="/" name="Home" 
                     render={props =>
                         { 
                            if(!this.state.user.username) 
                                return (<Redirect to="/login" ></Redirect>)
                                
                            else if(this.state.user.role==0) return <UserLayout {...props} index={this.state.user}/>
                            else return <AdminLayout {...props} index={this.state.user}></AdminLayout>
                         }
                      } />
            </Switch>
               

           

           
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
