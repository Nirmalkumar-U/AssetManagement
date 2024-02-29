import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link, useParams } from 'react-router-dom';
import CommonFunction from '../../core/CommonFunctions/CommonFunction';
import CustomInput from '../../core/CustomComponent/CustomInput';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';
import CustomSelect from '../../core/CustomComponent/CustomSelect';

const EditAsset = () => {
    let { assetId } = useParams();
    const [loading, setLoading] = useState(false);
    const [assetData, setAssetData] = useState({
        assetId:'',
        assetName: '',
        assetCode: '',
        branchId: '',
        employeeId: '',
        assetDescription: '',
        assetType: '',
        modelName: '',
        assetCost: '',
        assetStatus: '',
        serialNumber: ''
    });
    const [validateData, setValidateData] = useState({
        validateAssetName: true,
        validateAssetCode: true,
        validateBranchId: true,
        validateEmployeeId: true,
        validateAssetDescription: true,
        validateAssetType: true,
        validateModelName: true,
        validateAssetCost: true,
        validateAssetStatus: true,
        validateSerialNumber: true
    });
    const [dropDownlist, setdropDownlist] = useState({
        branch: [],
        employee: [],
        status: [],
    });

    const validateAsset = () => {
        setValidateData({
            validateAssetName: !CommonFunction.isNullOrEmpty(assetData.assetName),
            validateBranchId: !CommonFunction.isNullOrEmpty(assetData.branchId.toString()),
            //validateEmployeeId: !CommonFunction.isNullOrEmpty(assetData.employeeId.toString()),
            validateAssetCost: !CommonFunction.isNullOrEmptyOrZero(assetData.assetCost),
            validateAssetStatus: !CommonFunction.isNullOrEmpty(assetData.assetStatus),
            validateSerialNumber: !CommonFunction.isNullOrEmpty(assetData.serialNumber)
        });
        if (CommonFunction.isNullOrEmpty(assetData.assetName)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.branchId)) {
            return false
        }  else if (CommonFunction.isNullOrEmpty(assetData.assetCost)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.assetStatus)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.serialNumber)) {
            return false
        } else {
            return true;
        }
    };

    const onAssetNameChange = (newValue) => {
        setAssetData({ ...assetData, assetName: newValue });
    };
    const onBranchChange = (newValue) => {
        setAssetData({ ...assetData, branchId: newValue });
    };
    const onEmployeeChange = (newValue) => {
        setAssetData({ ...assetData, employeeId: newValue });
    };
    const onAssetDescriptionChange = (newValue) => {
        setAssetData({ ...assetData, assetDescription: newValue });
    };
    const onAssetTypeChange = (newValue) => {
        setAssetData({ ...assetData, assetType: newValue });
    };
    const onModelNameChange = (newValue) => {
        setAssetData({ ...assetData, modelName: newValue });
    };
    const onAssetCostChange = (newValue) => {
        setAssetData({ ...assetData, assetCost: newValue });
    };
    const onStatusChange = (newValue) => {
        setAssetData({ ...assetData, assetStatus: newValue });
    };
    const onSerialNumberChange = (newValue) => {
        setAssetData({ ...assetData, serialNumber: newValue });
    };

    const updateAsset = async (event) => {
        try {
            event.preventDefault();
            if (!validateAsset())
                return;
            const asset = {
                assetId: assetData.assetId,
                branchId: assetData.branchId,
                employeeId: CommonFunction.ifEmptySetNull( assetData.employeeId),
                assetName: assetData.assetName,
                assetDescription: assetData.assetDescription,
                assetType: assetData.assetType,
                modelName: assetData.modelName,
                assetCost: assetData.assetCost,
                assetStatus: assetData.assetStatus,
                serialNumber: assetData.serialNumber
            }
            setLoading(true);
            let response = await apiService.httpPost('Asset/UpdateAsset', asset);
            if (response.status) {
                if (response.result) {
                    NotificationManager.success('Asset Saved Successfully...', '');
                }
                else {
                    NotificationManager.warning(response.message[0], '');
                }
            } else {
                NotificationManager.error('Asset Saved Error...', '');
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const getAsset = async () => {
            try {
                setLoading(true);
                const response = await apiService.httpGet(`Asset/EditAssetInitialLoad?assetId=${assetId}`);
                if (response.status) {
                    let result = response.result.asset;
                    setAssetData({
                        assetId: assetId,
                        assetName: CommonFunction.ifNullSetEmpty(result.assetName),
                        assetCode: CommonFunction.ifNullSetEmpty(result.assetCode),
                        branchId: CommonFunction.ifNullSetEmpty(result.branchId),
                        employeeId: CommonFunction.ifNullSetEmpty(result.employeeId),
                        assetDescription: CommonFunction.ifNullSetEmpty(result.assetDescription),
                        assetType: CommonFunction.ifNullSetEmpty(result.assetType),
                        modelName: CommonFunction.ifNullSetEmpty(result.modelName),
                        assetCost: CommonFunction.ifNullSetEmpty(result.assetCost),
                        assetStatus: result.assetStatus == 'NREC' ? null : result.assetStatus,
                        serialNumber: CommonFunction.ifNullSetEmpty(result.serialNumber)
                    });
                    setdropDownlist({
                        branch: response.result.branchDropDown,
                        employee: response.result.employeeDropDown,
                        status: response.result.assetStatusDropDown
                    });
                } else {
                    NotificationManager.error('Error fetching Asset data...', '');
                }
                setLoading(false);
            } catch (error) {
                NotificationManager.error('Error fetching Asset data...', '');
                console.log(error);
                setLoading(false);
            }
        };
        getAsset();
    }, [assetId]);

    return (
        <div>
            {loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Asset</li>
                    </ol>
                </nav>
                <form noValidate className="row g-3 needs-validation" onSubmit={updateAsset}>
                    <CustomInput
                        label="Asset Name"
                        value={assetData?.assetName}
                        onChange={onAssetNameChange}
                        inputId="assetName"
                        type='text'
                        maxlength={50}
                        isRequried={true}
                        isValid={validateData.validateAssetName}
                        message="Asset Name is required"
                        disabled={false}
                    />
                    <CustomInput
                        label="Asset Code"
                        value={assetData?.assetCode}
                        inputId="assetCode"
                        type='text'
                        isRequried={false}
                        disabled={true}
                    />
                    <CustomSelect
                        options={dropDownlist.branch}
                        onChange={onBranchChange}
                        label="Branch"
                        value={assetData.branchId}
                        isRequried={true}
                        isValid={validateData.validateBranchId}
                        message="Branch is required"
                    />
                    <CustomSelect
                        options={dropDownlist.employee}
                        onChange={onEmployeeChange}
                        label="Employee"
                        value={assetData.employeeId}
                        isRequried={false}
                    />
                    <CustomInput
                        label="Asset Description"
                        value={assetData?.assetDescription}
                        onChange={onAssetDescriptionChange}
                        inputId="assetDescription"
                        type='text'
                        maxlength={50}
                        isRequried={false}
                    />
                    <CustomInput
                        label="Asset Type"
                        value={assetData?.assetType}
                        onChange={onAssetTypeChange}
                        inputId="assetType"
                        type='text'
                        maxlength={50}
                        isRequried={false}
                    />
                    <CustomInput
                        label="Model Name"
                        value={assetData?.modelName}
                        onChange={onModelNameChange}
                        inputId="modelName"
                        type='text'
                        maxlength={50}
                        isRequried={false}
                    />
                    <CustomInput
                        label="Asset Cost"
                        value={assetData?.assetCost}
                        onChange={onAssetCostChange}
                        inputId="assetCost"
                        type='number'
                        maxlength={6}
                        isRequried={true}
                        isValid={validateData.validateAssetCost}
                        message="Asset Cost is required"
                    />
                    <CustomSelect
                        options={dropDownlist.status}
                        onChange={onStatusChange}
                        label="Status"
                        value={assetData.assetStatus}
                        isRequried={true}
                        isValid={validateData.validateAssetStatus}
                        message="Asset Status is required"
                    />
                    <CustomInput
                        label="Serial Number"
                        value={assetData?.serialNumber}
                        onChange={onSerialNumberChange}
                        inputId="serialNumber"
                        type='text'
                        maxlength={25}
                        isRequried={true}
                        isValid={validateData.validateSerialNumber}
                        message="Serial Number is required"
                    />
                    <button type="submit" className="btn btn-primary">Save Asset</button>
                </form>

            </div>
            <NotificationContainer />
        </div>
    );
};

export default EditAsset;
