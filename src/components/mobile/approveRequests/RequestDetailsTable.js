import React, {PropTypes} from "react";

const RequestDetailsTable = ({requestDetails}) => {
    return (
        <table>
            <tbody>
            <tr>
                <th>Absence Type:</th>
                <td>{requestDetails.category}</td>
            </tr>
            <tr>
                <th>Start Date:</th>
                <td>{requestDetails.dateFrom}</td>
            </tr>
            <tr>
                <th>End Date:</th>
                <td>{requestDetails.dateTo}</td>
            </tr>
            <tr>
                <th>Total Time Off:</th>
                <td>{requestDetails.total}</td>
            </tr>
            <tr>
                <th>Request Number:</th>
                <td>{requestDetails.number}</td>
            </tr>
            <tr>
                <th>Requested On:</th>
                <td>{requestDetails.insertDate}</td>
            </tr>
            <tr>
                <th>Reason:</th>
                <td>{requestDetails.reason}</td>
            </tr>
            </tbody>
        </table>

    );
};

RequestDetailsTable.propTypes = {
    requestDetails: PropTypes.object.isRequired
};

export default RequestDetailsTable;
