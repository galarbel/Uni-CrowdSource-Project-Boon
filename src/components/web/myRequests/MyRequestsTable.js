import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as managerActions from "../../../actions/managerActions";
import ReactTable from '../../common/react-table/ReactTableWrapper';
import 'react-table/react-table.css';
import Dialog from '../../common/DialogWrapper';
import TextAreaInput from '../../common/TextAreaInput';
import Button from '../../common/Button';
import LoadingProgress from '../../common/LoadingProgress';
import toastr from 'toastr';
import api from "../../../api/Api";
import EditRequestForm from './RequestForm';
import RequestDetails from './RequestDetails';
import RejectIcon from '../../../../resources/svg/reject.svg';
import EditIcon from '../../../../resources/svg/modify.svg';
import StatusApprovedIcon from '../../../../resources/svg/approved.svg';
import StatusDeletedIcon from '../../../../resources/svg/deleted.svg';
import StatusPendingIcon from '../../../../resources/svg/pending.svg';
import StatusRejectedIcon from '../../../../resources/svg/rejected.svg';

const diagInitState ={
    open: false,
    msg: '',
    action: '',
    loading: false,
    requestNumber: -1,
    dateFrom: "",
    dateTo: "",
    halfDay: false,
    modReason: ""
};

class MyRequestsTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        const dialog = Object.assign({}, diagInitState);
        this.state = {myAbsences : [], dialog};

        this.getMyAbsencesColumns = this.getMyAbsencesColumns.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleEditForm = this.handleEditForm.bind(this);
        this.RequestDetailsRow = this.RequestDetailsRow.bind(this);
    }

    RequestDetailsRow(row) {
        return (<RequestDetails
            requestNumber={row.rowValues.number}
            employeeNumber={row.row.employeeNumber}
            approvalCycle={row.row.approvalCycle}
        />);
    }

    getMyAbsencesColumns() {
        return [
            {accessor:"number",         header:"Request Number"},
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
            {accessor:"",               header: "Action" , sortable: false,
             render: row => (
                 <div className="actions">
                     {row.row.status != 'Deleted' && row.row.status != 'Pending' &&  <div>
                     <div onClick={this.initRequestAction(row, 'Edit')} style={{cursor: 'pointer',display:'inline-block'}}>
                         <EditIcon style={{display: 'flex'}} width="3vh" height="2vh"/>
                     </div>
                     <div onClick={this.initRequestAction(row, 'Delete')} style={{marginLeft: '20px' ,cursor: 'pointer',display:'inline-block'}}>
                         <RejectIcon style={{display: 'flex'}} width="2.5vh" height="2vh"/>
                     </div>
                     </div>}
                </div>
             )
             }
        ];
    }

    initRequestAction(row, action) {
        const requestNumber = row.row.number;
        //debugger;
        return () => {
            this.setState({dialogRequestNumber: row.row.number,dialog: Object.assign(this.state.dialog, {
                open: true,
                action: action,
                requestNumber: requestNumber
            })});
        };
    }

    handleEditForm(key, value){
        this.setState({dialog: Object.assign(this.state.dialog, {
            [key] : value
        })});
    }

    handleAction() {
        const dialogOptions = this.state.dialog;
        if (dialogOptions.action == 'Delete') {
            const requestParams = {
                reqNumber: dialogOptions.requestNumber,
                deleteReason: dialogOptions.remarks,
                action: dialogOptions.action
            };
            this.setState({dialog: Object.assign(dialogOptions, {loading: true})});
            api.deleteRequest(requestParams).then(
                () => {
                    this.handleDialogClose();
                    toastr.success("Request deleted successfully");
                    //window.location.reload();
                }
            );
        }else {
            const requestParams = {
                editReqNumber: dialogOptions.requestNumber,
                newDateFrom: dialogOptions.dateFrom,
                newDateTo: dialogOptions.dateTo,
                newHalfDay : dialogOptions.halfDay,
                modifyReason: dialogOptions.modReason
            };
            this.setState({dialog: Object.assign(dialogOptions, {loading: true})});
            api.modifyRequest(requestParams).then(
                () => {
                    this.handleDialogClose();
                    toastr.success("Request edited successfully");
                    //window.location.reload();
                }
            );
        }

    }

    handleReasonChange(event) {
        this.setState({ dialog : Object.assign(this.state.dialog, {remarks: event.target.value})});
    }

    handleDialogClose() {
        this.setState({dialog: Object.assign(this.state.dialog, {open: false,loading:false, remarks: ""})});
    }

    render() {
        const dialogOptions = this.state.dialog;
        const buttons =[
            <Button key="0" icon="times" onClick={this.handleDialogClose} label="Cancel" secondary disabled={dialogOptions.loading} />,
            <Button key="1" icon="check" onClick={this.handleAction} label="Submit" disabled={dialogOptions.loading} />];

        let dialog = "";

        if (dialogOptions.action == 'Delete'){
            dialog = (<Dialog
                title={'Delete this request?'}
                open={dialogOptions.open}
                onRequestClose={this.handleDialogClose}
                actions={buttons}
                width = "530px">
                <TextAreaInput name="reason" label="Reason" onChange={this.handleReasonChange} />
                { dialogOptions.loading && <LoadingProgress  fullPage={false} size={30} style={{ position: "absolute", bottom: 0,left: 0, margin: "25px" }}/> }
            </Dialog>);
        }else{ //Edit
            dialog = (<Dialog
                title={'Edit Request'}
                open={dialogOptions.open}
                onRequestClose={this.handleDialogClose}
                actions={buttons}
                contentStyle ={{height:'768px',width:'530px'}}
                width = "530px">
                { dialogOptions.loading && <LoadingProgress  fullPage={false} size={30} />}
                <EditRequestForm requestNumber={this.state.dialogRequestNumber} onChange={this.handleEditForm} isEdit/>
            </Dialog>);
        }

        return (
            <div>
                <ReactTable
                    loading={this.props.loading}
                    originalData={this.props.data}
                    columnsData={this.getMyAbsencesColumns()}
                    defaultPageSize={10}
                    minRows={1}
                    SubComponent={this.RequestDetailsRow}
                />
                {dialog}
            </div>
        );
    }
}

MyRequestsTable.propTypes = {
    loading: PropTypes.bool,
    actions: PropTypes.object,
    myAbsences: PropTypes.array,
    data: PropTypes.array
};

function mapStateToProps(state/*, ownProps*/) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(managerActions, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyRequestsTable);

