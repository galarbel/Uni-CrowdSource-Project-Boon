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

        this.state = {loading: 0};

        this.loadMyDetails = this.loadMyDetails.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.loadMyDetails();
    }

    loadMyDetails() {
        this.setState({loading: this.state.loading + 1});
        api.getUserDetails().then(
            userDetails => {
                this.setState({userDetails, loading: this.state.loading - 1});
            }
        ).catch(e => {
            //TODO
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        let val = event.target.value;

        if (event.target.name === "phone") {
            val = new asYouType().input(val);
        }
        this.setState({ [name] : val } );
    }

    editDetailsSubmit() {

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
        let {username, score, phone, email} = Object.assign({}, this.state.userDetails, isEdit ? this.state : {});
        const tableValues = {
            Username: username,
            Score: score,
            Phone: isEdit ? <TextInput name="phone" value={phone} onChange={this.handleInputChange}/> : phone,
            Email: isEdit ? <TextInput name="email" value={email} onChange={this.handleInputChange}/> : email
        };

        return (
            <div>
                <table className="details-table">
                    <tbody>
                    {
                        this.printTable(tableValues)
                    }
                    </tbody>
                </table>

                {isEdit && <Button onClick={this.editDetailsSubmit} label="Submit" />}
            </div>

        );
    }
}


MyBasicDetails.propTypes = {
    isEditMode: PropTypes.bool.isRequired
};


export default MyBasicDetails;
