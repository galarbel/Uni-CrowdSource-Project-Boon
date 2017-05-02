import React, {PropTypes} from "react";
import {connect} from "react-redux";
import moment from "moment";


class AbsencesSummary extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const absencesSummaryTransposed = this.props.absencesSummaryTransposed;
        return (
            <div className="absencesSummary">
                <h3>Absences Summary</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Absence Type</th>
                        <th>{dateTwoYearsAgo.format("YYYY")}</th>
                        <th>{dateLastYear.format("YYYY")}</th>
                        <th>{dateThisYear.format("YYYY")}</th>
                        <th>
                            Planned in {dateThisYear.format("YYYY")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {absencesSummaryTransposed.map((row, index) =>
                           <tr key={index}>
                               <td>{`${row.categoryName}`}</td>
                               <td>{row.twoYearsAgo ? `${row.twoYearsAgo} ${row.unit}` : ""}</td>
                               <td>{row.lastYear ? `${row.lastYear} ${row.unit}` : ""}</td>
                               <td>{row.thisYear ? `${row.thisYear} ${row.unit}` : ""}</td>
                               <td>{row.approvedNotTaken ? `${row.approvedNotTaken} ${row.unit}` : ""}</td>
                           </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const dateTwoYearsAgo = moment().subtract(2, 'year');
const dateLastYear = moment().subtract(1, 'year');
const dateThisYear = moment();

/**
 The data coming from the API is sorted on a column-first logic; the columns in this case being the different periods
 such as thisYear, lastYear etc. This is hard to render sequentially, so the following method is meant to reorganize
 this data into a row-first logic; the rows being the different categories: vacation, sickness etc..
 */
const transposeDataToArray = (absencesSummary) => {
    // Step 1: transpose data into category-first/row-first logic.
    const columnNames = Object.keys(absencesSummary);
    let transposed = {};
    for (let j = 0; j < columnNames.length; j++) {
        const currentColumnName = columnNames[j];
        const currentColumn = absencesSummary[currentColumnName];
        for (let i = 0; i < currentColumn.length; i++) {
            const {category, unit, amount} = currentColumn[i];
            if (!transposed[category]) {
                // If this is the first time the algorithm encountered this particular category (absence-type), add it
                transposed[category] = {
                    thisYear: 0,
                    lastYear: 0,
                    twoYearsAgo: 0,
                    approvedNotTaken: 0,
                    unit: unit,
                    categoryName: category
                };
            }
            // Update the count for the relevant column (thisYear, lastYear etc.)
            transposed[category][currentColumnName] += parseFloat(amount);
        }
    }
    // Step 2: build and return the data array from each "category object".
    const resultArray = Object.keys(transposed).map(val => transposed[val]);
    return resultArray;
};

AbsencesSummary.propTypes = {
    absencesSummaryTransposed: PropTypes.array
};

function mapStateToProps(state) {
    return {
        absencesSummaryTransposed: transposeDataToArray(state.employeeInfo.absencesSummary)
    };
}

export default connect(mapStateToProps)(AbsencesSummary);
