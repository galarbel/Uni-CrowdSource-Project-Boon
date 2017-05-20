import React, {PropTypes} from "react";
import FontAwesome from "react-fontawesome";


const Button = ({onClick, icon, label, name, secondary = false, disabled = false, style}) => {
    let buttonClassName = "btn";
    if (secondary) {
        buttonClassName += " btn-secondary";
    }
    return (
        <button className={buttonClassName} name={name} onClick={onClick} disabled={disabled} style={style}>
            {icon && <FontAwesome name={icon} />}
            {icon && label && <span>&nbsp;</span>}
            {label && `${label}`}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    secondary: PropTypes.bool,
    style: PropTypes.object
};

export default Button;
