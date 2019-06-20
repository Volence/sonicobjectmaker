// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import fs from 'fs-extra'
import routes from '../constants/routes';
import styles from './Home.css';

const Home = () => {
  const [modalLanguage, setModalLanguage] = useState('');

  useEffect(() => {
    const preventEnter = (e) => {
      if(e.keyCode === 13) {
        e.preventDefault();
      }
    }
    if(modalLanguage) {
      document.addEventListener("keydown", preventEnter);
    } else {
      document.removeEventListener("keydown", preventEnter);
    }
    return () => {
      document.removeEventListener("keydown", preventEnter);
    };
  }, [modalLanguage]);

  const openObject = (e) => {
    // e.target.value is the path
    const path = e.target.value;
    const fileType = path.split('.')[path.split('.').length - 1];
    if(fileType.toLowerCase() !== 'json') {
      setModalLanguage('Please choose the correct JSON file!');
      // return
    }
  }

  const removeModalIfTrue = fn => arg => fn(arg) === true ? setModalLanguage('') : null;
  const isCorrectAreaClickedToRemoveModal = ({target}) => !document.getElementById('modal').contains(target) ? true : false;
  const isCorrectKeyPressedToRemoveModal = ({key}) => key === 'Enter';
  

  return (
    <div onKeyDown={removeModalIfTrue(isCorrectKeyPressedToRemoveModal)} className={styles.container} data-id="container">
      <h2>Sonic Object Editor</h2>
      <div className={styles.homepage__linkBlock}>
        <Link to={routes.EDITOR}>New Object</Link>
        <input className={styles.homepage__uploadInput} type='file' id='objectFile' onChange={e => openObject(e)} />
        <label htmlFor="objectFile">Open Object</label>
      </div>
      {modalLanguage && <div  className={styles.homepage__modal} onClick={removeModalIfTrue(isCorrectAreaClickedToRemoveModal)}>
        <div id="modal" className={styles.homepage__innerModalBox}>
          <div className={styles.homepage__innerModalText}>{modalLanguage}</div>
          <div className={styles.homepage__innerModalAcceptText}>Click out of the box or hit enter to continue</div>
        </div>
      </div>} 
    </div>
  );
}

export default Home;
