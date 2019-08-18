import React, { Component,Suspense} from 'react';
import * as router from 'react-router-dom';
import {
  
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';





class SideBar extends Component {
  constructor(props) {
    super(props);
    
  }

   
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  render() {

    return (
    
          <AppSidebar fixed display="lg">
              <AppSidebarHeader/>
            
              <AppSidebarForm />
              <Suspense>
                  <AppSidebarNav navConfig={this.props.navigation} router={router}/>
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
          
    
    );
  }
}

export default SideBar;
