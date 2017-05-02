import React, {PropTypes} from "react";

const VacationRelatedInfo = ({employeeVacationRelatedInfo}) => {
    return (
        <div className="mobile-vacation-related-info">
            <div className="cp-color">
                Vacation Related Info
            </div>
            <table>
                <tbody>
                <tr>
                    <th>
                        Periodic Assignment
                    </th>
                    <td>
                        {employeeVacationRelatedInfo.periodicAssignment + " " + employeeVacationRelatedInfo.unit}
                    </td>
                </tr>
                <tr>
                    <th>
                        Balance as of today
                    </th>
                    <td>
                        {employeeVacationRelatedInfo.availableBalance + " " + employeeVacationRelatedInfo.unit}
                    </td>
                </tr>
                <tr>
                    <th>
                        Balance as of {employeeVacationRelatedInfo.futureBalanceAsOfDate}
                    </th>
                    <td>
                        {employeeVacationRelatedInfo.futureBalance + " " + employeeVacationRelatedInfo.unit}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    );
};

VacationRelatedInfo.propTypes = {
    employeeVacationRelatedInfo: PropTypes.object.isRequired
};

export default VacationRelatedInfo;
