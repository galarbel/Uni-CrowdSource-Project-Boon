import React, {PropTypes} from "react";
import {Card, CardTitle, CardText} from 'material-ui/Card';

const styles = {
    root : {
        boxShadow:'initial',
        border: '1px solid #ccc',
        paddingBottom: 0,
        width: "30%",
        minWidth: "350px",
        display: "inline-block",
        verticalAlign: "top"
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
        padding: '5px 16px',
        borderTop: '1px solid #ccc',
        fontSize:14
    },
};

class AbsenceRelatedInfo extends React.Component {
    //TODO: make this a common since this is also used in Create...

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {periodicAssignment, periodicAssignmentPeriod, availableBalance, futureBalanceAsOfDate, futureBalance, unit} = this.props.absenceRelatedInfo;
        return (
        <Card style={styles.root}>
            <CardTitle style={styles.titleRoot} titleStyle={styles.title} title="Absence Related Info" />
            <CardText style={styles.text}>
                <div className="absenceRelatedInfo">
                    <div className="two-columns">
                        <span >Periodic Assignment: (<b>{`${periodicAssignmentPeriod}`}</b> basis)</span>
                        <span className="left-pad">{`${periodicAssignment} ${unit}`}</span>
                    </div>
                    <div className="two-columns">
                        <span >Balance as of today:</span>
                        <span className="left-pad">{`${availableBalance} ${unit}`}</span>
                    </div>
                    <div className="two-columns" style={{marginBottom: "5px"}}>
                        <span >Balance as of {`${futureBalanceAsOfDate}*`}:</span>
                        <span className="left-pad">{`${futureBalance} ${unit}`}</span>
                    </div>
                    <div style={{fontSize: "13px"}}>
                        * Balance includes current requests after approval, future approved requests and periodic assignments.
                    </div>
                </div>
            </CardText>
        </Card>
        );
    }
}

AbsenceRelatedInfo.propTypes = {
    absenceRelatedInfo: PropTypes.object.isRequired
};

export default AbsenceRelatedInfo;
