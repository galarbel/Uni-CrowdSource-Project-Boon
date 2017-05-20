import React, {PropTypes} from "react";

const TextInput = ({name, label, onChange, placeholder, value, error, readOnly, type = "text", disabled = false}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    name={name}
                    className="form-control full-width"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    disabled={disabled}
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    readOnly: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
};

export default TextInput;
