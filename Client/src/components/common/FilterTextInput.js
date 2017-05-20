import React, {PropTypes} from 'react';
import FontAwesome from "react-fontawesome";


const styles ={
    inputDiv :{
        display:'inline-block'
    },
    iconDiv:{
        display: 'inline-block',
        border: '1px solid #999',
        borderLeft: '0px',
        paddingRight: '3px'
    },
    input:{
        width: '250px',
        height:'27px',
        padding:'3px',
        border: '1px solid #999',
        borderRight: '0px'
    }
};

const FilterTextInput = ({name, label, onChange, placeholder, value, showLabel}) => {
    return (
        <div style={{display: 'inline-block',marginRight: '10px'}}>
            {showLabel && <label htmlFor={name}>{label}</label>}
            <div className="field" style={styles.inputDiv}>
                <input style={styles.input}
                       name={name}
                       className="form-control"
                       type="text"
                       placeholder={placeholder}
                       value={value}
                       onChange={onChange}/>
            </div>
            <div style={styles.iconDiv}><FontAwesome name="search" /></div>
        </div>
    );
};

FilterTextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    showLabel: PropTypes.bool,
};

FilterTextInput.defaultProps = {
    showLabel: true
};


export default FilterTextInput;
