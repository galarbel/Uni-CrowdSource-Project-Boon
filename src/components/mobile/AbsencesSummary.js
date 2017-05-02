import React, {PropTypes} from "react";
import {connect} from "react-redux";
import moment from "moment";
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dogs from "../../../resources/img/AbsenceSummaryBG.jpg";
import Divider from 'material-ui/Divider';

class AbsencesSummary extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.getTabTitle = this.getTabTitle.bind(this);
    }

    getTabTitle(tabName){
        //debugger;
        switch(tabName){
            case 'thisYear': return moment().format('YYYY');
            case 'lastYear': return moment().subtract(1, 'year').format('YYYY');
            case 'twoYearsAgo': return moment().subtract(2, 'year').format('YYYY');
            case 'approvedNotTaken': return 'Planned';
        }
    }
    render() {
        const absencesSummary = this.props.absencesSummaryTransposed;
        return (
            <div id="absenceSummaryDiv">
                <img src={Dogs} style={{width:'100%',marginBottom:'-10px'}}/>
                <Tabs tabItemContainerStyle={{backgroundColor:'#999'}}>
                    {absencesSummary.map((column, index) =>
                    <Tab label={this.getTabTitle(column[0].tabName)} key ={index} >
                        <Table selectable={false} multiSelectable={false}>
                            <TableBody displayRowCheckbox={false}>
                        {column.map((row,index) =>
                        <TableRow key={index}>
                            <TableRowColumn style={{fontSize:'16px'}}><b>{`${row.categoryName}`}</b></TableRowColumn>
                            <TableRowColumn>{`${row.amount} ${row.unit}`}</TableRowColumn>
                        </TableRow>


                        )}</TableBody></Table><Divider/></Tab>) }

                </Tabs>
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
    //debugger;
    const columnNames = Object.keys(absencesSummary);
    let transposed = {};
    for (let j = 0; j < columnNames.length; j++) {
        const currentColumnName = columnNames[j];
        const currentColumn = absencesSummary[currentColumnName];
        for (let i = 0; i < currentColumn.length; i++) {
            const {category, unit, amount} = currentColumn[i];
            if (!transposed[currentColumnName]) {
                transposed[currentColumnName] = [];
            }
            // If this is the first time the algorithm encountered this particular category (absence-type), add it
            transposed[currentColumnName][i] = {
                categoryName: category,
                amount: amount,
                unit: unit,
                tabName : currentColumnName
            };
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
