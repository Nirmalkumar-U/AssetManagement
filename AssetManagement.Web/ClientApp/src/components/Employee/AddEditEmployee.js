import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CustomInput from '../../core/CustomComponent/CustomInput';
import CommonFunction from '../../core/CommonFunctions/CommonFunction';
import CustomSelect from '../../core/CustomComponent/CustomSelect';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-date-picker';

const AddEditEmployee = () => {
    let { employeeId } = useParams();

    const [loading, setLoading] = useState(false);
    const [branchlist, setBranchlist] = useState({
        branch: []
    });
    const [employeeData, setEmployeeData] = useState({
        employeeId:'',
        employeeName: '',
        employeeCode: '',
        department: '',
        gender: true,
        emailId: '',
        phoneNumber: '',
        city: '',
        state: '',
        status: null,
        branch: null,
        dateOfBirth:null
    });
    const [validateDate, setValidateDate] = useState({
        validateEmployeeName: true,
        validateEmployeeCode: true,
        validateDepartment: true,
        validateGender: true,
        validateEmailId: true,
        validatePhoneNumber: true,
        validateCity: true,
        validateState: true,
        validateStatus: true,
        validateDateOfBirth: true,
    });

    const statusDropdown = [
        { value: 'ACTV', label: 'Active' },
        { value: 'IACT', label: 'InActive' },
    ];

    const onEmployeeNameChange = (newValue) => {
        setEmployeeData({ ...employeeData, employeeName: newValue });
    };

    const onBranchChange = (newValue) => {
        setEmployeeData({ ...employeeData, branch: newValue });
    };

    const onDepartmentChange = (newValue) => {
        setEmployeeData({ ...employeeData, department: newValue });
    };

    const onEmployeeCodeChange = (newValue) => {
        setEmployeeData({ ...employeeData, employeeCode: newValue });
    };

    const onEmailIdChange = (newValue) => {
        setEmployeeData({ ...employeeData, emailId: newValue });
    };

    const onPhoneNumberChange = (newValue) => {
        setEmployeeData({ ...employeeData, phoneNumber: newValue });
    };

    const onCityChange = (newValue) => {
        setEmployeeData({ ...employeeData, city: newValue });
    };

    const onStateChange = (newValue) => {
        setEmployeeData({ ...employeeData, state: newValue });
    };

    const onStatusChange = (newValue) => {
        setEmployeeData({ ...employeeData, status: newValue });
    };

    const onGenderChange = (newValue) => {
        setEmployeeData({ ...employeeData, gender: newValue });
    };
    //const onDateOfBirthChange = (newValue) => {
    //    setEmployeeData({ ...employeeData, dateOfBirth: new Date(newValue) });
    //    setIsDatePickerOpen(false);
    //};

    const validateEmployee = () => {
        setValidateDate({
            validateEmployeeName: CommonFunction.validateField(employeeData.employeeName, "string"),
            validateEmployeeCode: CommonFunction.validateField(employeeData.employeeCode, "string"),
            //validateDepartment: CommonFunction.validateField(employeeData.department, "string"),
            //validateEmailId: CommonFunction.validateField(employeeData.emailId, "string"),
            validatePhoneNumber: CommonFunction.validateField(employeeData.phoneNumber, "string"),
            validateCity: CommonFunction.validateField(employeeData.city, "string"),
            validateState: !CommonFunction.isNullOrEmpty(employeeData.state),
            validateStatus: !CommonFunction.isNullOrEmpty(employeeData.status),
            validateDateOfBirth: employeeData.dateOfBirth != null
        });

        if (CommonFunction.isNullOrEmpty(employeeData.employeeName)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(employeeData.employeeCode)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(employeeData.phoneNumber)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(employeeData.city)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(employeeData.state)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(employeeData.status)) {
            return false
        } else if (employeeData.dateOfBirth == null) {
            return false
        } else {
            return true;
        }
    };

    const saveEmployee = async (event) => {
        try {
            event.preventDefault();
            if (!validateEmployee())
                return;

            const employee = {
                employeeId: CommonFunction.ifEmptySetNull(employeeData.employeeId),
                branchId: employeeData.branch,
                dateOfBirth: new Date(),
                employeeCity: employeeData.city,
                employeeState: employeeData.state,
                employeeStatus: employeeData.status,
                employeeName: employeeData.employeeName,
                employeeCode: employeeData.employeeCode,
                department: CommonFunction.ifEmptySetNull(employeeData.department),
                gender: employeeData.gender,
                emailId: CommonFunction.ifEmptySetNull(employeeData.emailId),
                phoneNumber: employeeData.phoneNumber,
            };
            setLoading(true);
            let response = await apiService.httpPost('Employee/SaveEmployee', employee);
            if (response.status) {
                setEmployeeData({ ...employeeData, employeeId: response.result });
                NotificationManager.success('Employee Saved Successfully...', '');
            } else {
                NotificationManager.error('Employee Saved Error...', '');
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const getEmployee = async () => {
            if (employeeId) {
                try {
                    setLoading(true);
                    const response = await apiService.httpGet(`Employee/GetEmployeeByEmployeeId?employeeid=${employeeId}`);
                    if (response.status) {
                        const employee = response.result;
                        setEmployeeData({
                            employeeId: employeeId,
                            employeeName: employee.employeeName,
                            employeeCode: employee.employeeCode,
                            department: CommonFunction.ifNullSetEmpty(employee.department),
                            dateOfBirth: employee.dateOfBirth,
                            gender: employee.gender,
                            emailId: CommonFunction.ifNullSetEmpty(employee.emailId),
                            phoneNumber: employee.phoneNumber,
                            city: employee.employeeCity,
                            state: employee.employeeState,
                            status: employee.employeeStatus,
                            branch: employee.branchId
                        });
                    } else {
                        NotificationManager.error('Error fetching employee data...', '');
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching employee data:', error);
                    setLoading(false);
                }
            }
            else {
                setEmployeeData({
                    employeeId:'',
                    employeeName: '',
                    employeeCode: '',
                    department: '',
                    dateOfBirth: new Date(),
                    gender: true,
                    emailId: '',
                    phoneNumber: '',
                    city: '',
                    state: '',
                    status: ''
                });
            }
        };
        const getBranch = async () => {
            try {
                setLoading(true);
                const response = await apiService.httpGet(`Branch/GetBranchDropDown`);
                if (response) {
                    setBranchlist({
                        branch: response
                    });
                } else {
                    NotificationManager.error('Error fetching branch data...', '');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setLoading(false);
            }
        }

        getBranch();
        getEmployee();
    }, [employeeId]);

    return (
        <div>
            {loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add-Edit Employee</li>
                    </ol>
                </nav>
                <form noValidate className="row g-3 needs-validation" onSubmit={saveEmployee}>
                    <CustomInput
                        label="Employee Name"
                        value={employeeData.employeeName}
                        onChange={onEmployeeNameChange}
                        inputId="employeeName"
                        type='text'
                        isRequried={true}
                        isValid={validateDate.validateEmployeeName}
                        message="Employee Name is required"
                    />
                    <CustomInput
                        label="Employee Code"
                        value={employeeData.employeeCode}
                        onChange={onEmployeeCodeChange}
                        inputId="employeeCode"
                        type='text'
                        maxlength={4}
                        isRequried={true}
                        isValid={validateDate.validateEmployeeCode}
                        message="Employee Code is required"
                    />
                    <CustomInput
                        label="Department"
                        value={employeeData.department}
                        onChange={onDepartmentChange}
                        inputId="department"
                        type='text'
                        isRequried={false}
                    />
                    {/*<DatePicker onChange={onDateOfBirthChange} value={employeeData.dateOfBirth} />*/}
                    <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name='gender' value={true} onChange={() => onGenderChange(true)} checked={employeeData.gender === true} />
                            <label className="form-check-label">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name='gender' value={false} onChange={() => onGenderChange(false)} checked={employeeData.gender === false} />
                            <label className="form-check-label">
                                Female
                            </label>
                        </div>
                    </div>
                    <CustomInput
                        label="Email Id"
                        value={employeeData.emailId}
                        onChange={onEmailIdChange}
                        inputId="Email"
                        type='text'
                        isRequried={false}
                    />
                    <CustomInput
                        label="Phone Number"
                        value={employeeData.phoneNumber}
                        onChange={onPhoneNumberChange}
                        inputId="phoneNumber"
                        type='number'
                        isRequried={true}
                        isValid={validateDate.validatePhoneNumber}
                        message="Phone Number is required"
                    />
                    <CustomInput
                        label="City"
                        value={employeeData.city}
                        onChange={onCityChange}
                        inputId="City"
                        type='text'
                        isRequried={true}
                        isValid={validateDate.validateCity}
                        message="City is required"
                    />
                    <CustomInput
                        label="State"
                        value={employeeData.state}
                        onChange={onStateChange}
                        inputId="State"
                        type='text'
                        isRequried={true}
                        isValid={validateDate.validateState}
                        message="State is required"
                    />
                    <CustomSelect
                        options={statusDropdown}
                        onChange={onStatusChange}
                        label="Status"
                        value={employeeData.status}
                        isRequried={true}
                        isValid={validateDate.validateStatus}
                        message="Status is required"
                    />
                    <CustomSelect
                        options={branchlist.branch}
                        onChange={onBranchChange}
                        label="Branch"
                        value={employeeData.branch}
                        isRequried={false}
                        isValid={validateDate.validateBranch}
                    />
                    <button type="submit" className="btn btn-primary">Save Employee</button>
                </form>
            </div>
            <NotificationContainer />
        </div>
    );
};

export default AddEditEmployee;
