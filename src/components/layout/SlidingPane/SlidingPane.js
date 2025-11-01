import React from 'react';
import { IconButton } from '@primer/react';
import {XIcon} from '@primer/octicons-react'
import { ReactComponent as BachlogLogo } from '../../../assets/BACHLOG-LOGO.svg';
import styles from './SlidingPane.module.css';

function SlidingPane({ isOpen, onClose, children }) {
    return (
        <div>
            <div className={styles.overlay} onClick={onClose}></div>

            <div className={styles.slidingPane}>
                <div className={styles.heading}>
                    <BachlogLogo className={styles.logo} />
                    <IconButton icon={XIcon} size="small" variant="invisible" onClick={onClose}>✕</IconButton>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
export default SlidingPane;