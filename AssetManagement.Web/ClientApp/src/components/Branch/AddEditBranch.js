import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link, useParams } from 'react-router-dom';
import CommonFunction from '../../core/CommonFunctions/CommonFunction';
import CustomInput from '../../core/CustomComponent/CustomInput';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';

const AddEditBranch = () => {
    let { branchId } = useParams();
    const [loading, setLoading] = useState(false);
    const [branchData, setBranchData] = useState({
        branchId: '',
        branchName: '',
        branchCode: '',
        city: '',
        state: '',
        employeeList: [],
        isEditBranch: false
    });
    const [validateData, setValidateData] = useState({
        validateBranchName: true,
        validateBranchCode: true,
        validateCity: true,
        validateState: true,
    });

    const onBranchNameChange = (newValue) => {
        setBranchData({ ...branchData, branchName: newValue });
    };
    const onBranchCodeChange = (newValue) => {
        setBranchData({ ...branchData, branchCode: newValue });
    };
    const onCityChange = (newValue) => {
        setBranchData({ ...branchData, city: newValue });
    };
    const onStateChange = (newValue) => {
        setBranchData({ ...branchData, state: newValue });
    };

    const validateBranch = () => {

        setValidateData({
            validateBranchName: CommonFunction.validateField(branchData.branchName, "string"),
            validateBranchCode: CommonFunction.validateField(branchData.branchCode, "string"),
        });
        if (CommonFunction.isNullOrEmpty(branchData.branchName)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(branchData.branchCode)) {
            return false
        } else {
            return true
        }
    };

    const saveBranch = async (event) => {
        try {
            event.preventDefault();
            if (!validateBranch())
                return;

            const bData = {
                branchId: CommonFunction.ifEmptySetNull(branchData.branchId),
                branchCity: branchData.city,
                branchState: branchData.state,
                branchName: branchData.branchName,
                branchCode: branchData.branchCode
            };
            setLoading(true);
            let response = await apiService.httpPost('Branch/SaveBranch', bData);
            if (response.status) {
                setBranchData({ ...branchData, branchId: response.result });
                NotificationManager.success('Branch Saved Successfully...', '');
            } else {
                NotificationManager.error('Branch Saved Error...', '');
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            NotificationManager.error('Branch Saved Error...', '');
            setLoading(false);
        }
    };

    useEffect(() => {
        const getBranch = async () => {
            if (branchId) {
                try {
                    setLoading(true);
                    const response = await apiService.httpGet(`Branch/GetBranchByBranchId?branchId=${branchId}`);
                    if (response.status) {
                        const branch = response.result;
                        setBranchData({
                            branchId: branchId,
                            branchName: branch.branchName,
                            branchCode: branch.branchCode,
                            city: branch.branchCity,
                            state: branch.branchState,
                            branchList: response.result.employeeList,
                            isEditBranch: true
                        });
                    } else {
                        NotificationManager.error('Error fetching branch data...', '');
                    }
                    setLoading(false);
                } catch (error) {
                    NotificationManager.error('Error fetching branch data...', '');
                    console.log(error);
                    setLoading(false);
                }
            }
            else {

                setBranchData({
                    branchId: '',
                    branchName: '',
                    branchCode: '',
                    city: '',
                    state: '',
                    isEditBranch: false
                });
            }
        };
        getBranch();
    }, [branchId]);

    return (
        <div>
            {loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add-Edit Branch</li>
                    </ol>
                </nav>
                <form noValidate className="row g-3 needs-validation" onSubmit={saveBranch}>
                    <CustomInput
                        label="Branch Name"
                        value={branchData.branchName}
                        onChange={onBranchNameChange}
                        inputId="branchName"
                        type='text'
                        isRequried={true}
                        isValid={validateData.validateBranchName}
                        message="Branch Name is required"
                    />
                    <CustomInput
                        label="Branch Code"
                        value={branchData.branchCode}
                        onChange={onBranchCodeChange}
                        inputId="branchCode"
                        type='text'
                        isRequried={true}
                        isValid={validateData.validateBranchCode}
                        message="Branch Code is required"
                    />
                    <CustomInput
                        label="City"
                        value={branchData.city}
                        onChange={onCityChange}
                        inputId="City"
                        type='text'
                        isRequried={false}
                        isValid={validateData.validateCity}
                    />
                    <CustomInput
                        label="State"
                        value={branchData.state}
                        onChange={onStateChange}
                        inputId="State"
                        type='text'
                        isRequried={false}
                        isValid={validateData.validateState}
                    />
                    <button type="submit" className="btn btn-primary">Save Branch</button>
                    {branchData.isEditBranch ?
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Email Id</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            {branchData.branchList?.length == 0 || branchData.branchList == null ?
                                <tbody>
                                    <tr>
                                        <td colSpan="5">
                                            No Record found
                                        </td>
                                    </tr>
                                </tbody> :
                                <tbody>
                                    {branchData.branchList.map(item => (
                                        <tr key={item.employeeId}>
                                            <td> <Link tag={Link} to={'/addEditEmployee/' + item.employeeId}>{item.employeeName}</Link></td>
                                            <td>{item.emailId}</td>
                                            <td>{item.department}</td>
                                            <td>{item.employeeStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                        : ''}
                </form>

            </div>
            <NotificationContainer />
        </div>
    );
};

export default AddEditBranch;
