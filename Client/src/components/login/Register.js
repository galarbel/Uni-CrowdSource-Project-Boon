import React, {PropTypes} from "react";
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import boonLogo from '../../../resources/img/boon-logo-word.png';
import giftPic from '../../../resources/img/gift-register.png';
import api from "../../api/Api";

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = { registerError: null, step1 : true };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkUserNamePassword = this.checkUserNamePassword.bind(this);
        this.doRegister = this.doRegister.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name] : event.target.value } );
    }

    checkUserNamePassword() {
        if (!(this.state.username && this.state.password && this.state.repeat)) {
            this.setState({registerError: "Please Fill in all required information"});
            return;
        }
        if (this.state.password !== this.state.repeat) {
            this.setState({registerError: "Passwords don't match"});
            return;
        }

        this.setState({registerError: null});

        const requestParams = {
            username: this.state.username,
            password: this.state.password
        };

        api.checkUserNamePassword(requestParams).then(
            response => {
                if (!response) {
                    throw new Error("Server Not Available");
                }
                if (!response.isAvailable) {
                    throw new Error("Username taken");
                }
                this.setState({step1: false});
            }
        ).catch(e => {
            this.setState({registerError: e.message});
        });
    }

    doRegister() {
        if (!(this.state.name && this.state.email && this.state.phone)) {
            this.setState({registerError: "Please Fill in all required information"});
            return;
        }

        this.setState({registerError: null});

        const requestParams = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email
        };

        api.doRegister(requestParams).then(
            response => {
                if (!response) {
                    throw new Error("Server Not Available");
                }
                //todo handle username taken by the time of check to register
                if (!response.username || !response.password) {
                    throw new Error("Error in registration");
                }

                localStorage.setItem("userDetails", JSON.stringify({username: requestParams.username, password: requestParams.password}));
                let currentUrl = window.location.href;
                window.location = currentUrl.replace("register","catalog");
            }
        ).catch(e => {
            this.setState({registerError: e.message});
        });

    }

    render() {
        return (
            <div className="login-page" style={{width: "80%", margin: "auto"}}>
                <div style={{textAlign: "center", paddingTop: "40px"}}>
                    <img src={boonLogo}/>
                    <br/><br/>
                    <img src={giftPic} style={{width: "49%"}} />
                </div>
                {
                    this.state.step1 &&
                        <RegisterStep1 handleInputChange={this.handleInputChange}
                                       checkUserNamePassword={this.checkUserNamePassword}
                                       {...this.state}/>
                }

                {
                    !this.state.step1 &&
                    <RegisterStep2 handleInputChange={this.handleInputChange}
                                   doRegister={this.doRegister}
                                   {...this.state}/>
                }
            </div>
        );
    }
}


LoginPage.propTypes = {

};

export default LoginPage;
