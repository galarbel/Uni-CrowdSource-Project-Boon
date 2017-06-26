import React, {PropTypes} from "react";
import LoadingProgress from '../common/LoadingProgress';
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import api from "../../api/Api";
import {entries} from "../../utils/Utils";
import {asYouType, isValidNumber} from 'libphonenumber-js';

class MyBasicDetails extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {loading: 0, editDetailsError: null};

        this.loadMyDetails = this.loadMyDetails.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.editDetailsSubmit = this.editDetailsSubmit.bind(this);
    }

    componentWillMount() {
        this.loadMyDetails();
    }

    loadMyDetails() {
        this.setState({loading: this.state.loading + 1});
        api.getUserDetails().then(
            userDetails => {
                this.setState({userDetails, loading: this.state.loading - 1, phone:userDetails.phone, email: userDetails.email,fullname: userDetails.fullname});
            }
        ).catch(e => {
            //TODO
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        let val = event.target.value;

        if (event.target.name === "phone") {
            val = val === "" ? "+" : val;
            //val = new asYouType().input(val);
        }
        this.setState({ [name] : val } );
    }

    editDetailsSubmit() {
        if (!(this.state.email && this.state.phone)) {
            this.setState({editDetailsError: "Please Fill in all required information"});
            return;
        }

        if (!isValidNumber(this.state.phone)) {
            this.setState({editDetailsError: "Invalid Phone Number"});
            return;
        }

        this.setState({editDetailsError: null});

        const requestParams = {
            phone: new asYouType().input(this.state.phone),
            email: this.state.email
        };
        this.setState({loading: this.state.loading + 1});
        api.updateUserDetails(requestParams).then(
            response => {
                this.loadMyDetails();
                this.setState({loading: this.state.loading -1});
                this.props.toggleEditMode();
            }
        ).catch(e => {
            //TODO
            //this.setState({editDetailsError: e.message});
        });
    }

    printTable(data) {
        let retValue = [];
        for (let [key, value] of entries(data)) {
            retValue.push(
                <tr key={key}>
                    <th>{key}:</th>
                    <td>{value}</td>
                </tr>);
        }
        return retValue;
    }

    render() {
        if (this.state.loading > 0 ) {
            return (
                <div style={{textAlign:"center", margin: "50px 20px 0 0"}}>
                    <LoadingProgress fullPage={false}  size={90} thickness={4}/>
                </div>
            );
        }

        const isEdit = this.props.isEditMode;
        let {username, score, phone, email,fullname} = Object.assign({}, this.state.userDetails, isEdit ? this.state : {});
        const tableValues = {
            Username: username,
            Score: score,
            Phone: isEdit ? <TextInput name="phone" value={phone} onChange={this.handleInputChange}/> : phone,
            Email: isEdit ? <TextInput name="email" value={email} onChange={this.handleInputChange}/> : email,
            Name: fullname
        };

        return (
            <div>
                <table className="details-table" >
                    <tbody>
                    {
                        this.printTable(tableValues)
                    }
                    </tbody>
                </table>

                <div style={{height: 30}}>
                {isEdit && <Button onClick={this.editDetailsSubmit} label="Submit" />}
                {isEdit && this.state.editDetailsError && <div className="alert">{this.state.editDetailsError}</div>}
                </div>
            </div>

        );
    }
}


MyBasicDetails.propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    toggleEditMode: PropTypes.func.isRequired
};


export default MyBasicDetails;
