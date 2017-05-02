import React, {PropTypes} from "react";


const SuccessInfo = ({createdRequest}) => {
    const {number, employeeName, dateFrom, dateTo, reason,category} = createdRequest;
    return (
        <div className="successInfo">
            <br />
            <b>Thank you.</b> Your request has been <b style={{color: "green"}}>submitted successfully</b>.<br />
            You will be informed upon completion of the approval process.<br />
            <br />
            <h4>Request Detail</h4>
            <table>
                <tbody>
                    <tr>
                        <td>Request Number</td>
                        <td>{number}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{category}</td>
                    </tr>
                    <tr>
                        <td>Date Range</td>
                        <td>{`${dateFrom} - ${dateTo}`}</td>
                    </tr>
                    <tr>
                        <td>Reason</td>
                        <td>{reason || "(not specified)"}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            <b>Please take the following actions before leaving the office:</b><br />
            <ul>
                <li>
                    <b>Email:</b> Set an <em>Out Of Office</em> message, indicating when you'll be out and whom to
                    contact instead. A short guide is available <a href={linkEmail} target="_blank">here</a>.<br />
                </li>
                <li>
                    <b>Directory:</b> Set your <em>Away Message</em> under <em>Update My Info</em> in the <a href={linkDirectory} target="_blank">Directory</a>.
                </li>
            </ul>
        </div>
    );
};

const linkEmail = "http://wiki.checkpoint.com/confluence/display/EMPINFOCTR/Outlook?disambiguation=false&term=outlook#Outlook-Q%3AHowcanIenableOutofofficereplyforOffice2010%3F";
const linkDirectory = "http://cpi.checkpoint.com/CPMyInfo/home/w_timeoff.asp";

SuccessInfo.propTypes = {
    createdRequest: PropTypes.object.isRequired
};

export default SuccessInfo;
