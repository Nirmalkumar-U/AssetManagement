import React, { useEffect, useState } from 'react';
import {
    Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
    Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';
import LocalStore from '../core/CommonFunctions/LocalStore';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [modal, setModal] = useState(false);
    const [backdrop] = useState(true);
    const navigate = useNavigate();
    const setData = 1;
    const [actionData, setActionData] = useState({
        home: true,
        admin: false,
        userList: false,
        addEditUser: false,
        addEditRole: false,
        roleList: false,
        branch: false,
        branchList: false,
        addeditBranch: false,
        employee: false,
        employeeList: false,
        addeditEmployee: false,
        asset: false,
        assetList: false,
        addAsset: false,
    });

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const logout = () => {
        LocalStore.clearAll();
        navigate('/login');
        setModal(!modal);
    };

    useEffect(() => {
        let action = LocalStore.getItem('Actions');
        let act = action.split(',');

        let newActionData = { ...actionData };

        act.forEach(x => {
            if (x == '2' || x == '3' || x == '4' || x == '5') newActionData = { ...newActionData, admin: true };
            if (x == '6' || x == '7') newActionData = { ...newActionData, branch: true };
            if (x == '8' || x == '9') newActionData = { ...newActionData, asset: true };
            if (x == '10' || x == '11') newActionData = { ...newActionData, employee: true };
            if (x == '2') newActionData = { ...newActionData, userList: true };
            if (x == '3') newActionData = { ...newActionData, addEditUser: true };
            if (x == '4') newActionData = { ...newActionData, roleList: true };
            if (x == '5') newActionData = { ...newActionData, addEditRole: true };
            if (x == '6') newActionData = { ...newActionData, branchList: true };
            if (x == '7') newActionData = { ...newActionData, addeditBranch: true };
            if (x == '8') newActionData = { ...newActionData, employeeList: true };
            if (x == '9') newActionData = { ...newActionData, addeditEmployee: true };
            if (x == '10') newActionData = { ...newActionData, assetList: true };
            if (x == '11') newActionData = { ...newActionData, addAsset: true };
        });

        setActionData(newActionData);

    }, [setData]);


    return (
        <div>
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 container-fluid" light>
                    <NavbarBrand tag={Link} to="/">Asset Management</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            {actionData.admin ?
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Admin
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {actionData.userList ? <DropdownItem className="text-dark" tag={Link} to="/userList">User List</DropdownItem> : ''}
                                        {actionData.addEditUser ? <DropdownItem className="text-dark" tag={Link} to="/addEditUser">Add/Edit User</DropdownItem> : ''}
                                        {actionData.roleList ? <DropdownItem className="text-dark" tag={Link} to="/roleList">Role List</DropdownItem> : ''}
                                        {actionData.addEditRole ? <DropdownItem className="text-dark" tag={Link} to="/addEditRole">Add/Edit Role</DropdownItem> : ''}
                                    </DropdownMenu>
                                </UncontrolledDropdown> : ''}
                            {actionData.employee ? <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Employee
                                </DropdownToggle>
                                <DropdownMenu>
                                    {actionData.employeeList ? <DropdownItem className="text-dark" tag={Link} to="/listEmployee">Employee List</DropdownItem> : ''}
                                    {actionData.addeditEmployee ? <DropdownItem className="text-dark" tag={Link} to="/addEditEmployee">Add/Edit Employee</DropdownItem> : ''}
                                </DropdownMenu>
                            </UncontrolledDropdown> : ''}
                            {actionData.branch ?
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Branch
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {actionData.addeditBranch ? <DropdownItem className="text-dark" tag={Link} to="/addEditBranch">Add/Edit Branch</DropdownItem> : ''}
                                        {actionData.branchList ? <DropdownItem className="text-dark" tag={Link} to="/listBranch">Branch List</DropdownItem> : ''}
                                    </DropdownMenu>
                                </UncontrolledDropdown> : ''}
                            {actionData.asset ?
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Asset
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {actionData.addAsset ? <DropdownItem className="text-dark" tag={Link} to="/CreateAsset">Create Asset</DropdownItem> : ''}
                                        {actionData.assetList ? <DropdownItem className="text-dark" tag={Link} to="/listAsset">Asset List</DropdownItem> : ''}
                                    </DropdownMenu>
                                </UncontrolledDropdown> : ''}
                            {/*//test*/}
                            {/*<UncontrolledDropdown nav inNavbar>*/}
                            {/*    <DropdownToggle nav caret>*/}
                            {/*        test*/}
                            {/*    </DropdownToggle>*/}
                            {/*    <DropdownMenu>*/}
                            {/*        <DropdownItem className="text-dark" tag={Link} to="/testadd/5">Test</DropdownItem>*/}
                            {/*    </DropdownMenu>*/}
                            {/*</UncontrolledDropdown>*/}
                            <NavItem>
                                <NavLink className="text-dark" id="logout" onClick={toggle}>Logout</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
            <Modal isOpen={modal} toggle={toggle} className="model" backdrop={backdrop}>
                <ModalHeader toggle={toggle}>Logout</ModalHeader>
                <ModalBody>
                    Are you sure you want to logout?
                </ModalBody>
                <ModalFooter>
                    <Button id="confirmLogout" color="primary" onClick={logout}>
                        Logout
                    </Button>{' '}
                    <Button onClick={toggle} color="secondary">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default NavMenu;

