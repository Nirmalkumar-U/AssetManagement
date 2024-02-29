import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from '../../core/CustomComponent/Loader';
import { Link } from 'react-router-dom';
import apiService from '../../core/services/apiService';
import DataTable from 'react-data-table-component';

export class ListBranch extends Component {
    state = {
        loading: false,
        branchList:[]
    };

    columns = [
        {
            name: 'Branch Name',
            selector: row => row.branchName,
            sortable: true,
            cell: row => (
                <Link tag={Link} to={'/addEditBranch/' + row.branchId}>{row.branchName}</Link>
            )
        },
        {
            name: 'Branch Code',
            selector: row => row.branchCode,
            sortable: true,
        },
        {
            name: 'Number Of Employee',
            selector: row => row.noOfEmployee,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.noOfEmployee
        }
    ];

    data = [];

    async getBranchList() {
        try {
            this.setState({ loading: true });
            let response = await apiService.httpGet('Branch/GetBranchList');
            if (response.status) {
                this.setState({ branchList: response.result });
                this.data = response.result
            } else {
                NotificationManager.error('Failed to get branch list', '');
            }
            this.setState({ loading: false });
        } catch (error) {
            console.error(error);
            NotificationManager.error('Failed to get branch list', '');
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.getBranchList();
    }

    render() {
        return <div>
            {this.state.loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Branch List</li>
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
