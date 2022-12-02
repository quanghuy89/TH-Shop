import 'react-pro-sidebar/dist/css/styles.css';
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaHeart, FaList, FaGithub, FaRegLaughWink } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React from 'react';
// import sidebarBg from '../../assets/bg2.jpg';

const Sidebar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      {/* <ProSidebar>
        <Menu iconShape='square'>
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title='Components' icon={<FaHeart />}>
            <MenuItem>
              {' '}
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
            </MenuItem>
            <MenuItem>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Manage Products</NavDropdown.Item>
              </LinkContainer>
            </MenuItem>
            <MenuItem>
            <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Manage Orders</NavDropdown.Item>
                  </LinkContainer>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar> */}

      <ProSidebar
        // image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint='md'
        onToggle={handleToggleSidebar}>
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
            Admin
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem icon={<FaTachometerAlt />} suffix={<span className='badge red'>New</span>}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaGem />}> Contact </MenuItem>
          </Menu>
          <Menu iconShape='circle'>
            <SubMenu suffix={<span className='badge yellow'>3</span>} icon={<FaRegLaughWink />} title='Action'>
            <MenuItem> 
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Manage Users</NavDropdown.Item>
              </LinkContainer>
            </MenuItem>
            <MenuItem>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Manage Products</NavDropdown.Item>
              </LinkContainer>
            </MenuItem>
            <MenuItem>
            <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Manage Orders</NavDropdown.Item>
                  </LinkContainer>
              </MenuItem>
              
              <MenuItem>
            <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
            </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className='sidebar-btn-wrapper'
            style={{
              padding: '20px 24px',
            }}>
            <a
              href='https://github.com/azouaoui-med/react-pro-sidebar'
              target='_blank'
              className='sidebar-btn'
              rel='noopener noreferrer'>
              {/* <FaGithub /> */}
              <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                TH Shop
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
