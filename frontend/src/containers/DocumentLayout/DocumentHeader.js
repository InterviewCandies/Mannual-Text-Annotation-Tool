import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {  Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode'
import {  AppNavbarBrand} from '@coreui/react';
import logo from '../../assets/img/brand/logo2016.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DocumentHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const token = localStorage.getItem('userToken');
    const decoder = jwt_decode(token);
    const username = decoder.username
    return (
      <React.Fragment id="navbar">
        <AppNavbarBrand href ={"#"}
          full={{ src: logo, width: 150, height: 50, alt: 'YouNet Media Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'YouNet Media Logo' }}
        />
        <Nav className="d-md-down-none" navbar >
          <NavItem className="px-3">
            <NavLink to='/projects' className="nav-link">
               Projects</NavLink>
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

DocumentHeader.propTypes = propTypes;
DocumentHeader.defaultProps = defaultProps;

export default DocumentHeader;
