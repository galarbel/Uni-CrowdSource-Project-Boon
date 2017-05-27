import React, {PropTypes} from "react";
import CircularProgress from "material-ui/CircularProgress";

const LoadingProgress = ({size = 150, thickness = 5, color = "rgb(9, 81, 21)", fullPage = true, style}) => {
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
