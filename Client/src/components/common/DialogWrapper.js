import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';

const style = {
    content: {
        width: "90%"
    },

    title: {
        color: "#fff",
        fontSize: "15px",
        padding: "3px 3px 3px 10px",
        backgroundColor: "#666"
    },

    body: {
        color: "#333"
    },

    actionsContainer: {
        textAlign: "left",
        paddingLeft: "24px",
        textTransform: "capitalize"
    }

};

const DialogWrapper = (props) => {
    return (
        <Dialog
            contentStyle={Object.assign(style.content, {top: (props.isKeyboardOpen ? -140 : 0)})}
            titleStyle={style.title}
            bodyStyle={style.body}
            actionsContainerStyle={style.actionsContainer}
                    {...props}>
            {props.children}
        </Dialog>
    );
};


DialogWrapper.propTypes = {
    width: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    isKeyboardOpen: PropTypes.bool
};

export default DialogWrapper;
