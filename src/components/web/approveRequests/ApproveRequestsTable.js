import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as managerActions from "../../../actions/managerActions";
import ReactTable from '../../common/react-table/ReactTableWrapper';
import 'react-table/react-table.css';
import RequestDetails from './RequestDetails';
import Dialog from '../../common/DialogWrapper';
import TextAreaInput from '../../common/TextAreaInput';
import Button from '../../common/Button';
import toastr from 'toastr';
import LoadingProgress from '../../common/LoadingProgress';
import api from "../../../api/Api";
import RejectIcon from '../../../../resources/svg/reject.svg';
import ApproveIcon from '../../../../resources/svg/approve.svg';
import StatusApprovedIcon from '../../../../resources/svg/approved.svg';
import StatusDeletedIcon from '../../../../resources/svg/deleted.svg';
import StatusPendingIcon from '../../../../resources/svg/pending.svg';
import StatusRejectedIcon from '../../../../resources/svg/rejected.svg';
import {getUserInfoPage} from '../../../api/def';

const diagInitState ={
    open: false,
    msg: '',
    action: '',
    loading: false,
    validationError: null,
    actionError: null

};

class ApproveRequestsTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        //this.props.actions.getManagerPendingAbsences();

        const dialog = Object.assign({}, diagInitState);
        this.state = {dialog};

        this.RequestDetailsRow = this.RequestDetailsRow.bind(this);
        this.getManagerPendingAbsencesColumns = this.getManagerPendingAbsencesColumns.bind(this);

        this.prepareRequestAction = this.prepareRequestAction.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleRemarksChange = this.handleRemarksChange.bind(this);
    }

    getManagerPendingAbsencesColumns() {
        return [
            {accessor:"number",         header:"Request No."},
            {accessor:"employeeName",   header:"Requested For",
                render: row => (
                    <a target="_blank" href={getUserInfoPage(row.row.employeeNumber)}>{row.row.employeeName}</a>
                )
            },
            {accessor:"status",         header:"Status",
                render: row => (
                    <div>
                        {row.row.status == 'Deleted' && <StatusDeletedIcon style={{display: 'inline-block'}} width="2.5vh" height="2.4vh"/>}
                        {row.row.status == 'Pending' && <StatusPendingIcon style={{display: 'inline-block'}} width="2.5vh" height="2.4vh"/>}
                        {row.row.status == 'Approved' && <StatusApprovedIcon style={{display: 'inline-block'}} width="2.5vh" height="2.4vh"/>}
                        {row.row.status == 'Rejected' && <StatusRejectedIcon style={{display: 'inline-block'}} width="2.5vh" height="2.4vh"/>}
                        <div style={{display: 'inline-block', verticalAlign:'super',marginLeft: '10px'}}>{row.row.status}</div>
                    </div>
                )
            },
            {accessor:"category",       header:"Absence Type"},
            {accessor:"dateFrom",       header:"Start Date"},
            {accessor:"dateTo",         header:"End Date"},
            {accessor:"total",          header:"Total"},
            {accessor:"requested",      header:"Requested On"},
            {accessor:"",               header: "Action" , sortable: false,
                render: row => (
                    <div className="actions">
                            <div onClick={this.prepareRequestAction(row, true)} style={{cursor: 'pointer',display:'inline-block', verticalAlign: "middle"}}>
                                <ApproveIcon style={{display: 'flex' , height: "100%", width: "2vh"}} />
                            </div>
                            <div onClick={this.prepareRequestAction(row, false)} style={{marginLeft: '15px' ,cursor: 'pointer',display:'inline-block', verticalAlign: "middle"}}>
                                <RejectIcon style={{display: 'flex', height: "100%", width: "1.4vh"}} />
                            </div>
                    </div>
                )
            }
        ];
    }

    RequestDetailsRow(row) {
        return (<RequestDetails
            requestNumber={row.rowValues.number}
            employeeNumber={row.row.employeeNumber}
            approvalCycle={row.row.approvalCycle}
            categoryId={row.row.categoryId}
        />);
    }

    prepareRequestAction(row, isApprove) {
        const requestNumber = row.row.number;

        return () => {
            this.setState({dialog: Object.assign(this.state.dialog, {
                open: true,
                action: isApprove ? 'approve' : 'reject',
                requestNumber: requestNumber,
                validationError: null
            })});
        };
    }

    handleAction() {
        const dialogOptions = this.state.dialog;

        const requestData =  {
            reqNumber: dialogOptions.requestNumber,
            remarks: dialogOptions.remarks,
            decision: dialogOptions.action == "approve" ? "true" : "false"
        };

        //validate remarks exists if action is reject
        if (requestData.decision == "false" && (!requestData.remarks || requestData.remarks.trim().length == 0)) {
            this.setState({ dialog: Object.assign(dialogOptions, {validationError : "Please enter reject reason"})});
            return;
        }

        this.setState({ dialog:  Object.assign(dialogOptions, {loading : true})});

        api.approveOrRejectRequest(requestData).then(
            () =>   {
                this.props.actions.getManagerPendingAbsences();
                this.closeDialog();
                toastr.success("Request " + (dialogOptions.action == "approve" ? "Approved " : "Rejected ") + "Successfully");
            }
        ).catch(e => {
            this.setState({ dialog:  Object.assign(dialogOptions, {
                loading : false,
                actionError: dialogOptions.action.capitalizeFirstLetter() + " failed. (Error: " + e.message + ")"
            })});
        });
    }

    handleRemarksChange(event) {
        this.setState({ dialog : Object.assign(this.state.dialog, {remarks: event.target.value})});
    }

    closeDialog() {
        this.setState({dialog: Object.assign(this.state.dialog, {open: false, remarks: "", loading:false, actionError: null, validationError: null})});
    }

    render() {
        const dialogOptions = this.state.dialog;

        return (
            <div>
                <ReactTable
                    loading={this.props.loading}
                    originalData={this.props.managerPendingAbsences}
                    columnsData={this.getManagerPendingAbsencesColumns()}
                    defaultPageSize={10}
                    minRows={1}
                    SubComponent={this.RequestDetailsRow}
                />
                <Dialog
                    title={dialogOptions.action.toUpperCase() + " REQUEST"}
                    open={dialogOptions.open}
                    onRequestClose={this.closeDialog}
                    actions={[
                        <Button key="1" icon="times" onClick={this.closeDialog} label="Cancel" secondary disabled={dialogOptions.loading} />,
                        <Button key="2" icon="check" onClick={this.handleAction} label={dialogOptions.action.capitalizeFirstLetter()} disabled={dialogOptions.loading} />,
                        <div key="3" className="errorDiv" style={{marginTop: "4px"}}>{dialogOptions.actionError}</div>
                    ]}
                    width="480px"
                >
                    <div style={{padding: "10px 0 5px"}}>
                    Are you sure you want to <strong>{dialogOptions.action}</strong> this request?
                    </div>
                    <TextAreaInput
                        name="remarks"
                        label="Remarks"
                        isRequired={dialogOptions.action == "reject"}
                        onChange={this.handleRemarksChange}
                        error={dialogOptions.validationError}
                    />
                    { dialogOptions.loading && <LoadingProgress  fullPage={false} size={30} style={{ position: "absolute", top: 202,left: 235 }}/> }
                </Dialog>
            </div>
        );
    }
}

ApproveRequestsTable.propTypes = {
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    managerPendingAbsences: PropTypes.array.isRequired
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        managerPendingAbsences: state.managerInfo.managerPendingAbsences,
        loading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(managerActions, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ApproveRequestsTable);

