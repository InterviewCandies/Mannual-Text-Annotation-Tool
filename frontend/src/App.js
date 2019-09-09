import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.scss';
import jwt_decode from 'jwt-decode'
import ProjectLayout from './containers/ProjectLayout/ProjectLayout';
import DocumentLayout from './containers/DocumentLayout/DocumentLayout';
import Spinner from './component/Spinner/Spinner';
const loading = () => <Spinner></Spinner>;

// Containers
const UserLayout = React.lazy(()=>import('./containers/UserLayout/UserLayout'));
const AdminLayout = React.lazy(()=>import('./containers/AdminLayout/AdminLayout'));

// Pages
const Login = React.lazy(() => import('./views/Page/Login/Login'));
const Page404 = React.lazy(() => import('./views/Page/Page404/Page404'));
const Page500 = React.lazy(() => import('./views/Page/Page500/Page500'));

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
              <Route exact path="/400" name="404 Page" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="500 Page" render={props => <Page500 {...props} />} />
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
