import React, {PropTypes} from "react";
import {connect} from "react-redux";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AbsenceTypeInput extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {label, name, options, onChange, value, error, addAllOption = false,style} = this.props;
        let wrapperClass = 'form-group';
        if (error && error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{label}</label>
                <div style={{height:'50px'}}>
                    <SelectField name={name} value={value} onChange={onChange} className="form-control min-width-s" style={style}>
                        { addAllOption && <MenuItem value="-1" key="-1" primaryText="All"/> }
                        {options.map((option, index) => (
                            <MenuItem className={name} value={option.id} key={index} primaryText={option.name}/>
                        ))}
                    </SelectField>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }

}

AbsenceTypeInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    value: PropTypes.string,
    addAllOption: PropTypes.bool,
    style: PropTypes.object
};


function mapStateToProps(state) {
    return {
        options: state.employeeInfo.absenceTypes,
    };
}

export default connect(mapStateToProps)(AbsenceTypeInput);
