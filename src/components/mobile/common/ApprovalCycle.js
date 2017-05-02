import React, {PropTypes} from "react";

const ApprovalCycleTable = ({approvalCycleData}) => {
    return (
        <div className="mobile-approval-cycle">
            <div className="cp-color">
                Approval Cycle
            </div>
            <table>
                <tbody>
                {approvalCycleData && approvalCycleData.length > 0 && approvalCycleData.map((row,index) => {
                    return (
                    <tr key={index}>
                        <td className="cp-color">{row.plannedApprover}</td>
                        <td>{row.decision}</td>
                        <td>{row.decisionDate}</td>
                    </tr>);
                })}
                </tbody>
            </table>
        </div>

    );
};

ApprovalCycleTable.propTypes = {
    approvalCycleData: PropTypes.array.isRequired
};

export default ApprovalCycleTable;
