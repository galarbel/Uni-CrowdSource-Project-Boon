import React, {PropTypes} from "react";
import Divider from 'material-ui/Divider';
import StatusApprovedIcon from '../../../../resources/svg/approved.svg';
import StatusDeletedIcon from '../../../../resources/svg/deleted.svg';
import StatusPendingIcon from '../../../../resources/svg/pending.svg';
import StatusRejectedIcon from '../../../../resources/svg/rejected.svg';
import FontAwesome from "react-fontawesome";
import {Link} from "react-router";

class MyRequestsRow extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {number,employeeName, employeeNumber, status,category,categoryId,dateFrom,dateTo,total} = this.props.data;
        return (
            <Link style={{color: "#333"}} to={"/approve/details/" + categoryId + "/" + number + "/" + employeeNumber} >
                <div className="mobile-approve-request-row">
                    <div style={{margin: "auto 5px"}}>
                        {status == 'Deleted' && <StatusDeletedIcon width="7.2vh" height="7.2vh"/>}
                        {status == 'Pending' && <StatusPendingIcon width="7.2vh" height="7.2vh"/>}
                        {status == 'Approved' && <StatusApprovedIcon width="7.2vh" height="7.2vh"/>}
                        {status == 'Rejected' && <StatusRejectedIcon width="7.2vh" height="7.2vh"/>}
                    </div>
                    <div>
                        <div><strong>{employeeName}</strong></div>
                        <div>{category}</div>
                        <div>{dateFrom} <span className="cp-color">to</span> {dateTo}</div>
                        <div>{total}</div>
                    </div>
                    <FontAwesome name={"chevron-right"} style={{color:'#e65785'}}/>
                </div>
            </Link>
        );
    }
}

MyRequestsRow.propTypes = {
    data: PropTypes.object
};


export default MyRequestsRow;
