import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as absenceActions from "../../../actions/employeeActions";
import LoadingProgress from "../../common/LoadingProgress";
import CreateRequestForm from "./CreateRequestForm";
import SuccessInfo from "./SuccessInfo";


class CreateRequestPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.showSuccessInfo = this.showSuccessInfo.bind(this);
    }



    showSuccessInfo(createdRequest) {
        this.setState({createdRequest});
    }

    render() {
        if (this.props.loading) {
            return (
                <LoadingProgress />
            );
        }

        const {createdRequest} = this.state;

        return (
            <div className="createRequestPage pagePadding">
                {
                    createdRequest
                        ?
                        <div>
                            <SuccessInfo createdRequest={createdRequest} />
                        </div>
                        :
                        <div className="top-sections">
                            <CreateRequestForm onSuccess={this.showSuccessInfo} />
                        </div>
                }
            </div>
        );
    }
}

CreateRequestPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(absenceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequestPage);
