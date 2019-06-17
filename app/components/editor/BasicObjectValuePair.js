import React from 'react';
import styles from '../Editor.css';

const hexExp = new RegExp(/[0-9A-Fa-f]/g);
const onlyHexExp = new RegExp(/[a-zA-Z]/)

const BasicObjectValuePair = ({itemValue, setItem, itemName, type}) => {
    const updateTypeCheck = (value, setItem, type="any") => {
        if(type === "hex") {
                const valueHexOnly = value.match(hexExp)?.join('') || '';
                onlyHexExp.test(valueHexOnly) ? setItem(`$${valueHexOnly}`) : setItem(valueHexOnly);         
        } else {
            setItem(value);    
        }
    }
    return (
        <div className={styles.codeContainer__basicLabelInput}>
            <label>{itemName}</label>
            <input type="text" value={itemValue} onChange={e => updateTypeCheck(e.target.value, setItem, type)}></input>
        </div>
    )
}

export default BasicObjectValuePair;