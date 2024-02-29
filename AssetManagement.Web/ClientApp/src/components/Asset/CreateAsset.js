import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';
import CustomSelect from '../../core/CustomComponent/CustomSelect';
import CustomInput from '../../core/CustomComponent/CustomInput';
import CommonFunction from '../../core/CommonFunctions/CommonFunction';

const CreateAsset = () => {
    const [loading, setLoading] = useState(false);

    const [branchlist, setBranchlist] = useState({
        branch: []
    });
    const [assetList, setAssetList] = useState({
        asset: []
    });

    const [assetData, setAssetData] = useState({
        branch: '',
        noOfAsset: '',
        assetName: '',
        assetDescription: '',
        typeOfAsset: '',
        costOfAsset: '',
        isSaved: false
    });

    const [validateDate, setValidateDate] = useState({
        validateBranch: true,
        validateNoOfAsset: true,
        validateAssetName: true,
        validateAssetDescription: true,
        validateTypeOfAsset: true,
        validateCostOfAsset: true,
    });

    const validateAsset = () => {
        setValidateDate({
            validateBranch: !CommonFunction.isNullOrEmpty(assetData.branch),
            validateNoOfAsset: !CommonFunction.isNullOrEmptyOrZero(assetData.noOfAsset),
            validateAssetName: !CommonFunction.isNullOrEmpty(assetData.assetName),
            validateAssetDescription: !CommonFunction.isNullOrEmpty(assetData.assetDescription),
            validateTypeOfAsset: !CommonFunction.isNullOrEmpty(assetData.typeOfAsset),
            validateCostOfAsset: !CommonFunction.isNullOrEmptyOrZero(assetData.costOfAsset),
        });

        if (CommonFunction.isNullOrEmpty(assetData.branch)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.noOfAsset)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.assetName)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.assetDescription)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.typeOfAsset)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(assetData.costOfAsset)) {
            return false
        } else {
            return true;
        }
    };

    const onBranchChange = (newValue) => {
        setAssetData({ ...assetData, branch: newValue });
    };
    const onCostOfAssetChange = (newValue) => {
        setAssetData({ ...assetData, costOfAsset: newValue });
    };
    const onTypeOfAssetChange = (newValue) => {
        setAssetData({ ...assetData, typeOfAsset: newValue });
    };
    const onAssetDescriptionChange = (newValue) => {
        setAssetData({ ...assetData, assetDescription: newValue });
    };

    const onAssetNameChange = (newValue) => {
        setAssetData({ ...assetData, assetName: newValue });
    };

    const onNoOfAssetChange = (newValue) => {
        setAssetData({ ...assetData, noOfAsset: newValue });
    };

    const createAsset = async (event) => {
        try {
            event.preventDefault();
            if (!validateAsset())
                return;
            const asset = {
                branchId: assetData.branch,
                noOfAsset: assetData.noOfAsset,
                assetName: assetData.assetName,
                assetDescription: assetData.assetDescription,
                typeOfAsset: assetData.typeOfAsset,
                costOfAsset: assetData.costOfAsset
            }
            setLoading(true);
            let response = await apiService.httpPost('Asset/SaveAsset', asset);
            if (response.status) {
                setAssetData({ ...assetData, isSaved: true });
                setAssetList({ asset: response.result });
                NotificationManager.success('Asset Saved Successfully...', '');
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
    }, []);

    return (
        <div>
            {loading ? <Loader /> : <span></span>}
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Create Asset</li>
                    </ol>
                </nav>
                <form noValidate className="row g-3 needs-validation" onSubmit={createAsset}>
                    <CustomInput
                        label="Asset Name"
                        value={assetData.assetName}
                        onChange={onAssetNameChange}
                        inputId="assetName"
                        type='text'
                        maxlength={50}
                        isRequried={true}
                        isValid={validateDate.validateAssetName}
                        message="Asset Name is required"
                    />
                    <CustomInput
                        label="Asset Description"
                        value={assetData.assetDescription}
                        onChange={onAssetDescriptionChange}
                        inputId="assetDescription"
                        type='text'
                        maxlength={50}
                        isRequried={true}
                        isValid={validateDate.validateAssetDescription}
                        message="Asset Description is required"
                    />
                    <CustomInput
                        label="Type Of Asset"
                        value={assetData.typeOfAsset}
                        onChange={onTypeOfAssetChange}
                        inputId="typeOfAsset"
                        type='text'
                        maxlength={50}
                        isRequried={true}
                        isValid={validateDate.validateTypeOfAsset}
                        message="Type Of Asset is required"
                    />
                    <CustomInput
                        label="Cost Of Asset"
                        value={assetData.costOfAsset}
                        onChange={onCostOfAssetChange}
                        inputId="costOfAsset"
                        type='number'
                        maxlength={3}
                        isRequried={true}
                        isValid={validateDate.validateCostOfAsset}
                        message="Cost Of Asset is required and not zero"
                    />
                    <CustomInput
                        label="No Of Asset"
                        value={assetData.noOfAsset}
                        onChange={onNoOfAssetChange}
                        inputId="noOfAsset"
                        type='number'
                        maxlength={3}
                        isRequried={true}
                        isValid={validateDate.validateNoOfAsset}
                        message="No Of Asset is required and not zero"
                    />
                    <CustomSelect
                        options={branchlist.branch}
                        onChange={onBranchChange}
                        label="Branch"
                        value={assetData.branch}
                        isRequried={true}
                        isValid={validateDate.validateBranch}
                        message="Branch is required"
                    />
                    {!assetData.isSaved ? <button type="submit" className="btn btn-primary">Create Asset</button> : ''}
                    {assetData.isSaved ?
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Asset Name</th>
                                    <th scope="col">Asset Description</th>
                                    <th scope="col">Asset Type</th>
                                    <th scope="col">Asset Code</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            {assetList.asset?.length == 0 || assetList.asset == null ?
                                <tbody>
                                    <tr>
                                        <td colSpan="5">
                                            No Record found
                                        </td>
                                    </tr>
                                </tbody> :
                                <tbody>
                                    {assetList.asset.map(item => (
                                        <tr key={item.assetId}>
                                            <td> <Link tag={Link} to={'/EditAsset/' + item.assetId}>{item.assetName}</Link></td>
                                            <td>{item.assetDescription}</td>
                                            <td>{item.assetType}</td>
                                            <td>{item.AssetCode}</td>
                                            <td>{item.assetCost}</td>
                                            <td>{item.AssetStatus}</td>
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

export default CreateAsset;
