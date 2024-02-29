import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from '../../core/CustomComponent/Loader';
import { Link } from 'react-router-dom';
import apiService from '../../core/services/apiService';
import DataTable from 'react-data-table-component';

export class ListUser extends Component {
    state = {
        loading: false,
        assetList:[]
    };

    columns = [
        {
            name: 'Asset Name',
            selector: row => row.branchName,
            sortable: true,
            cell: row => (
                <Link tag={Link} to={'/EditAsset/' + row.assetId}>{row.assetName}</Link>
            )
        },
        {
            name: 'Asset Code',
            selector: row => row.assetCode,
            sortable: true,
        },
        {
            name: 'Employee Name',
            selector: row => row.employeeName,
            sortable: true,
            cell: row => (
                 row.employeeName == null ? <td>Not Assigned</td> : <td> <Link tag={Link} to={'/addEditEmployee/' + row.employeeId}>{row.employeeName}</Link></td> 
            )
        },
        {
            name: 'Branch Name',
            selector: row => row.branchName,
            sortable: true,
            cell: row => (
                <Link tag={Link} to={'/addEditBranch/' + row.branchId}>{row.branchName}</Link>
            )
        },
        {
            name: 'Asset Type',
            selector: row => row.assetType,
            sortable: true
        },
        {
            name: 'Serial Number',
            selector: row => row.serialNo,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true
        }
    ];

    data = [];

    async getAssetList() {
        try {
            this.setState({ loading: true });
            let response = await apiService.httpGet('Asset/GetAssetList');
            if (response.status) {
                this.setState({ assetList: response.result });
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
                        <li className="breadcrumb-item active" aria-current="page">Asset List</li>
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
