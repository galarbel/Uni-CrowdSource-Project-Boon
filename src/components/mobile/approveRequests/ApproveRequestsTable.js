import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoadingProgress from '../../common/LoadingProgress';
import MyRequestsRow from './ApproveRequestRow';

class ApproveRequestsTable extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.loading) {
            return (
                <LoadingProgress />
            );
        }
        return (
            <div>
                {this.props.managerPendingAbsences.map((row,index) =>
                    <MyRequestsRow key={index} data={row}/>
                )}
            </div>
        );
    }
}

ApproveRequestsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    managerPendingAbsences: PropTypes.array.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        managerPendingAbsences: state.managerInfo.managerPendingAbsences,
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(ApproveRequestsTable);

