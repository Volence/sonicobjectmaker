import React from 'react';
import styles from '../Editor.css';

const ConditionalCode = ({mainItem, code}) => mainItem && <div className={styles.previewContainer__code}>{code}</div>

export default ConditionalCode;