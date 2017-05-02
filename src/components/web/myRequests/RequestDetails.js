import React, {PropTypes} from 'react';
import api from "../../../api/Api";

import ApprovalCycle from '../../common/ApprovalCycle';
import LoadingProgress from '../../common/LoadingProgress';
import {Card, CardTitle, CardText} from 'material-ui/Card';

const initState = {
    loading: false,
    approvalCycle: [],
    remarks: ""
};

const styles = {
    root : {
        boxShadow:'initial',
        border: '1px solid #ccc',
        paddingBottom: 0,
        width: '80%'
    },
    titleRoot : {
      backgroundColor: '#eee',
        paddingLeft: 16,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    title:{
        fontSize:14,
        fontWeight: 'bold',
        lineHeight: '30px'
    },
    text:{
        padding: '4px 16px 0 16px',
        borderTop: '1px solid #ccc',
        fontSize:14
    }
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
        api.getManagerRequestDetails(this.props.requestNumber).then(
            requestDetails =>   {
                if (this._isMounted) {
                    this.setState({approvalCycle: requestDetails.approvalCycle,reason:requestDetails.reason, loading: false});
                }
            }
        );
    }

    render() {
        if (this.state.loading) {
            return (<LoadingProgress fullPage={false} size={100} style={{ textAlign: "center", margin: "30px"}}/>);
        }
        return (
            <div style={{margin: "5px 50px"}}>
                <Card style={styles.root}>
                    <CardTitle style={styles.titleRoot} titleStyle={styles.title} title="Reason" />
                    <CardText style={styles.text}>
                        {this.state.reason}
                    </CardText>
                </Card>
                <div style={{marginTop: "10px"}}>
                    { this.state.approvalCycle &&  <ApprovalCycle ApprovalCycleData={this.state.approvalCycle}/>}
                </div>
            </div>
        );
    }
}

RequestDetails.propTypes = {
    requestNumber: PropTypes.string.isRequired,
    employeeNumber: PropTypes.string.isRequired
};


export default RequestDetails;

