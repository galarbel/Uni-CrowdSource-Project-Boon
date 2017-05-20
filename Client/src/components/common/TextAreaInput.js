import React, {PropTypes} from "react";

const TextAreaInput = ({name, label, onChange, placeholder, value, error, rows = 4, cols = 50, isRequired = false}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label>{isRequired && <em style={{color:"red"}}>*</em>} {label}</label>
            <div className="field">
                <textarea
                    name={name}
                    className="form-control full-width"
                    placeholder={placeholder}
                    value={value}
                    rows={rows}
                    cols={cols}
                    onChange={onChange}
                    style={{verticalAlign: "top", resize: "none"}}
                />
                {error && <div className="text-empty-error">{error}</div>}
            </div>
        </div>
    );
};

TextAreaInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string,
    isRequired: PropTypes.bool
};

export default TextAreaInput;
