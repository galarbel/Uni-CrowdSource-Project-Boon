import React, {PropTypes} from "react";
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontAwesome from "react-fontawesome";

const Type1 = ({tag, onSelectAnswer}) => {

    const onTouchTap = function(choice) {
        return () => onSelectAnswer(choice);
    };

    return (
        <div>
            <div>
                is this a <strong style={{textDecoration: "underline"}}>{tag}</strong>?
            </div>

            <div style={{position: 'fixed', bottom: 0, width: "100%", paddingBottom: 20}}>
            <BottomNavigation>
                <BottomNavigationItem
                    label="Yes"
                    icon={<FontAwesome name={"thumbs-o-up"} size="2x"/>}
                    onTouchTap={onTouchTap(1)}
                />
                <BottomNavigationItem
                    label="Not Sure"
                    icon={<FontAwesome name={"question-circle-o"} size="2x"/>}
                    onTouchTap={onTouchTap(0)}
                />
                <BottomNavigationItem
                    label="No"
                    icon={<FontAwesome name={"thumbs-o-down"} size="2x"/>}
                    onTouchTap={onTouchTap(-1)}
                />
            </BottomNavigation>
            </div>
        </div>
    );
};

Type1.propTypes = {
    tag: PropTypes.string.isRequired,
    onSelectAnswer: PropTypes.func.isRequired
};

export default Type1;
