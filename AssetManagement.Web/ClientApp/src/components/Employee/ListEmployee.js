import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';
import DataTable from 'react-data-table-component';

export class ListEmployee extends Component {
    state = {
        loading: false,
        employeeList: []
    };

    columns = [
        {
            name: 'Employee Name',
            selector: row => row.employeeName,
            sortable: true,
            cell: row => (
                <Link tag={Link} to={'/addEditEmployee/' + row.employeeId}>{row.employeeName}</Link>
            )
        },
        {
            name: 'Email Id',
            selector: row => row.emailId,
            sortable: true,
        },
        {
            name: 'Branch Name',
            selector: row => row.branchName,
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.department,
            sortable:true,
        },
        {
            name: 'Status',
            selector: row => row.employeeStatus,
            sortable:true,
        }
    ];

    data = [];

    componentDidMount() {
        this.getEmployeeList();
    }

    async getEmployeeList() {
        try {
            this.setState({ loading: true });
            let response = await apiService.httpGet('Employee/GetEmployeeList');
            if (response.status) {
                this.setState({ employeeList: response.result });
                this.data = response.result;
            } else {
                NotificationManager.error('Failed to get employee list', '');
            }
            this.setState({ loading: false });
        } catch (error) {
            console.error("Error fetching users:", error);
            this.setState({ loading: false });
        }
    }
    render() {
        return <div>
            {this.state.loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Employee List</li>
                    </ol>
                </nav>
                <DataTable
                    columns={this.columns}
                    data={this.data}
                    pagination
                    progressPending={this.state.loading}
                />
            </div>
            <NotificationContainer />
        </div>;
    }
}
