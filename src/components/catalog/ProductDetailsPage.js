import React, {PropTypes} from 'react';
import LoadingProgress from '../common/LoadingProgress';
import ImageGallery from 'react-image-gallery';
import Lightbox from 'react-images';
import SamplePic from '../../../resources/img/sample.jpg';

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
    }

    render() {
        const {category, number,dateFrom, dateTo,  total, reason, status, insertDate, approvalCycle} = this.state;
        if (this.state.loading) {
            return (<LoadingProgress fullPage={false} size={100} style={{ textAlign: "center", margin: "30px"}}/>);
        }

        return (
            <div>
                <div className="mobile-request-details">
                    <div className="mobile-request-details-header">
                        <div>
                            <strong>{Name}</strong>
                        </div>
                        <div>
                            {Category}
                        </div>
                    </div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <th>Area:</th>
                                <td>{area}</td>
                            </tr>
                            <tr>
                                <th>Date Created:</th>
                                <td>{createdDate}</td>
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
            </div>

        );
    }
}

RequestDetails.propTypes = {
    requestNumber: PropTypes.string
};

export default RequestDetails;



