import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.scss';
import jwt_decode from 'jwt-decode'
import ProjectLayout from './containers/ProjectLayout/ProjectLayout';
import DocumentLayout from './containers/DocumentLayout/DocumentLayout';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const UserLayout = React.lazy(()=>import('./containers/UserLayout/UserLayout'));
const AdminLayout = React.lazy(()=>import('./containers/AdminLayout/AdminLayout'));

// Pages
const Login = React.lazy(() => import('./views/Page/Login/Login'));


class App extends Component {
  constructor(props){
    super(props);
    
  }
 
   

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route path="/project/:id/"  render={props=><ProjectLayout {...props}></ProjectLayout> }></Route>
              <Route path="/document/:id" render={props=><DocumentLayout {...props}></DocumentLayout> }></Route>
              <Route  path="/" name="Home" 
                     render={ (props) =>
                         { 
                            const token = localStorage.getItem('userToken');
                            if(!token) 
                                return (<Redirect to="/login" ></Redirect>)
                            const decoder = jwt_decode(token);
                            if(decoder.role==0) return <UserLayout {...props} />
                            return <AdminLayout {...props} ></AdminLayout>
                         }
                      } />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
