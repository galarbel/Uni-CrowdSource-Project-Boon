import React, {PropTypes} from "react";
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';
import {Link} from 'react-router';
import boonLogo from '../../../../resources/img/boon-logo-word.png';
import giftPic from '../../../../resources/img/gift-register.png';

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="login-page" style={{width: "80%", margin: "auto"}}>
                <div style={{textAlign: "center", paddingTop: "40px"}}>
                    <img src={boonLogo}/>
                    <br/><br/>
                    <img src={giftPic} style={{width: "55%"}} />
                </div>
                <div>
                    <TextInput label="" name="username" onChange={() => {}} placeholder="Email" />
                    <TextInput label="" name="password" onChange={() => {}} placeholder="Password" type="password" />
                    <TextInput label="" name="repeat" onChange={() => {}} placeholder="Repeat Password" type="password" />
                </div>
                <div>
                    <Button onClick={() => {}} label="Login" style={{width: "100%", padding: "6px 12px"}} />
                </div>
            </div>
        );
    }
}


LoginPage.propTypes = {

};

export default LoginPage;
