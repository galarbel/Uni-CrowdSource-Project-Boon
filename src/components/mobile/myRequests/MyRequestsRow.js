import React, {PropTypes} from "react";
import Divider from 'material-ui/Divider';
import StatusApprovedIcon from '../../../../resources/svg/approved.svg';
import StatusDeletedIcon from '../../../../resources/svg/deleted.svg';
import StatusPendingIcon from '../../../../resources/svg/pending.svg';
import StatusRejectedIcon from '../../../../resources/svg/rejected.svg';
import FontAwesome from "react-fontawesome";
import {Link} from 'react-router';

class MyRequestsRow extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {number,status,category,dateFrom,dateTo,total} = this.props.data;
        return (
            <div>
                <Link to={"/requests/"+ number} style={{color:'initial'}}>
                <div style={{display:'inline-block',verticalAlign:'super'}}>
                    {status == 'Deleted' && <StatusDeletedIcon width="7.2vh" height="7.2vh"/>}
                    {status == 'Pending' && <StatusPendingIcon width="7.2vh" height="7.2vh"/>}
                    {status == 'Approved' && <StatusApprovedIcon width="7.2vh" height="7.2vh"/>}
                    {status == 'Rejected' && <StatusRejectedIcon width="7.2vh" height="7.2vh"/>}
                </div>
                <div style={{display:'inline-block'}}>
                    <div>
                        <div style={{float:'right'}}><b>{status}</b></div>
                        <div>{category}</div>
                    </div>
                    <div><span className="pinkColor">From</span> {dateFrom} <span className="pinkColor">To</span> {dateTo}</div>
                    <div>{total}</div>
                </div>
                <div style={{float:'right',marginTop:'25px'}}>
                <FontAwesome name={"chevron-right"} style={{color:'#e65785'}}/>
                </div>
                <Divider/>
                </Link>
            </div>
        );
    }
}

MyRequestsRow.propTypes = {
    data: PropTypes.object
};

export default MyRequestsRow;
