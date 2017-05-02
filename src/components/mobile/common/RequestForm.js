import React, {PropTypes} from "react";
import api from "../../../api/Api";

import TextAreaInput from "../../common/TextAreaInput";
import ToggleInput from "../../common/ToggleInput";
import moment from "moment";
import LoadingProgress from "../../common/LoadingProgress";
import Button from "../../common/Button";
import Divider from 'material-ui/Divider';
import DatePickerInput from "../../common/DatePickerInput";
import AbsenceTypeInput from "../../common/AbsenceTypeInput";
import TextInput from "../../common/TextInput";

const buttonNames = {
    CALCULATE: "Calculate Absence"
};
const initialState = {
    loading: false,
    categoryId: "0100",
    dateFrom: moment(),
    dateTo: moment(),
    halfDay: false,
    total: "1 Days",
    reason: "",
    modReason : ""
};

const styles = {
    headers : {
        color: '#e65785',
        fontWeight: 'bold'
    }
};
// TODO: add form validation and errors
// TODO: handle mobile layout

class EditRequestForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange_DateFrom = this.handleChange_DateFrom.bind(this);
        this.handleChange_DateTo = this.handleChange_DateTo.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.ajaxLoadRequestDetails = this.ajaxLoadRequestDetails.bind(this);
        this.handleSelectInputChange = this.handleSelectInputChange.bind(this);

        this.state = Object.assign({}, initialState);
    }

    componentWillMount() {
        if (this.props.isEdit){
            this.ajaxLoadRequestDetails(this.props.requestNumber);
        }
        this.handleChange_DateFrom(null,moment(this.state.dateFrom));
        this.handleChange_DateTo(null,moment(this.state.dateTo));
    }

    ajaxLoadRequestDetails(requestNumber) {
        this.setState({loading: true});
        api.getRequestDetails(requestNumber).then(
            requestDetails =>   {
                this.handleChange_DateFrom(null,moment(requestDetails.dateFrom));
                this.handleChange_DateTo(null,moment(requestDetails.dateTo));
                this.setState({
                    categoryId: requestDetails.categoryId,
                    halfDay: parseFloat(requestDetails.total) == 0.5,
                    total: requestDetails.total,
                    reason: requestDetails.reason,
                    loading: false
                });
            }
        ).catch(error => {
            // TODO handle
        });
    }


    handleInputChange(event) {
        //debugger;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        this.props.onChange(name,value);
        //debugger;
    }

    handleSelectInputChange(event,index,value){
        //debugger;
        this.setState({
            categoryId: value
        });
        this.props.onChange('categoryId',value);
    }

    handleChange_DateFrom(event,dateFrom) {
        //debugger;
        const newDateFrom = moment(dateFrom);
        this.setState({dateFrom: newDateFrom});
        if (newDateFrom.isAfter(this.state.dateTo)){
            this.handleChange_DateTo(null,newDateFrom.format('YYYY-MM-DD'));
        }
        //debugger;
        this.props.onChange('dateFrom',newDateFrom.format('YYYY-MM-DD'));
    }

    handleChange_DateTo(event,dateTo) {
        const newDateTo = moment(dateTo);
        this.setState({dateTo: newDateTo});
        if (newDateTo.isBefore(this.state.dateFrom)){
            this.handleChange_DateFrom(null,newDateTo.format('YYYY-MM-DD'));
        }
        //debugger;
        this.props.onChange('dateTo',newDateTo.format('YYYY-MM-DD'));
    }

    handleCalculate(event) {
        event.preventDefault();
        const formData = {
            categoryId: this.state.categoryId,
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            halfDay: this.state.halfDay
        };
        this.setState({loadingCalculate: true});
        //debugger;
        api.getCalculatedDays(formData)
            .then(calculatedDays => {
                this.setState({total: calculatedDays.total, loadingCalculate: false});
            })
            .catch(error => {
                // TODO handle
            });
    }

    render() {
        const {categoryId, loadingCalculate,halfDay, loadingSubmit,loading,dateFrom, dateTo,  total, reason} = this.state;
        if (loading){
            return (<LoadingProgress fullPage={false} size={100} style={{ textAlign: "center", margin: "30px"}}/>);
        }
            return (
                <form className="editRequestForm">
                    <fieldset disabled={loadingSubmit}>
                            {!this.props.isEdit && <div>
                                <div style={styles.headers} >Absence Type</div>
                                <div>
                                    <AbsenceTypeInput
                                        name="categoryId"
                                        label=""
                                        style={{width:'100%'}}
                                        value={categoryId}
                                        onChange={this.handleSelectInputChange} />
                                </div>
                            </div>}
                            <div>
                                <div style={styles.headers}>Start Date</div>
                                <div>
                                    <div>
                                    <DatePickerInput
                                        name="dateFrom"
                                        label=""
                                        textFieldStyle = {{cursor:'pointer',width:'100%'}}
                                        onChange={this.handleChange_DateFrom}
                                        value={new Date(dateFrom)}
                                        disabled={loadingSubmit}
                                        container="dialog"/>
                                    </div>
                                </div>
                                <div>
                                    <div style={styles.headers}>
                                        End Date
                                    </div>
                                    <div>
                                    <DatePickerInput
                                        name="dateTo"
                                        label=""
                                        textFieldStyle = {{cursor:'pointer',width:'100%'}}
                                        onChange={this.handleChange_DateTo}
                                        value={new Date(dateTo)}
                                        disabled={halfDay || loadingSubmit}
                                        container="dialog"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="inlineBlock verticalAlignBottom" style={styles.headers}>Half Day</div>
                                <div className="inlineBlock verticalAlignBottom" style={{float:'right'}}><ToggleInput name="halfDay" label="" toggled={halfDay} onToggle={this.handleInputChange} /></div>
                            </div>
                            <div>
                                <div style={styles.headers}>Reason</div>
                                {this.props.isEdit ?
                                    <div>{"undefined" === typeof reason || reason == ""  ? reason : "None"}</div>
                                    : <div><TextInput name="reason" label="" placeholder="Enter a reason" value={reason} onChange={this.handleInputChange} /></div>}
                            </div>
                            <div style={{marginTop:'5px'}}>
                                <div style={{float:'right'}}>{loadingCalculate && <LoadingProgress fullPage={false} size={30} thickness={2} />}</div>
                                <div >
                                    <Button icon="calculator"
                                            onClick={this.handleCalculate}
                                            disabled={loadingCalculate}
                                            label={buttonNames.CALCULATE}
                                            name={buttonNames.CALCULATE}
                                    />
                                </div>
                            </div>
                        <Divider/>
                        <div className="form-group" style={{marginTop : 5}}>
                            {total != "" &&<label htmlFor="total"><b>Total Absence Duration <span style={{marginLeft:'50px'}}>{total}</span></b></label>}
                            {false && <div style={{display: "flex"}}>
                                <input name="total" type="text" disabled value={total} />
                            </div>}
                        </div>
                        <Divider/>
                        {this.props.isEdit && <TextAreaInput name="modReason" label="Modification Reason" placeholder="Enter a reason" onChange={this.handleInputChange} />}
                    </fieldset>
                </form>
            );
        }
    }


EditRequestForm.propTypes = {
    requestNumber : PropTypes.string,
    onChange : PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired
};


export default EditRequestForm;
