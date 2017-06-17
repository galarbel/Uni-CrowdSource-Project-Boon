import React, {PropTypes} from "react";
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import {Link} from 'react-router';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as loginActions from "../../actions/LoginActions";
import LoadingProgress from '../common/LoadingProgress';
import {boonLogoBase64, loginGiftPicBase64} from './Base64Images';

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = { username : "", password: ""  };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    componentWillMount() {
        if (!this.props.loggedIn && localStorage.getItem("userDetails")) {
            const userDetails = JSON.parse(localStorage.getItem("userDetails"));
            this.props.actions.doLogin(userDetails);
        }
    }

    handleInputChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    onLoginClick(event) {
        this.props.actions.doLogin({username: this.state.username, password: this.state.password, deviceId: localStorage.getItem("registrationId") || ""});
    }

    render() {
        if (this.props.loading || this.props.loggedIn) {
            return (<LoadingProgress />);
        }

        return (
            <div className="login-page" style={{width: "80%", margin: "auto"}}>
                <div style={{textAlign: "center", paddingTop: "40px"}}>
                    <img src={boonLogoBase64}/>
                    <br/><br/>
                    <img src={loginGiftPicBase64} style={{width: "65%"}} />
                </div>
                <div>
                    <TextInput label="" name="username" onChange={this.handleInputChange} placeholder="Email" value={this.state.username} />
                    <TextInput label="" name="password" onChange={this.handleInputChange} placeholder="Password" type="password" value={this.state.password} />
                </div>
                <div>
                    <Button onClick={this.onLoginClick} label="Login" style={{width: "100%", padding: "6px 12px"}} />
                </div>
                <div style={{textAlign: "center", paddingTop: "30px"}}>
                    <Link name="0" to="/register">Don't Have An Account? Register Here</Link>
                </div>
            </div>
        );
    }
}


LoginPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        loggedIn: state.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
