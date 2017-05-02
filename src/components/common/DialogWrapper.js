import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';

const style = {
    content: {
        width: "520px"
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

const DialogWraapper = (props) => {


    return (
        <Dialog
            contentStyle={Object.assign(style.content, {width: props.width})}
            titleStyle={style.title}
            bodyStyle={style.body}
            actionsContainerStyle={style.actionsContainer}
                    {...props}>
            {props.children}
        </Dialog>
    );
};


DialogWraapper.propTypes = {
    width: PropTypes.string,
    children: PropTypes.array
};

export default DialogWraapper;
