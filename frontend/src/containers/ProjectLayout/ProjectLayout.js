import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// routes config
import routes from '../../routes/ProjectRoutes';
import ProjectHeader from './ProjectHeader';
import Spinner from '../../component/Spinner/Spinner';


class ProjectLayout extends Component {

  loading = () => <Spinner></Spinner>
  constructor(props){
     super(props);
     localStorage.setItem('projectId',this.props.match.params.id);
     this.navigation={
        items: [
         
          {
            name: 'Dataset',
            url: `/project/${localStorage.getItem('projectId')}/dataset`,
            icon: 'icon-layers',
            
          },
          {
            name: 'Labels',
            url: `/project/${localStorage.getItem('projectId')}/labels`,
            icon: 'icon-puzzle',
            
          }
        
        ],
      };
      
  }
  signOut(e) {
    e.preventDefault()
    localStorage.removeItem('userToken');
    this.props.history.push('/login')
  }
 
  

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <ProjectHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
       
          
        <div className="app-body">
        <AppSidebar fixed display="lg">
              <AppSidebarHeader/>
            
              <AppSidebarForm />
              <Suspense>
                  <AppSidebarNav navConfig={this.navigation} router={router}/>
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
         
              <main className="main">
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
              </main>
          </div>
         
       
        <AppFooter>
          <Suspense fallback={this.loading()}>
           
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default ProjectLayout;
