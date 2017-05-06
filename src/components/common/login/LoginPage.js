import React, {PropTypes} from "react";
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';
import {Link} from 'react-router';
import boonLogo from '../../../../resources/img/boon-logo-word.png';
import giftPic from '../../../../resources/img/gift.png';

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        //this.state = {open: false, title:'TimeOff Request'};
    }

    render() {
        return (
            <div className="login-page" style={{width: "80%", margin: "auto"}}>
                <div style={{textAlign: "center", paddingTop: "40px"}}>
                    <img src={boonLogo}/>
                    <br/><br/>
                    <img src={giftPic} style={{width: "65%"}} />
                </div>
                <div>
                    <TextInput label="" name="username" onChange={() => {}} placeholder="Email" />
                    <TextInput label="" name="username" onChange={() => {}} placeholder="Password" type="password" />
                </div>
                <div>
                    <Button onClick={() => {}} label="Login" style={{width: "100%", padding: "6px 12px"}} />
                </div>
                <div style={{textAlign: "center", paddingTop: "30px"}}>
                    <Link name="0" to="/register">Don't Have An Account? Register Here</Link>
                </div>
            </div>
        );
    }
}


LoginPage.propTypes = {

};

export default LoginPage;
