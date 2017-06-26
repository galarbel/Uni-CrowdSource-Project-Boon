import React, {PropTypes} from "react";
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import api from "../../api/Api";
import {boonLogoBase64, registerGiftPic} from "./Base64Images";
import {asYouType, isValidNumber} from 'libphonenumber-js';

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = { registerError: null, step1 : true, phone: "+972 "};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkUserNamePassword = this.checkUserNamePassword.bind(this);
        this.doRegister = this.doRegister.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        let val = event.target.value;

        if (event.target.name === "phone") {
            val = val === "" ? "+" : val;
            //val = new asYouType().input(val); //doesn't work well on mobile
        }
        this.setState({ [name] : val } );
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

        if (!isValidNumber(this.state.phone)) {
            this.setState({registerError: "Invalid Phone Number"});
            return;
        }

        this.setState({registerError: null});

        const requestParams = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            phone: new asYouType().input(this.state.phone),
            email: this.state.email,
            deviceId: localStorage.getItem("registrationId") || ""
        };

        api.doRegister(requestParams).then(
            response => {
                if (!response) {
                    throw new Error("Server Not Available");
                }

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
                    <img src={boonLogoBase64}/>
                    <br/><br/>
                    <img src={registerGiftPic} style={{width: "49%"}} />
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
