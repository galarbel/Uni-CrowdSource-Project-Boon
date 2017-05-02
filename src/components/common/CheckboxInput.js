import React, {PropTypes} from "react";
import Checkbox from 'material-ui/Checkbox';
import {colors} from "../../constants/brand";

const styles = {
    iconRules:{
        fill: colors.main
    }
};

const CheckboxInput = ({name, label, checked, disabled , error, onCheck, id}) => {
    let wrapperClass = 'checkboxInput form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <Checkbox
                name={name}
                label={label}
                checked={checked}
                disabled={disabled}
                onCheck={onCheck}
                labelStyle={styles.labelRules}
                iconStyle = {styles.iconRules}
                id = {id}
                inputStyle={styles.inputRules}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

CheckboxInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onCheck: PropTypes.func.isRequired,
    error: PropTypes.string,
    id: PropTypes.string
};

export default CheckboxInput;
