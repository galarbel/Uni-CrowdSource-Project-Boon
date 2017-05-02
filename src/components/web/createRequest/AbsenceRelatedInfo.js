import React, {PropTypes} from "react";
import {connect} from "react-redux";
import clockPerson from "../../../../resources/img/clockPerson.png";


class AbsenceRelatedInfo extends React.Component {
    //TODO: get actual link for "More information can be found ..."

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {periodicAssignment, periodicAssignmentPeriod, availableBalance, futureBalanceAsOfDate, futureBalance, unit} = this.props.absenceRelatedInfo;
        return (
            <div className="absenceRelatedInfo">

                <div className="inner-wrapper">
                    <div style={{padding: "10px"}}>
                        <h3>Absence Related Info</h3>
                        <div style={{marginBottom: "1em"}}>
                            More information can be found <a target="_blank" href="https://www.checkpoint.com">here</a>.
                        </div>
                        <div className="two-columns">
                            <span >Periodic Assignment: (on a {`${periodicAssignmentPeriod}`} basis)</span>
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
                    <img src={clockPerson} />
                </div>
            </div>
        );
    }
}


AbsenceRelatedInfo.propTypes = {
    absenceRelatedInfo: PropTypes.object
};

function mapStateToProps(state) {
    return {
        absenceRelatedInfo: state.employeeInfo.absenceRelatedInfo
    };
}

export default connect(mapStateToProps)(AbsenceRelatedInfo);
