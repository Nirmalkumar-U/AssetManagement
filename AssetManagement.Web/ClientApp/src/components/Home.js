import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalStore from '../core/CommonFunctions/LocalStore';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let userId = LocalStore.getItem('UserId');
        if (userId == null || userId === undefined) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="data-info">
                <div className="box">
                    <i className="fa-solid fa-house"></i>
                    <div className="data">
                        <p>user</p>
                        <span>100</span>
                    </div>
                </div>
                <div className="box">
                    <i className="fas fa-pen"></i>
                    <div className="data">
                        <p>posts</p>
                        <span>101</span>
                    </div>
                </div>
                <div className="box">
                    <i className="fas fa-table"></i>
                    <div className="data">
                        <p>product</p>
                        <span>102</span>
                    </div>
                </div>
                <div className="box">
                    <i className="fas fa-dollar"></i>
                    <div className="data">
                        <p>revenue</p>
                        <span>$100</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
