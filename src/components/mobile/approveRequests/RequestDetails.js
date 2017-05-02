import React, {PropTypes} from 'react';
import api from "../../../api/Api";
import LoadingProgress from '../../common/LoadingProgress';
import RequestDetailsTable from './RequestDetailsTable';
import ApprovalCycleMobile from '../common/ApprovalCycle';
import VacationRelatedInfo from '../common/VacationRelatedInfo';

const initState = {
    loading: 0,
    employeeVacationRelatedInfo: null,
    requestDetails: null,
    detailsError: null,
    relatedInfoError: null
};

class RequestDetails extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({},initState);
    }

    componentWillMount() {
        this.loadAjaxDetails();
    }

    loadAjaxDetails() {
        const params = this.props.params;

        this.setState({loading: 1 + (params.categoryId == "0100" ? 1 : 0)});


        if (params.categoryId == "0100") {
            api.getManagerEmployeeVacationRelatedInfo({
                reqNumber: params.requestNumber,
                employeeNumber: params.employeeNumber,
                categoryId: params.categoryId
            }).then(
                employeeVacationRelatedInfo =>   {
                    this.setState({employeeVacationRelatedInfo, loading: this.state.loading -1});
                }
            ).catch(e => {
                this.setState({ loading: this.state.loading - 1});
                this.setState({ relatedInfoError: "Failed loading related information for Request #" + params.requestNumber +" (Error: " + e.message +")"});
            });
        }

        api.getManagerRequestDetails(params.requestNumber).then(
            requestDetails =>   {
                this.setState(
                    {
                        requestDetails,
                        loading: this.state.loading - 1,
                        detailsError: null
                    });
            }
        ).catch(e => {
            this.setState({ loading: this.state.loading - 1});
            this.setState({ detailsError: "Failed Loading Details for Request #" + params.requestNumber +" (Error: " + e.message +")"});
        });
    }

    render() {
        const requestDetails = this.state.requestDetails;
        const employeeVacationRelatedInfo = this.state.employeeVacationRelatedInfo;

        if (this.state.loading > 0) {
            return (<LoadingProgress />);
        }

        return (
            <div className="mobile-request-details">
                <div className="mobile-request-details-header">
                    <div>
                        <strong>{requestDetails.employeeName}</strong>
                    </div>
                    <div>
                        {requestDetails.status}
                    </div>
                </div>
                <div>
                    <RequestDetailsTable requestDetails={requestDetails}/>
                </div>
                {
                    employeeVacationRelatedInfo &&
                    <VacationRelatedInfo employeeVacationRelatedInfo={employeeVacationRelatedInfo} />
                }
                {
                    requestDetails.approvalCycle &&
                    <ApprovalCycleMobile approvalCycleData={requestDetails.approvalCycle} />
                }
            </div>
        );
    }
}

RequestDetails.propTypes = {
    params: PropTypes.object.isRequired
};


export default RequestDetails;

