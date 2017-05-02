import React, {Component, PropTypes} from "react";

import ArrowUp from "../../../../resources/svg/Arrow_Up.svg";
import ArrowDown from "../../../../resources/svg/Arrow_Down.svg";

class ExpanderComponent extends Component {

    render() {
        return (
            <div style={{marginLeft: 5, marginRight: 5}}>
                {this.props.isExpanded ?
                    <ArrowDown height="1vh" width="1vh"/> :
                    <ArrowUp height="1vh" width="1vh"/>
                }
            </div>
        );
    }
}

ExpanderComponent.propTypes = {
    isExpanded: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};
ExpanderComponent.defaultProps = {};

export default ExpanderComponent;
