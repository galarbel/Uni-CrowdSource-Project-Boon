import React, {PropTypes} from "react";
import {connect} from "react-redux";
import LoadingProgress from '../../common/LoadingProgress';


class ReportsPage extends React.Component {

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
            <div style={{margin: 20}}>
                <h2>Time Off Reports</h2>
                (page goes here)
            </div>
        );
    }
}


ReportsPage.propTypes = {
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        loading: state.ajaxCallsInProgress > 0,
    };
}

export default connect(mapStateToProps)(ReportsPage);
