// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import fs from 'fs-extra'
import routes from '../constants/routes';
import styles from './Home.css';

const Home = () => {
  const [modalLanguage, setModalLanguage] = useState('');

  const openObject = (e) => {
    // e.target.value is the path
    const path = e.target.value;
    const fileType = path.split('.')[path.split('.').length - 1];
    if(fileType.toLowerCase() !== 'json') {
      setModalLanguage('Please choose the correct JSON file!');
      // return
    }
  }

  const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalLanguage('');
  }

  return (
    <div className={styles.container} data-tid="container">
      <h2>Sonic Object Editor</h2>
      <div className={styles.homepage__linkBlock}>
        <Link to={routes.EDITOR}>New Object</Link>
        <input className={styles.homepage__uploadInput} type='file' id='objectFile' onChange={e => openObject(e)} />
        <label htmlFor="objectFile">Open Object</label>
      </div>
      {modalLanguage && <div className={styles.homepage__modal} onClick={closeModal}>
        <div className={styles.homepage__innerModalBox}>
          <div className={styles.homepage__innerModalText}>{modalLanguage}</div>
          <div className={styles.homepage__innerModalAcceptText}>Click anywhere to continue</div>
        </div>
      </div>} 
    </div>
  );
}

export default Home;
