import React, {PropTypes} from "react";
import Toggle from 'material-ui/Toggle';
import MuiTheme from "../common/MuiTheme";

const styles = {
    widthRules: {
        // maxWidth: 300,
        width: "initial"
    },
    thumbSwitched: {
        backgroundColor: MuiTheme.palette.canvasColor
    },
    trackSwitched: {
        backgroundColor: MuiTheme.palette.accent1Color//colors.main
    },
    labelRules: {
        color: "inherit",
        fontFamily: "inherit"
    }
};

const ToggleInput = ({name, label, toggled, error, onToggle}) => {
    let wrapperClass = 'toggleInput form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <Toggle
                name={name}
                label={label}
                toggled={toggled}
                onToggle={onToggle}
                style={styles.widthRules}
                //labelStyle={styles.labelRules}
                thumbSwitchedStyle={styles.thumbSwitched}
                trackSwitchedStyle={styles.trackSwitched}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

ToggleInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    toggled: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default ToggleInput;
