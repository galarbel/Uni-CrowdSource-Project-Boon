import React, {PropTypes} from "react";
import {Link} from 'react-router';
import TextInput from '../common/TextInput';
import Button from '../common/Button';

const RegisterStep1 = ({registerError, handleInputChange, checkUserNamePassword}) => {
    return (
        <div>
            <div>
                <TextInput label="" name="username" onChange={handleInputChange} placeholder="Username" />
                <TextInput label="" name="password" onChange={handleInputChange} placeholder="Password" type="password" />
                <TextInput label="" name="repeat" onChange={handleInputChange} placeholder="Repeat Password" type="password" />
            </div>
            {
                registerError &&
                <div className="error-div" style={{color:"red", marginBottom: "20px"}}>{registerError}</div>
            }
            <div>
                <Button onClick={checkUserNamePassword} label="Next" style={{width: "100%", padding: "6px 12px"}} />
            </div>
            <div style={{textAlign: "center", paddingTop: "30px"}}>
                <Link name="1" to="/login">Already Have An Account? Login Here</Link>
            </div>
        </div>
    );
};

RegisterStep1.propTypes = {
    registerError: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    checkUserNamePassword: PropTypes.func.isRequired
};

export default RegisterStep1;
