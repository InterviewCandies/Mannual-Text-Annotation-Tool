import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo2016.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const token = localStorage.getItem('userToken');
    const decoder = jwt_decode(token);
    const username = decoder.username
    return (
      <React.Fragment id="navbar">
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand href ={"#"}
          full={{ src: logo, width: 120, height: 25, alt: 'YouNet Media  Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'YouNet Media Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar >
          <NavItem className="px-3">
            <NavLink to="/projects" className="nav-link" >Projects</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
         
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem right className="mr-lg-3">
                {username} 
          </NavItem>  
          <NavItem right onClick={e => this.props.onLogout(e)}>
                Sign out <i className="fa fa-sign-out mr-lg-2"></i>
          </NavItem>  
        </Nav>
       
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

AdminHeader.propTypes = propTypes;
AdminHeader.defaultProps = defaultProps;

export default AdminHeader;
