import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class ProjectHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment id="navbar">
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar >
          <NavItem className="px-3">
            <NavLink to={`/project/${localStorage.getItem('projectId')}/annotate`} className="nav-link"><i className="fa fa-check"></i>Annotate Data</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to={`/project/${localStorage.getItem('projectId')}/import`}className="nav-link"><i className="fa fa-upload"></i> Import Data</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to={`/project/${localStorage.getItem('projectId')}/export`} className="nav-link"><i className="fa fa-download"></i> Export Data</Link>
          </NavItem>
         
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem right onClick={e => this.props.onLogout(e)}>
                Sign out <i className="fa fa-sign-out mr-lg-2"></i>
          </NavItem>  
        </Nav>
       
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

ProjectHeader.propTypes = propTypes;
ProjectHeader.defaultProps = defaultProps;

export default ProjectHeader;