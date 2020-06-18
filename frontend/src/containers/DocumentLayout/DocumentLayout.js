import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// routes config
import routes from '../../routes/DocumentRoutes';
import DocumentHeader from './DocumentHeader';
import Spinner from '../../component/Spinner/Spinner';


class DocumentLayout extends Component {

  loading = () => <Spinner></Spinner>
  constructor(props){
     super(props);
     localStorage.setItem('projectId',this.props.match.params.id);
  }
  signOut(e) {
    e.preventDefault()
    localStorage.removeItem('userToken');
    this.props.history.push('/login')
    document.onkeydown = document.onkeyup = function(){ return true; }
  }
 
  

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DocumentHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
          
        <div className="app-body">
              <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props}  />
                        )} />
                    ) : (null);
                  })}
                </Switch>
              </Suspense>
            </Container>
          
          </div>
         
       
       
      </div>
    );
  }
}

export default DocumentLayout;
