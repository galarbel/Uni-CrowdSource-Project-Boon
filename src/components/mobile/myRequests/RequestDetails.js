import React, {PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import api from "../../../api/Api";
import ApprovalCycleMobile from '../common/ApprovalCycle';
import LoadingProgress from '../../common/LoadingProgress';
import Divider from 'material-ui/Divider';
import StatusApprovedIcon from '../../../../resources/svg/approved.svg';
import StatusDeletedIcon from '../../../../resources/svg/deleted.svg';
import StatusPendingIcon from '../../../../resources/svg/pending.svg';
import StatusRejectedIcon from '../../../../resources/svg/rejected.svg';

const initState = {
    loading: false,
    approvalCycle: [],
    remarks: ""
};



class RequestDetails extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({},initState);

        this._isMounted = true;
    }

    componentWillMount() {
        this.loadAjaxDetails();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    loadAjaxDetails() {
        this.setState({loading: true});
        api.getRequestDetails(this.props.params.requestNumber).then(
            requestDetails =>   {
                if (this._isMounted) {
                    this.setState({...requestDetails, loading: false});
                }
            }
        );
    }

    render() {
        const {category, number,dateFrom, dateTo,  total, reason, status, insertDate, approvalCycle} = this.state;
        if (this.state.loading) {
            return (<LoadingProgress fullPage={false} size={100} style={{ textAlign: "center", margin: "30px"}}/>);
        }
        return (
            <div >
                <div className="mobile-request-details">
                <div className="mobile-request-details-header">
                    <div>
                        <strong>{category}</strong>
                    </div>
                    <div>
                        {status}
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>Start Date:</th>
                            <td>{dateFrom}</td>
                        </tr>
                        <tr>
                            <th>End Date:</th>
                            <td>{dateTo}</td>
                        </tr>
                        <tr>
                            <th>Total Time Off:</th>
                            <td>{total}</td>
                        </tr>
                        <tr>
                            <th>Requested On:</th>
                            <td>{insertDate}</td>
                        </tr>
                        <tr>
                            <th>Request Number:</th>
                            <td>{number}</td>
                        </tr>
                        <tr>
                            <th>Reason:</th>
                            <td>{reason}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                {approvalCycle && <ApprovalCycleMobile approvalCycleData={approvalCycle} />}
            </div>

        );
    }
}

RequestDetails.propTypes = {
    requestNumber: PropTypes.string
};

export default RequestDetails;




