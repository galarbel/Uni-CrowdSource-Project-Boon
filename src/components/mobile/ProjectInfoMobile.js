import React, {PropTypes} from "react";

class ProjectInfoMobile extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div style={{margin: 20}}>
                <div style={{textAlign: 'center'}}>Mobile View</div>
                <div className="cp_h2_black">This is a react starter project.</div>
                <div className="cp_h3">Introduction:
                    <div className="cp_h3_black">
                        This is a ReactJS starter project for My Checkpoint apps.
                        It is based on React, Redux and React Router.
                    </div>
                </div>
                <div className="cp_h3" style={{textAlign: 'center', marginTop: 100}}>
                    Please switch to desktop mode to view more info about the project.
                </div>
            </div>
        );
    }
}


export default ProjectInfoMobile;
