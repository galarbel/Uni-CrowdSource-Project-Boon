import React, {PropTypes} from "react";
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';

const styles = {
    textFieldRules:{
        width:'130px',
        cursor:'pointer'
    },
    datePickerRootRules:{
        height:'42px',
        lineHeight:'16px'
    },
    subHeaderRules:{
        fontWeight:'bold',
        paddingLeft:'0px',
        fontSize:'16px',
        lineHeight:'42px',
        marginBottom:'-10px'
    }
};

function formatDatefunc(date){
    const months = ['Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return day + '-' + months[date.getMonth()] + "-" + date.getFullYear();
}

const DatePickerInput = ({label,
    onChange,
    hintText = "Click to select",
    value,
    firstDayOfWeek = 0,
    autoOk = true,
    mode='portrait',
    container= 'inline',
    formatDateFunc = formatDatefunc,
    disabled = false,
    textFieldStyle = styles.textFieldRules}) => {
    return (
        <div className="DatePickerInput">
            <Subheader style={styles.subHeaderRules}>{label}</Subheader>
            <DatePicker
                onChange={onChange}
                hintText={hintText}
                firstDayOfWeek = {firstDayOfWeek}
                autoOk = {autoOk}
                mode = {mode}
                container = {container}
                value = {value}
                textFieldStyle={textFieldStyle}
                style={styles.datePickerRootRules}
                formatDate={formatDateFunc}
                disabled = {disabled}
            />
        </div>
    );
};

DatePickerInput.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    hintText: PropTypes.string,
    firstDayOfWeek: PropTypes.number,
    autoOk: PropTypes.bool,
    mode: PropTypes.string,
    container: PropTypes.string,
    value:PropTypes.object,
    formatDateFunc: PropTypes.func,
    disabled: PropTypes.bool,
    textFieldStyle: PropTypes.object
};

export default DatePickerInput;
