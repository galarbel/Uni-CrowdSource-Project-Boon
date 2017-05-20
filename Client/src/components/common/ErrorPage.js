import React, {PropTypes} from "react";

const ErrorPage = ({msg}) => {
    return (
        <div style={{margin: 20}}>
            <h2>Error</h2>
            <div>
                An error has occurred. <br/><br/>
                Please try to refresh the page or contact Application HelpDesk.

                <div>Error: {msg}</div>
            </div>

        </div>
    );
};

ErrorPage.propTypes = {
   msg: PropTypes.string
};

export default ErrorPage;
