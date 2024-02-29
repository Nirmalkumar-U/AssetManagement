import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link, useParams } from 'react-router-dom';
import CommonFunction from '../../core/CommonFunctions/CommonFunction';
import CustomInput from '../../core/CustomComponent/CustomInput';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';
import CustomSelect from '../../core/CustomComponent/CustomSelect';

const AddEditRole = () => {
    let { roleId } = useParams();
    const [loading, setLoading] = useState(false);
    const [roleData, setRoleData] = useState({
        assetId: '',
        assetName: '',
        assetCode: '',
    });
    const [validateData, setValidateData] = useState({
        validateAssetName: true,
        validateAssetCode: true,
        validateBranchId: true,
    });

    const validateAsset = () => {
        //setValidateData({
        //    validateAssetName: !CommonFunction.isNullOrEmpty(roleData.assetName),
        //    validateBranchId: !CommonFunction.isNullOrEmpty(roleData.branchId.toString()),
        //    //validateEmployeeId: !CommonFunction.isNullOrEmpty(assetData.employeeId.toString()),
        //    validateAssetCost: !CommonFunction.isNullOrEmptyOrZero(roleData.assetCost),
        //    validateAssetStatus: !CommonFunction.isNullOrEmpty(roleData.assetStatus),
        //    validateSerialNumber: !CommonFunction.isNullOrEmpty(roleData.serialNumber)
        //});
        //if (CommonFunction.isNullOrEmpty(roleData.assetName)) {
        //    return false
        //} else if (CommonFunction.isNullOrEmpty(roleData.branchId)) {
        //    return false
        //}  else if (CommonFunction.isNullOrEmpty(roleData.assetCost)) {
        //    return false
        //} else if (CommonFunction.isNullOrEmpty(roleData.assetStatus)) {
        //    return false
        //} else if (CommonFunction.isNullOrEmpty(roleData.serialNumber)) {
        //    return false
        //} else {
        //    return true;
        //}
    };

    const onAssetNameChange = (newValue) => {
        setRoleData({ ...roleData, assetName: newValue });
    };

    const updateAsset = async (event) => {
        //try {
        //    event.preventDefault();
        //    if (!validateAsset())
        //        return;
        //    const asset = {
        //        assetId: roleData.assetId,
        //        branchId: roleData.branchId,
        //        employeeId: CommonFunction.ifEmptySetNull( roleData.employeeId),
        //        assetName: roleData.assetName,
        //        assetDescription: roleData.assetDescription,
        //        assetType: roleData.assetType,
        //        modelName: roleData.modelName,
        //        assetCost: roleData.assetCost,
        //        assetStatus: roleData.assetStatus,
        //        serialNumber: roleData.serialNumber
        //    }
        //    setLoading(true);
        //    let response = await apiService.httpPost('Asset/UpdateAsset', asset);
        //    if (response.status) {
        //        if (response.result) {
        //            NotificationManager.success('Asset Saved Successfully...', '');
        //        }
        //        else {
        //            NotificationManager.warning(response.message[0], '');
        //        }
        //    } else {
        //        NotificationManager.error('Asset Saved Error...', '');
        //    }
        //    setLoading(false);
        //} catch (error) {
        //    console.error("Error fetching users:", error);
        //    setLoading(false);
        //}
    };

    //useEffect(() => {
    //    const getAsset = async () => {
    //        try {
    //            setLoading(true);
    //            const response = await apiService.httpGet(`Asset/EditAssetInitialLoad?assetId=${assetId}`);
    //            console.log(response);
    //            if (response.status) {
    //            } else {
    //                NotificationManager.error('Error fetching Asset data...', '');
    //            }
    //            setLoading(false);
    //        } catch (error) {
    //            NotificationManager.error('Error fetching Asset data...', '');
    //            console.log(error);
    //            setLoading(false);
    //        }
    //    };
    //    getAsset();
    //}, [assetId]);

    return (
        <div>
            {loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add/Edit Role</li>
                    </ol>
                </nav>
                <form noValidate className="row g-3 needs-validation" onSubmit={updateAsset}>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="Admin" />
                        <label className="form-check-label">Admin</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="UserList" />
                        <label className="form-check-label">User List</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="AddEditUser" />
                        <label className="form-check-label">Add/Edit User</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="RoleList" />
                        <label className="form-check-label">Role List</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="AddEditRole" />
                        <label className="form-check-label">Add/Edit Role</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="Branch" />
                        <label className="form-check-label">Branch</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="BranchList" />
                        <label className="form-check-label">Branch List</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="AddEditBranch" />
                        <label className="form-check-label">Add/Edit Branch</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="Employee" />
                        <label className="form-check-label">Employee</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="EmployeeList" />
                        <label className="form-check-label">Employee List</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="AddEditEmployee" />
                        <label className="form-check-label">Add/Edit Employee</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="Asset" />
                        <label className="form-check-label">Asset</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="AssetList" />
                        <label className="form-check-label">Asset List</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" checked={true} id="AddAsset" />
                        <label className="form-check-label">Add Asset</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Asset</button>
                </form>

            </div>
            <NotificationContainer />
        </div>
    );
};

export default AddEditRole;
