import { IconButton, Dialog } from '@primer/react';
import { QuestionIcon } from '@primer/octicons-react';
import {useState} from "react";

function TutorialDialog({title, description}) {

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
                    title={title}
                    onClose={handleClose}
                >
                    {description}
                </Dialog>
            )}
        </div>
    );
}
export default TutorialDialog;