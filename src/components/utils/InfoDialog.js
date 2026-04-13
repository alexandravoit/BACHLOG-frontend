import { Dialog } from '@primer/react';
import IssueAlert from "../issue/IssueAlert";

function InfoDialog({ isOpen, onClose, title, type, heading, message, courseCodes }) {
    if (!isOpen) return null;

    return (
        <Dialog
            title={title}
            onClose={onClose}
        >
            <IssueAlert
                type={type}
                heading={heading}
                message={message}
                courseCodes={courseCodes}
            />
        </Dialog>
    );
}

export default InfoDialog;