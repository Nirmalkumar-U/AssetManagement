import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CommonFunction from '../../core/CommonFunctions/CommonFunction';
import Loader from '../../core/CustomComponent/Loader';
import apiService from '../../core/services/apiService';
import LocalStore from '../../core/CommonFunctions/LocalStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let userId = LocalStore.getItem('UserId');
        if (userId != null || userId != undefined) {
            navigate('/home');
        }
    }, [navigate]);

    const [userData, setUserData] = useState({
        emailId: '',
        password: ''
    });
    const [validateData, setValidateData] = useState({
        validateEmailId: true,
        validatePassword: true,
    });

    const onEmailIdChange = (newValue) => {
        setUserData({ ...userData, emailId: newValue });
    };
    const onPasswordChange = (newValue) => {
        setUserData({ ...userData, password: newValue });
    };

    const validateLogin = () => {
        console.log("test");
        setValidateData({
            validateEmailId: CommonFunction.validateField(userData.emailId, "string"),
            validatePassword: CommonFunction.validateField(userData.password, "string"),
        });
        if (CommonFunction.isNullOrEmpty(userData.emailId)) {
            return false
        } else if (CommonFunction.isNullOrEmpty(userData.password)) {
            return false
        } else {
            return true
        }
    };

    const loginUser = async (event) => {
        try {
            event.preventDefault();
            if (!validateLogin())
                return;
            setLoading(true);
            let response = await apiService.httpGet(`User/Login?email=${userData.emailId}&password=${userData.password}`);
            if (response.status) {
                let result = await apiService.httpPost('User/CreateToken', response.result);
                if (result.status) {
                    LocalStore.setAllItems(result.result.claims);
                    NotificationManager.success(response.message[0], '');
                    navigate('/home');
                }
            } else {
                NotificationManager.error(response.message[0], '');
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    return (
        <span className="">
            {loading ? <Loader /> : <span></span>}
            <div className="card align-items-center b-w-0">
                <form noValidate className="row card-body w-25" onSubmit={loginUser}>
                    <div className="bg-white shadow rounded p-3">
                        <div className="col-md-12">
                            <label className="form-label fw-bolder">Email Id </label><span className="fw-bolder text-danger">*</span>
                            <input type="text" id="emailId" className="form-control" value={userData.emailId} required={true} onChange={(e) => onEmailIdChange(e.target.value)} />
                            {validateData.validateEmailId ? "" : <div className="invalid-feedback fw-bolder">
                                Email Id is required
                            </div>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label fw-bolder">Password </label><span className="fw-bolder text-danger">*</span>
                            <input type="password" id="password" className="form-control" value={userData.password} required={true} onChange={(e) => onPasswordChange(e.target.value)} />
                            {validateData.validatePassword ? "" : <div className="invalid-feedback fw-bolder">
                                Password is required
                            </div>}
                        </div>
                        <button type="submit" id="login" className="btn btn-primary mt-3">Login</button>
                    </div>
                </form>
            </div>
            <NotificationContainer />
        </span>
    );
};

export default Login;
