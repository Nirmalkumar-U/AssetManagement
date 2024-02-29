import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from '../../core/CustomComponent/Loader';
import { Link } from 'react-router-dom';
import apiService from '../../core/services/apiService';
import DataTable from 'react-data-table-component';

export class ListRole extends Component {
    state = {
        loading: false,
        roleList:[]
    };

    columns = [
        {
            name: 'Role Name',
            selector: row => row.roleName,
            sortable: true,
            cell: row => (
                <Link tag={Link} to={'/addEditRole/' + row.roleId}>{row.roleName}</Link>
            )
        },
        {
            name: 'Role Code',
            selector: row => row.roleCode,
            sortable: true,
        },
        {
            name: 'No Of Users',
            selector: row => row.noOfUser,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => row.roleId,
            cell: row => (
                <Link>{row.roleId}</Link>
            )
        }
    ];

    data = [];

    async getAssetList() {
        try {
            this.setState({ loading: true });
            let response = await apiService.httpGet('Role/GetRoleList');
            if (response.status) {
                this.setState({ roleList: response.result });
                this.data = response.result;
            } else {
                NotificationManager.error('Failed to get Asset list', '');
            }
            this.setState({ loading: false });
        } catch (error) {
            console.error(error);
            NotificationManager.error('Failed to get Asset list', '');
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.getAssetList();
    }

    render() {
        return <div>
            {this.state.loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Role List</li>
                    </ol>
                </nav>
                <DataTable
                    columns={this.columns}
                    data={this.data}
                    pagination
                />
            </div>
            <NotificationContainer />
        </div>;
    }
}
