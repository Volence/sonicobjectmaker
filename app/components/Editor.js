import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Editor.css';
import BasicObjectValuePair from './editor/BasicObjectValuePair';
import ConditionalCode from './editor/ConditionalCode';

const Editor = () => {
    const [gameSelected, setGameSelected] = useState('Sonic 2')
    const [objectName, setObjectName] = useState('ObjXx');
    const [objectDescription, setObjectDescription] = useState('Blank Starter Object');
    const [mappingsFileName, setMappingsFileName] = useState('');
    const [artTile, setArtTile] = useState('');
    const [renderFlags, setRenderFlags] = useState('4');
    const [collisionFlags, setCollisionFlags] = useState('');
    const [priority, setPriority] = useState('');
    const [guideModal, setGuideModal] = useState('');
    const [collisionSize, setCollisionSize] = useState('0');
    const [collisionType, setCollisionType] = useState('0');

    console.log("collision type", collisionType)
    console.log("collision size", collisionSize)

    const loadCollisionGuide = (e) => {
        e.preventDefault();
        setGuideModal(guideModalBase(collisionGuide));
    }

    const removeModalIfTrue = fn => arg => fn(arg) === true ? setGuideModal('') : null;
    const isCorrectAreaClickedToRemoveModal = ({target}) => !document.getElementById('modal').contains(target) ? true : false;
    const isCorrectKeyPressedToRemoveModal = ({key}) => key === 'Enter'; 

    const guideModalBase = (innerContent) => <div onClick={removeModalIfTrue(isCorrectAreaClickedToRemoveModal)} className={styles.guideModal}>{innerContent}</div>;

    const calculateCollision = e =>  {
        e.preventDefault();
        console.log("collision type", collisionType);
        console.log("collision size", collisionSize);
        console.log(parseInt(collisionType + collisionSize, 2).toString(16))
        setCollisionFlags(parseInt(collisionType + collisionSize, 2).toString(16));
        setGuideModal('');
    }

    const collisionGuide = 
    <div id="modal" className={styles.guideModal__innerBox}>
        <form onSubmit={calculateCollision}>
            <div className={styles.guideModal__innerText}>Please select from the following sizes (width x height):</div>
            <select defualtvalue="000000" onChange={e => setCollisionSize(e.target.value)} className={styles.topBar__gameSelection}>
                <option value="000000">4 x 4</option>
                <option value="000111">6 x 6</option>
                <option value="001011">8 x 8</option>
                <option value="011010">$C x $C</option>
                <option value="001110">$E x $E</option>
                <option value="000001">$14 x $14</option>
                <option value="001111">$18 x $18</option>
                <option value="110001">2 x 8</option>
                <option value="011110">4 x 8</option>
                <option value="000100">4 x $10</option>
                <option value="011111">4 x $18</option>
                <option value="100000">4 x $28</option>
                <option value="101000">4 x $40</option>
                <option value="011011">8 x 4</option>
                <option value="010010">8 x $10</option>
                <option value="000010">$C x $14</option>
                <option value="000011">$14 x $C</option>
                <option value="000101">$C x $12</option>
                <option value="000110">$10 x $10</option>
                <option value="001000">$18 x $C</option>
                <option value="001001">$C x $10</option>
                <option value="001010">$10 x 8</option>
                <option value="100011">$C x $18</option>
                <option value="110000">$10 x 1</option>
                <option value="101111">$10 x 2</option>
                <option value="100110">$10 x 4</option>
                <option value="010001">$10 x $18</option>
                <option value="101011">$10 x $20</option>
                <option value="101100">$10 x $30</option>
                <option value="101101">$10 x $40</option>
                <option value="101110">$10 x $50</option>
                <option value="001101">$14 x 8</option>
                <option value="001100">$14 x $10</option>
                <option value="011100">$18 x 4</option>
                <option value="100010">$18 x $18</option>
                <option value="100101">$18 x $28</option>
                <option value="101001">$18 x $80</option>
                <option value="100111">$20 x 2</option>
                <option value="011001">$20 x 8</option>
                <option value="101010">$20 x $10</option>
                <option value="110010">$20 x $1C</option>
                <option value="010110">$20 x $20</option>
                <option value="010011">$20 x $70</option>
                <option value="011101">$28 x 4</option>
                <option value="010000">$28 x $10</option>
                <option value="010100">$40 x $20</option>
                <option value="100100">$48 x 8</option>
                <option value="010101">$80 x $20</option>
            </select>
            <div className={styles.guideModal__innerText}>Please select from the following types of collision:</div>
            <select defualtvalue="00" onChange={e => setCollisionType(e.target.value)} className={styles.topBar__gameSelection}>
                    <option value="00">Enemy</option>
                    <option value="01">Set Routine Counter To 4</option>
                    <option value="10">Harm</option>
                    <option value="11">Special For Starpole</option>
            </select>
            <input type="submit" value="Submit"/>
        </form>
    </div>;

    return(
        <div className={styles.container}  data-id="container">
            <div className={styles.topBar}>
                <Link to={routes.HOME}>Return Home</Link>
                <select value={gameSelected} defualtvalue="Sonic 2" onChange={e => setGameSelected(e.target.value)} className={styles.topBar__gameSelection}>
                    <option value="Sonic 1">Sonic 1</option>
                    <option value="Sonic 2">Sonic 2</option>
                    <option value="Sonic 3 and Knuckles">Sonic 3 and Knuckles</option>
                </select>
            </div>
            <div className={styles.editorTitles}>
                <h1>Code Section:</h1>
                <h1>Preview Section:</h1>
            </div>
            <div className={styles.editorContainer}>
                <div className={styles.codeContainer}>
                    <BasicObjectValuePair itemName="Object Name:" itemValue={objectName} setItem={setObjectName} />
                    <BasicObjectValuePair itemName="Description:" itemValue={objectDescription} setItem={setObjectDescription} />
                    <BasicObjectValuePair itemName="Mappings File Name:" itemValue={mappingsFileName} setItem={setMappingsFileName} />
                    <BasicObjectValuePair itemName="Art Tile:" itemValue={artTile} setItem={setArtTile} type="hex" />
                    <BasicObjectValuePair itemName="Render Flags:" itemValue={renderFlags} setItem={setRenderFlags} type="hex" />
                    <BasicObjectValuePair itemName="Collision Flags:" itemValue={collisionFlags} setItem={setCollisionFlags} type="hex" />
                    <a className={styles.guideOpener} onClick={loadCollisionGuide}>Collision Guide</a>
                    <BasicObjectValuePair itemName="Priority:" itemValue={priority} setItem={setPriority} type="hex" />
                    <div className={styles.codeContainer__basicLabelInput}>
                        <div />
                        <select className={styles.codeContainer__selectionBox} id="new-task">
                            <option value="">--Please select a new task for your object--</option>
                            <option value="movement">Movement</option>
                            <option value="attack">Attack</option>
                        </select>
                    </div>
                </div>


                <div className={styles.previewContainer}>
                    <div className={styles.previewContainer__label}>; ===========================================</div>
                    <div className={styles.previewContainer__label}>; ----------------------------------------------------------------------------</div>
                    <div className={styles.previewContainer__label}>; {objectName} - {objectDescription}</div>
                    <div className={styles.previewContainer__label}>; ----------------------------------------------------------------------------</div>
                    <div className={styles.previewContainer__label}>{objectName}:</div>
                    <div className={styles.previewContainer__code}>moveq    #0,d0</div>
                    <div className={styles.previewContainer__code}>move.b	routine(a0),d0</div>
                    <div className={styles.previewContainer__code}>move.w	{objectName}_Index(pc,d0.w),d1</div>
                    <div className={styles.previewContainer__code}>jmp	{objectName}_Index(pc,d1.w)</div>
                    <div className={styles.previewContainer__spacer}>; ===========================================</div>
                    <div className={styles.previewContainer__label}>{objectName}_Index:	offsetTable</div>
                    <div className={styles.previewContainer__code}>offsetTableEntry.w {objectName}_Init	   ; 0</div>
                    <div className={styles.previewContainer__code}>offsetTableEntry.w {objectName}_Main	   ; 2</div>
                    <div className={styles.previewContainer__spacer}>; ===========================================</div>
                    <div className={styles.previewContainer__label}>{objectName}_Init:</div>
                    <div className={styles.previewContainer__code}>addq.b	#2,routine(a0)</div>
                    <ConditionalCode mainItem={mappingsFileName} code={`move.l	#${mappingsFileName},mappings(a0)`} />
                    <ConditionalCode mainItem={artTile} code={`move.w	#${artTile},art_tile(a0)`} />
                    <ConditionalCode mainItem={renderFlags} code={`ori.b	#${renderFlags},render_flags(a0)`} />
                    <ConditionalCode mainItem={collisionFlags} code={`move.b	#$${collisionFlags},collision_flags(a0)`} />
                    <ConditionalCode mainItem={priority} code={`move.b	#${priority},priority(a0)`} />
                </div>
            </div>
            {guideModal}
        </div>    
    );
}

export default Editor;