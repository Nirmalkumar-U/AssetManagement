import React, { Component } from 'react';
import { Container } from 'reactstrap';
import LocalStore from '../core/CommonFunctions/LocalStore';
import NavMenu from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;
    state = {
        userId:null,
    };

    render() {
        this.setState({ userId: LocalStore.getItem('UserId') });
        return (
            <div>
                {this.state.userId == null || this.state.userId == undefined ? <span></span> : <NavMenu></NavMenu>}
                <Container fluid>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
