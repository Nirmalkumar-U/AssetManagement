import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CustomInput from '../../core/CustomComponent/CustomInput';
import CommonFunction from '../../core/CommonFunctions/CommonFunction';
import CustomSelect from '../../core/CustomComponent/CustomSelect';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';
import { Link, useParams } from 'react-router-dom';
import withRouter from '../../core/CustomComponent/withRouter';


export class AddEditEmployeeTest extends Component {
    state = {
        loading: false,
        employeeId: null,
        employeeName: '',
        employeeCode: '',
        department: '',
        gender: '1',
        emailId: '',
        phoneNumber: '',
        city: '',
        State: '',
        Status: null,
        //validate
        validateEmployeeName: true,
        validateEmployeeCode: true,
        validateDepartment: true,
        validateGender: true,
        validateEmailId: true,
        validatePhoneNumber: true,
        validateCity: true,
        validateState: true,
        validateStatus: true
    };

    statusDropdown = [
        { value: 'ACTV', label: 'Active' },
        { value: 'IACT', label: 'InActive' },
    ];

    componentDidMount() {
        let id = this.props;
        console.log(id)
    }

    onEmployeeNameChange = (newValue) => {
        this.setState({ employeeName: newValue });
    };
    onDepartmentChange = (newValue) => {
        this.setState({ department: newValue });
    };
    onEmployeeCodeChange = (newValue) => {
        this.setState({ employeeCode: newValue });
    };
    onEmailIdChange = (newValue) => {
        this.setState({ emailId: newValue });
    };
    onphoneNumberChange = (newValue) => {
        this.setState({ phoneNumber: newValue });
    };
    onCityChange = (newValue) => {
        this.setState({ city: newValue });
    };
    onStateChange = (newValue) => {
        this.setState({ State: newValue });
    };
    onStatusChange = (newValue) => {
        this.setState({ Status: newValue });
    };
    onGenderChange(newValue) {
        let value = newValue.toString();
        this.setState({ gender: value });
    }
    validateEmployee() {
        this.setState({
            validateEmployeeName: CommonFunction.validateField(this.state.employeeName, "string"),
            validateEmployeeCode: CommonFunction.validateField(this.state.employeeCode, "string"),
            validateDepartment: CommonFunction.validateField(this.state.department, "string"),
            validateGender: CommonFunction.validateField(this.state.gender, "string"),
            validateEmailId: CommonFunction.validateField(this.state.emailId, "string"),
            validatePhoneNumber: CommonFunction.validateField(this.state.phoneNumber, "string"),
            validateCity: CommonFunction.validateField(this.state.city, "string"),
            validateState: !CommonFunction.isNullOrEmpty(this.state.State),
            validateStatus: !CommonFunction.isNullOrEmpty(this.state.Status)
        });
        if (CommonFunction.isNullOrEmpty(this.state.employeeName)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.employeeCode)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.department)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.gender)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.emailId)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.phoneNumber)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.city)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.State)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(this.state.Status)) {
            return false
        } else {
            return true;
        }
    }
    async saveEmployee(event) {
        try {
            event.preventDefault();
            let validate = this.validateEmployee();
            if (!validate)
                return;
            const employee = {
                employeeId: this.state.employeeId,
                branchId: this.state.branchId,
                dateOfBirth: new Date(),
                employeeCity: this.state.city,
                employeeState: this.state.State,
                employeeStatus: this.state.Status,
                employeeName: this.state.employeeName,
                employeeCode: this.state.employeeCode,
                department: this.state.department,
                gender: this.state.gender == "1",
                emailId: this.state.emailId,
                phoneNumber: this.state.phoneNumber
            };
            this.setState({ loading: true });
            let response = await apiService.httpPost('Employee/SaveEmployee', employee);
            if (response.status) {
                this.setState({ employeeId: response.result });
                NotificationManager.success('Employee Saved Successfully...', '');
            } else {
                NotificationManager.error('Employee Saved Error...', '');
            }
            this.setState({ loading: false });
        } catch (error) {
            console.error("Error fetching users:", error);
            this.setState({ loading: false });
        }
    }

    render() {
        console.log('Props:', this.props)
        return <div>
            {this.state.loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add-Edit Employee</li>
                    </ol>
                </nav>
                <form noValidate className="row g-3 needs-validation" onSubmit={(event) => this.saveEmployee(event)}>
                    <CustomInput
                        label="Employee Name"
                        value={this.state.employeeName}
                        onChange={this.onEmployeeNameChange}
                        inputId="employeeName"
                        type='text'
                        isRequried={true}
                        isValid={this.state.validateEmployeeName}
                        message="Employee Name is required"
                    />
                    <CustomInput
                        label="Employee Code"
                        value={this.state.employeeCode}
                        onChange={this.onEmployeeCodeChange}
                        inputId="employeeCode"
                        type='text'
                        maxlength={4}
                        isRequried={true}
                        isValid={this.state.validateEmployeeCode}
                        message="Employee Code is required"
                    />
                    <CustomInput
                        label="Department"
                        value={this.state.department}
                        onChange={this.onDepartmentChange}
                        inputId="department"
                        type='text'
                        isRequried={true}
                        isValid={this.state.validateDepartment}
                        message="Department is required"
                    />
                    <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name='gender' value='1' onChange={() => this.onGenderChange(1)} checked={this.state.gender === '1'} />
                            <label className="form-check-label">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name='gender' value='2' onChange={() => this.onGenderChange(2)} checked={this.state.gender === '2'} />
                            <label className="form-check-label">
                                Female
                            </label>
                        </div>
                    </div>
                    <CustomInput
                        label="Email Id"
                        value={this.state.emailId}
                        onChange={this.onEmailIdChange}
                        inputId="Email"
                        type='text'
                        isRequried={true}
                        isValid={this.state.validateEmailId}
                        message="Email Id is required"
                    />
                    <CustomInput
                        label="Phone Number"
                        value={this.state.phoneNumber}
                        onChange={this.onphoneNumberChange}
                        inputId="phoneNumber"
                        type='number'
                        isRequried={true}
                        isValid={this.state.validatePhoneNumber}
                        message="Phone Number is required"
                    />
                    <CustomInput
                        label="City"
                        value={this.state.City}
                        onChange={this.onCityChange}
                        inputId="City"
                        type='text'
                        isRequried={false}
                        isValid={this.state.validateCity}
                        message="City is required"
                    />
                    <CustomInput
                        label="State"
                        value={this.state.State}
                        onChange={this.onStateChange}
                        inputId="State"
                        type='text'
                        isRequried={false}
                        isValid={this.state.validateState}
                        message="State is required"
                    />
                    <CustomSelect
                        options={this.statusDropdown}
                        onChange={this.onStatusChange}
                        label="Status"
                        isRequried={true}
                        isValid={this.state.validateStatus}
                        message="Status is required"
                    />
                    <button type="submit" className="btn btn-primary">Save Employee</button>
                </form>
            </div>
            <NotificationContainer />
        </div>;
    }
}


export default withRouter(AddEditEmployeeTest);