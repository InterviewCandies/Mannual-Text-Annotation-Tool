import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
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
import  navigation from '../../navRoutes/AdminNav';
// routes config
import routes from '../../routes/AdminRoutes';
import AdminHeader from './AdminHeader';
import Spinner from '../../component/Spinner/Spinner';


class AdminLayout extends Component {

  loading = () => <Spinner></Spinner>
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
            <AdminHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
       
          
        <div className="app-body">
        <AppSidebar fixed display="lg">
              <AppSidebarHeader/>
            
              <AppSidebarForm />
              <Suspense>
                  <AppSidebarNav navConfig={navigation} router={router}/>
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
                  <Redirect from='/' to='/projects'></Redirect>
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

export default AdminLayout;
