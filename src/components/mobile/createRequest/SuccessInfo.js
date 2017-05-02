import React, {PropTypes} from "react";
import FontAwesome from "react-fontawesome";
import Divider from 'material-ui/Divider';

const SuccessInfo = ({createdRequest}) => {
    const {number, insertDate, dateFrom, dateTo, reason,category, total} = createdRequest;
    return (
        <div className="successInfo">
            <div><FontAwesome className={'fa-check-square-o'} style={{color:'green'}} name="check"/>
                <span style={{marginLeft : '5px',fontWeight:'bold'}}>Your request has been submitted!</span>
                <Divider/>
            </div>
            You will be informed upon completion of the approval process.<br />
            <br />
            <h4>{category}</h4>
            <Divider/>
            <table id="mobileSuccessInfo">
                <tbody>
                    <tr>
                        <td>Requested On:</td>
                        <td>{insertDate}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{category}</td>
                    </tr>
                    <tr>
                        <td>Start Date:</td>
                        <td>{dateFrom}</td>
                    </tr>
                    <tr>
                        <td>End Date:</td>
                        <td>{dateTo}</td>
                    </tr>
                    <tr>
                        <td>Duration:</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>Reason:</td>
                        <td>{reason || "(not specified)"}</td>
                    </tr>
                    <tr>
                        <td>Request No:</td>
                        <td>{number}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <Divider/>
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
