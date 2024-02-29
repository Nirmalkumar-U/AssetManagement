import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';
import Loader from '../../core/CustomComponent/Loader';
//import withRouter from '../../core/CustomComponent/withRouter';


export class Testorm extends Component {
    state = {
        loading: false,
        testid: ''
    };
    componentDidMount() {
        let id = this.props;
        console.log(id)
        this.setState({ testid: this.props.data.id });
        console.log('id'+this.state.testid);
    }

    clickfun() {
        console.log(this.state.testid);
    }

    render() {
        console.log('Props:', this.props)
        return <div>
            {this.state.loading ? <Loader /> : <span></span>}
            <div>
                {this.state.testid}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link tag={Link} to="/">Home</Link></li>
                        <li className="breadcrumb-item active" onClick={this.clickfun} aria-current="page">Test</li>
                    </ol>
                </nav>
            </div>
        </div>;
    }
}
