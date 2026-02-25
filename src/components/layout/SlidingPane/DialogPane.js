import React, { useRef } from 'react';
import { Dialog, IconButton } from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import { ReactComponent as BachlogLogo } from '../../../assets/BACHLOG-LOGO.svg';
import styles from './DialogPane.module.css';

function DialogPane({ isOpen, onClose, children }) {
    const returnFocusRef = useRef(null);

    if (!isOpen) return null;

    return (
        <Dialog
            position="left"
            width="small"
            returnFocusRef={returnFocusRef}
            onClose={onClose}

            renderHeader={({ onClose }) => (
                <div className={styles.header}>
                    <BachlogLogo className={styles.logo} />
                    <IconButton
                        icon={XIcon}
                        size="small"
                        variant="invisible"
                        aria-label="Sulge"
                        onClick={onClose}
                    />
                </div>
            )}

            renderBody={() => (
                <div className={styles.body}>
                    {children}
                </div>
            )}
        >
        </Dialog>
    );
}

export default DialogPane;