import React, { Component } from 'react';

import CustomInput from '../components/CustomComponent/CustomInput';
import apiService from './services/apiService';

export class Counter extends Component {
    state = {
        users: "",
        loading: true,
        inputValue: ''
    };

    handleInputChange = (newValue) => {
        this.setState({ inputValue: newValue }); // Updated the state key
    };

    async fetchUsers() {
        this.setState({ loading: true });
        try {
            const usersData = await apiService.httpGet('Asset/GetAsset');
            this.setState({ users: usersData.tt, loading: false });
        } catch (error) {
            console.error("Error fetching users:", error);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        //this.fetchUsers();
    }

    render() {
        return <form className="row g-3">
            <CustomInput
                label="First Name"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
                inputId="firstName"
                type='number'
                placeHolder='Name'
                isRequried={false}
            />
        </form>;
    }
}


