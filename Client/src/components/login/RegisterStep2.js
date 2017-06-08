import React, {PropTypes} from "react";
import TextInput from '../common/TextInput';
import Button from '../common/Button';

const RegisterStep1 = ({registerError, handleInputChange, doRegister, username, phone = ""}) => {
    return (
        <div>
            <div>
                <TextInput label="" name="username" value={username} onChange={handleInputChange} disabled placeholder="Full Name" />
                <TextInput label="" name="name" onChange={handleInputChange} placeholder="Full Name" />
                <TextInput label="" name="email" onChange={handleInputChange} placeholder="Email"  />
                <TextInput label="" name="phone" onChange={handleInputChange} placeholder="Phone" value={phone}  />
            </div>
            {
                registerError &&
                <div className="error-div" style={{color:"red", marginBottom: "20px"}}>{registerError}</div>
            }
            <div>
                <Button onClick={doRegister} label="Register" style={{width: "100%", padding: "6px 12px"}} />
            </div>
        </div>
    );
};

RegisterStep1.propTypes = {
    username: PropTypes.string.isRequired,
    registerError: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    doRegister: PropTypes.func.isRequired,
    phone: PropTypes.string
};

export default RegisterStep1;
