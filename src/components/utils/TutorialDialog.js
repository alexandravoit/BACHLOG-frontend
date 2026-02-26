import { IconButton, Dialog } from '@primer/react';
import {QuestionIcon, XIcon} from '@primer/octicons-react';
import { useState } from "react";

function TutorialDialog({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <IconButton
                icon={QuestionIcon}
                size="small"
                variant="invisible"
                aria-label="Info"
                tooltipDirection="s"
                onClick={handleClick}
            />

            {isOpen && (
                <Dialog
                    renderHeader={({ onClose }) => (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px',
                            borderBottom: '1px solid var(--borderColor-muted)'
                        }}>
                            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                                {title}
                            </h1>
                            <IconButton
                                icon={XIcon}
                                size="small"
                                variant="invisible"
                                aria-label="Sulge"
                                onClick={onClose}
                            />
                        </div>
                    )}
                    onClose={handleClose}
                    autoFocus={false}
                >
                    {children}
                </Dialog>
            )}
        </div>
    );
}

export default TutorialDialog;