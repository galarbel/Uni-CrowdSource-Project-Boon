import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as absenceActions from "../../../actions/employeeActions";
import LoadingProgress from '../../common/LoadingProgress';
import FilterForm from "./FilterMyRequestsForm";
import MyRequestsTable from "./MyRequestsTable";

class MyRequestsPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {filteredAbsences: []};

        this.onFilterChange = this.onFilterChange.bind(this);
    }

    componentWillMount() {
        this.props.actions.getMyAbsences();
        this.props.actions.getAbsenceTypes();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filteredAbsences: nextProps.myAbsences});
    }

    onFilterChange(filterFun) {
        const res = this.props.myAbsences.filter(filterFun);
        this.setState({filteredAbsences:res});
    }

    render() {
        if (this.props.loading) {
            return (
                <LoadingProgress />
            );
        }
        return (
            <div style={{margin: 20}} id="myRequestsMainDiv">
                <h2>My Requests</h2>
                <div className="inlineBlock">
                    <FilterForm onFilterChange={this.onFilterChange} absenceTypes={this.props.absenceTypes}/>
                </div>
                <div className="inlineBlock requestsTables">
                    <MyRequestsTable  data={this.state.filteredAbsences}/>
                </div>
            </div>
        );
    }
}

MyRequestsPage.propTypes = {
    myAbsences: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    absenceTypes: PropTypes.array.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        myAbsences: state.employeeInfo.myAbsences,
        loading: state.ajaxCallsInProgress > 0,
        absenceTypes: state.employeeInfo.absenceTypes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(absenceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsPage);
