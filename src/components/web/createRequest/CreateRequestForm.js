import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import TextAreaInput from "../../common/TextAreaInput";
import moment from "moment";
import * as createRequestActions from "../../../actions/createRequestActions";
import LoadingProgress from "../../common/LoadingProgress";
import Button from "../../common/Button";
import EditRequestForm from '../myRequests/RequestForm';


const buttonNames = {
    CLEAR: "Clear",
    SUBMIT: "Submit"
};
const initialState = {
    categoryId: "",
    dateFrom: moment(),
    dateTo: moment(),
    halfDay: false,
    total: "",
    reason: "",
    awayMsg: ""
};

// TODO: add form validation and errors
// TODO: handle mobile layout

class CreateRequestForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleEditForm = this.handleEditForm.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = Object.assign({}, initialState,{emptied: 0});

    }

    componentWillMount() {
        if (this.props.options[0]) {
            this.setState({
                categoryId: this.props.options[0].id
            });
        }
    }
    handleEditForm(key, value){
        this.setState({
            [key] : value
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleButton(event) {
        event.preventDefault();
        const targetName = event.currentTarget.name;

        switch (targetName) {
            case buttonNames.CLEAR: {
                this.setState({emptied: this.state.emptied+1});
                this.setState(initialState);
                break;
            }
            case buttonNames.SUBMIT: {
                const {categoryId, dateFrom, dateTo, halfDay, reason, awayMsg} = this.state;
                const formData = {categoryId, dateFrom, dateTo, halfDay, reason, awayMsg};
                this.setState({loadingSubmit: true});
                this.props.actions.createRequest(formData)
                    .then(createdRequest => {
                        this.setState({loadingSubmit: false});
                        this.props.onSuccess(createdRequest);
                    })
                    .catch(error => {
                        alert(error);
                    });
                break;
            }

            case buttonNames.CALCULATE: {
                const formData = {
                    categoryId: this.state.categoryId,
                    dateFrom: this.state.dateFrom,
                    dateTo: this.state.dateTo,
                    halfDay: this.state.halfDay
                };
                this.setState({loadingCalculate: true});
                this.props.actions.getCalculatedDays(formData)
                    .then(calculatedDays => {
                        this.setState({total: calculatedDays.total, loadingCalculate: false});
                    })
                    .catch(error => {
                        alert(error);
                    });
                break;
            }
        }
    }

    render() {
        const {awayMsg, loadingSubmit, emptied} = this.state;

        return (
            <div className="createRequestForm">
                    <div key={emptied}>
                    <EditRequestForm onChange={this.handleEditForm} isEdit={false}/>
                    </div>
                    <div style={{}}>
                        <TextAreaInput name="awayMsg" label="Away Message" placeholder="Enter an away message" value={awayMsg} onChange={this.handleInputChange} />
                    </div>
                    <div style={{marginTop: "1em", display: "flex"}}>
                        <Button icon="check" onClick={this.handleButton} label={buttonNames.SUBMIT} name={buttonNames.SUBMIT} />
                        <Button icon="trash-o" onClick={this.handleButton} label={buttonNames.CLEAR} name={buttonNames.CLEAR} secondary />
                        {loadingSubmit && <LoadingProgress fullPage={false} size={30} thickness={2} style={{marginLeft: "1em"}} />}
                    </div>
            </div>
        );
    }

}

CreateRequestForm.propTypes = {
    actions: PropTypes.object,
    onSuccess: PropTypes.func.isRequired, // To update state on the parent page
    options: PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        options: state.employeeInfo.absenceTypes
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(createRequestActions, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateRequestForm);
