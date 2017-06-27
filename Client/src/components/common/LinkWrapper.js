import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LinkWrapper = (props) => {
    return (
        <span>
      {props.disabled ?
          props.children :
          <Link {...props}>
              {props.children}
          </Link>
      }
    </span>
    );
};

LinkWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default LinkWrapper;
