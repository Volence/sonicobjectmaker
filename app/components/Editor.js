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

    useEffect(() => {
        if(guideModal) {
            document.addEventListener("keydown", removeModalIfTrue(isCorrectKeyPressedToRemoveModal));
        } else {
            document.removeEventListener("keydown", removeModalIfTrue(isCorrectKeyPressedToRemoveModal));
        }
        return () => {
            document.removeEventListener("keydown", removeModalIfTrue(isCorrectKeyPressedToRemoveModal));
        };
    }, [guideModal]);

    const loadCollisionGuide = (e) => {
        e.preventDefault();
        setGuideModal(guideModalBase(collisionGuide));
    }

    const removeModalIfTrue = fn => arg => fn(arg) === true ? setGuideModal('') : null;
    const isCorrectAreaClickedToRemoveModal = ({target}) => !document.getElementById('modal').contains(target) ? true : false;
    const isCorrectKeyPressedToRemoveModal = ({key}) => {
        console.log('hey')
      return  key === 'Enter'; 
    } 

    const guideModalBase = (innerContent) => <div onClick={removeModalIfTrue(isCorrectAreaClickedToRemoveModal)} className={styles.guideModal}>{innerContent}</div>;

    const collisionGuide = 
    <div id="modal" className={styles.guideModal__innerBox}>
            <div className={styles.guideModal__innerText}>Please select from the following sizes:</div>
            <div className={styles.guideModal__innerAcceptText}>Click anywhere to continue</div>
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