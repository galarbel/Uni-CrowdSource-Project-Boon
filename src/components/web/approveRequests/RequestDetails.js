import React, {PropTypes} from 'react';
import api from "../../../api/Api";

import AbsenceRelatedInfo from './AbsenceRelatedInfo';
import ApprovalCycle from '../../common/ApprovalCycle';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoadingProgress from '../../common/LoadingProgress';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {isEmpty} from '../../../utils/Utils';
import {getTeamCalenderPage} from '../../../api/def';


const styles = {
    root : {
        boxShadow:'initial',
        border: '1px solid #ccc',
        paddingBottom: 0,
        width: '40%',
        marginTop: "10px",
        marginBottom: "10px"
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

const initState = {
    loading: 0,
    employeeVacationRelatedInfo: { },
    approvalCycle: [],
    reason: "",
    detailsError: null,
    relatedInfoError: null
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
        this.setState({loading: 1 + (this.props.categoryId == "0100" ? 1 : 0)});

        if (this.props.categoryId == "0100") {
            api.getManagerEmployeeVacationRelatedInfo({
                reqNumber: this.props.requestNumber,
                employeeNumber: this.props.employeeNumber,
                categoryId: this.props.categoryId
            }).then(
                employeeVacationRelatedInfo =>   {
                    if (this._isMounted) {
                        this.setState({employeeVacationRelatedInfo, loading: this.state.loading -1});
                    }
                }
            ).catch(e => {
                this.setState({ loading: this.state.loading - 1});
                this.setState({ relatedInfoError: "Failed loading related information for Request #" + this.props.requestNumber +" (Error: " + e.message +")"});
            });
        }

        api.getManagerRequestDetails(this.props.requestNumber).then(
            requestDetails =>   {
                if (this._isMounted) {
                    this.setState(
                        {
                            approvalCycle: requestDetails.approvalCycle,
                            reason: requestDetails.reason,
                            loading: this.state.loading - 1,
                            detailsError: null
                        });
                }
            }
        ).catch(e => {
            this.setState({ loading: this.state.loading - 1});
            this.setState({ detailsError: "Failed Loading Details for Request #" + this.props.requestNumber +" (Error: " + e.message +")"});
        });
    }

    render() {
        const employeeVacationRelatedInfo = this.state.employeeVacationRelatedInfo;

        if (this.state.loading) {
            return (<LoadingProgress fullPage={false} size={100} style={{ textAlign: "center", margin: "30px"}}/>);
        }

        return (
            <div style={{margin: "5px 50px"}}>
                { this.state.reason &&
                <Card style={styles.root}>
                    <CardTitle style={styles.titleRoot} titleStyle={styles.title} title="Reason" />
                    <CardText style={styles.text}>
                        {this.state.reason}
                    </CardText>
                </Card>
                }

                { this.state.approvalCycle.length > 0 &&  <ApprovalCycle ApprovalCycleData={this.state.approvalCycle}/>}
                { !isEmpty(employeeVacationRelatedInfo) && <AbsenceRelatedInfo absenceRelatedInfo={employeeVacationRelatedInfo}/> }
                { this.state.detailsError && <div className="errorDiv">{this.state.detailsError}</div>}
                { this.state.relatedInfoError && <div className="errorDiv">{this.state.relatedInfoError}</div>}
                <div><a href={getTeamCalenderPage()}>View Team Calendar</a></div>
            </div>
        );
    }
}

RequestDetails.propTypes = {
    requestNumber: PropTypes.string.isRequired,
    employeeNumber: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired
};


export default RequestDetails;

