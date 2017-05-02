import React, {PropTypes} from "react";
import CircularProgress from "material-ui/CircularProgress";
import {colors} from "../../constants/brand";

const LoadingProgress = ({size = 150, thickness = 5, color = colors.main, fullPage = true, style}) => {
    let wrapperClassName = "loadingProgress";
    wrapperClassName += fullPage ? " full_page_loader_position" : "";
    return (
        <div className={wrapperClassName} style={style}>
            <CircularProgress size={size} thickness={thickness} color={color} style={{verticalAlign: "top"}} />
        </div>
    );
};

LoadingProgress.propTypes = {
    size: PropTypes.number,
    thickness: PropTypes.number,
    fullPage: PropTypes.bool,
    color: PropTypes.string,
    style: PropTypes.object
};

export default LoadingProgress;
