import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Cab from "../../../../resources/img/VacationRelatedInfo-BG.jpg";
import LoadingProgress from "../../common/LoadingProgress";

class AbsenceRelatedInfo extends React.Component {
    //TODO: get actual link for "More information can be found ..."

    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.loading) {
            return (
                <LoadingProgress />
            );
        }
        const {periodicAssignment, periodicAssignmentPeriod, availableBalance, futureBalanceAsOfDate, futureBalance, unit} = this.props.absenceRelatedInfo;
        return (
            <div className="absenceRelatedInfo">
                <img src={Cab} style={{width:'100%',marginBottom:'-10px'}}/>
                <div className="inner-wrapper">
                    <div style={{padding: "10px"}}>
                        <div className="two-columns">
                            <span >Periodic Assignment: ({`${periodicAssignmentPeriod}`})</span>
                            <span className="left-pad">{`${periodicAssignment} ${unit}`}</span>
                        </div>
                        <div className="two-columns">
                            <span >Balance as of today:</span>
                            <span className="left-pad">{`${availableBalance} ${unit}`}</span>
                        </div>
                        <div className="two-columns" style={{marginBottom: "1em"}}>
                            <span >Balance as of {`${futureBalanceAsOfDate}*`}:</span>
                            <span className="left-pad">{`${futureBalance} ${unit}`}</span>
                        </div>
                        <div style={{fontSize:'12px'}}>
                            * Balance includes pending requests, approved requests & periodic assignments.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


AbsenceRelatedInfo.propTypes = {
    absenceRelatedInfo: PropTypes.object,
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        absenceRelatedInfo: state.employeeInfo.absenceRelatedInfo,
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(AbsenceRelatedInfo);
