import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as managerActions from "../../../actions/managerActions";
import ApproveRequestsTable from './ApproveRequestsTable';
import 'react-table/react-table.css';

class ApproveRequestsPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.props.actions.getManagerPendingAbsences();
        this.state = {managerPendingAbsences : []};
    }

    componentWillUpdate() {
        this.props.actions.getManagerPendingAbsences();
    }

    render() {
        return (
            <div style={{margin: 20}} className="requestsTables">
                <h2>Approve Requests</h2>
                <ApproveRequestsTable/>
            </div>
        );
    }
}

ApproveRequestsPage.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(managerActions, dispatch)
    };
}

export default connect(() => { return {}; }, mapDispatchToProps)(ApproveRequestsPage);
