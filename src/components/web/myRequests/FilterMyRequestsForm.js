import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import ToggleInput from "../../common/ToggleInput";
import DatePickerInput from "../../common/DatePickerInput";
import Checkbox from '../../common/CheckboxInput';
import moment from "moment";
import * as createRequestActions from "../../../actions/createRequestActions";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const initialState = {
    dateFrom: moment().startOf('year'),
    dateTo: moment().endOf('year'),
    absenceStatuses:[{name:'Pending',isChecked:true,id:'0'},{name:'Approved',isChecked:true,id:'1'},{name:'Rejected',isChecked:false,id:'2'},{name:'Deleted',isChecked:false,id:'3'}],
    ShowAllAbsencesTypes : true,
    ShowAllAbsencesStatuses : true,
    defaultTypes: ['0100','0200'], //Vacation and Sick should be always visible.
    statusesExpanded: false
};

// TODO: add form validation and errors
// TODO: handle mobile layout
const subHeaderStyle= {fontWeight:'bold',paddingLeft:'0px', fontSize:'16px'};

class FilterMyRequestsForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        let absenceTypes = {};
        this.props.absenceTypes.map(item => (
            absenceTypes[item.id] = {
                id: item.id,
                name: item.name,
                isChecked :initialState.defaultTypes.indexOf(item.id) > -1
            }));
        this.state = Object.assign({}, initialState,{absenceTypes});

        this.handleDatePickerFromChange = this.handleDatePickerFromChange.bind(this);
        this.handleDatePickerToChange = this.handleDatePickerToChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleCollapsible = this.handleCollapsible.bind(this);
    }

    componentDidMount() {
        this.handleDatePickerFromChange(null,this.state.dateFrom);
        this.handleDatePickerToChange(null,this.state.dateTo);
    }

    componentDidUpdate(){
        this.updateFilteredResults();
    }

    handleCheckboxChange(event){
        const target = event.target;
        const id = target.id;
        let obj = {};
        if (id.length > 1){ //Status ids are one-letter, Type ids are 4 letters long
            obj = this.state.absenceTypes[id];
        }else{
            obj = this.state.absenceStatuses[id];
        }
        obj.isChecked = !(obj.isChecked);
        this.setState({obj});
    }

    handleInputChange(event) {
        const target = event.target;
        const newValue = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        if (name == 'ShowAllAbsencesTypes'){
            this.setState({statusesExpanded: !newValue});
        }
        this.setState({
            [name]: newValue
        });
    }

    handleDatePickerFromChange(event,date) {
        this.setState({dateFrom: moment(date)});
    }

    handleDatePickerToChange(event,date) {
        this.setState({dateTo: moment(date)});
    }

    handleCollapsible(){
        const statusesExpanded = !(this.state.statusesExpanded);
        let ShowAllAbsencesTypes =  this.state.ShowAllAbsencesTypes;
        if (statusesExpanded && ShowAllAbsencesTypes){
            ShowAllAbsencesTypes = false;
        }
        this.setState({statusesExpanded, ShowAllAbsencesTypes});
    }

    updateFilteredResults() {
        const dateFrom      = this.state.dateFrom;
        const dateTo        = this.state.dateTo;
        const types         = this.state.absenceTypes;
        const statuses      = this.state.absenceStatuses;
        const ShowAllAbsencesTypes = this.state.ShowAllAbsencesTypes;
        const ShowAllAbsencesStatuses = this.state.ShowAllAbsencesStatuses;

        const filterFun = function (value) {
            const specificType = types[value.categoryId];
            const specificStatus = statuses.filter(status => status.name == value.status )[0];
            return(ShowAllAbsencesTypes || specificType.isChecked) &&
            (ShowAllAbsencesStatuses || specificStatus.isChecked) &&
            (dateFrom.isSameOrBefore(value.dateFrom)) &&
            (dateTo.isSameOrAfter(value.dateTo));
        };

        this.props.onFilterChange(filterFun);
    }

    render() {

        const {dateFrom, dateTo, absenceTypes, ShowAllAbsencesTypes, ShowAllAbsencesStatuses, absenceStatuses,statusesExpanded} = this.state;
        const statusButtonText = statusesExpanded ? 'Show less' : 'Show more...';
        return (
            <form id="filterForm">
                <fieldset>
                    <div className="form-group">
                        <Subheader style={subHeaderStyle}>Absence type</Subheader>
                        <ToggleInput className="types" name="ShowAllAbsencesTypes" label="All" toggled={ShowAllAbsencesTypes} onToggle={this.handleInputChange} />
                        <ReactCSSTransitionGroup
                            transitionName="AbsenceTypes"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            {this.props.absenceTypes.length > 0 && this.props.absenceTypes.filter((absence) => (this.state.defaultTypes.indexOf(absence.id)>-1 || statusesExpanded)).map((absence) => (
                                <Checkbox name={absence.name} label={absence.name} id={absence.id} key={absence.name} disabled={ShowAllAbsencesTypes} checked={absenceTypes[absence.id].isChecked} onCheck={this.handleCheckboxChange}/>
                            ))}
                            <a className="cp_link" style={{cursor: 'pointer'}} onClick={this.handleCollapsible}>{statusButtonText}</a>
                        </ReactCSSTransitionGroup>

                    </div>
                    <Divider />
                    <div className="form-group" >
                        <Subheader style={subHeaderStyle}>Status</Subheader>
                        <ToggleInput className="statuses" name="ShowAllAbsencesStatuses" label="All" toggled={ShowAllAbsencesStatuses} onToggle={this.handleInputChange} />
                        {absenceStatuses.map((status) => (
                            <Checkbox name={status.name} label={status.name} key={status.name} id={status.id} disabled={ShowAllAbsencesStatuses} checked={absenceStatuses[status.id].isChecked} onCheck={this.handleCheckboxChange}/>
                        ))}
                    </div>
                    <Divider />
                    <div className="form-group">
                        <DatePickerInput
                            name="dateFrom"
                            label="Start date"
                            onChange={this.handleDatePickerFromChange}
                            value={new Date(dateFrom)}/>
                        <DatePickerInput
                            name="dateTo"
                            label="End date"
                            onChange={this.handleDatePickerToChange}
                            value={new Date(dateTo)}/>
                    </div>
                </fieldset>
            </form>

        );

    }
}

FilterMyRequestsForm.propTypes = {
    actions: PropTypes.object.isRequired,
    absenceTypes: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(createRequestActions, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterMyRequestsForm);
