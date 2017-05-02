import React, {PropTypes} from "react";
import {Card, CardTitle, CardText} from 'material-ui/Card';

const styles = {
    root : {
        boxShadow:'initial',
        border: '1px solid #ccc',
        paddingBottom: 0,
        width: "80%",
        display: "inline-block",
        verticalAlign: "top",
        marginRight: "1%",
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
        padding: '0 16px',
        borderTop: '1px solid #ccc',
        fontSize:14
    },
    th:{
        padding: "10px 10px 10px 0",
        textAlign: 'left',
        whiteSpace: "nowrap"
    },
    td:{
        padding: "2px 10px 0 0",
        whiteSpace: "nowrap",
        width: "15%"
    }
};

const ApprovalCycleTable = ({ApprovalCycleData}) => {
    return (
            <Card style={styles.root}>
                <CardTitle style={styles.titleRoot} titleStyle={styles.title} title="Approval Cycle" />
                <CardText style={styles.text}>
                    <table style={{width: "100%"}}>
                        <thead>
                        <tr>
                            <th style={styles.th}>Planned Approver</th>
                            <th style={styles.th}>Actual Approver</th>
                            <th style={styles.th}>Decision</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Remarks</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            ApprovalCycleData && ApprovalCycleData.length > 0 && ApprovalCycleData.map((row,index) => {
                                return (
                                    <tr key={index}>
                                        <td style={styles.td}>{row.plannedApprover}</td>
                                        <td style={styles.td}>{row.actualApprover}</td>
                                        <td style={styles.td}>{row.decision}</td>
                                        <td style={styles.td}>{row.decisionDate}</td>
                                        <td style={{padding: "2px 0 0"}}>{row.reason}</td>
                                    </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </CardText>
            </Card>
    );
};

ApprovalCycleTable.propTypes = {
    ApprovalCycleData: PropTypes.array.isRequired
};

export default ApprovalCycleTable;
