import React from 'react';
import { Text } from '@primer/react';
import { AlertIcon, InfoIcon, CheckCircleIcon, XCircleIcon } from '@primer/octicons-react';
import styles from './IssueAlert.module.css';

function IssueAlert({
                        type = 'danger', // variants are 'danger', 'warning', 'info', 'success'
                        heading,
                        message,
                        courseCodes = []
                    }) {

    const getIcon = () => {
        switch(type) {
            case 'success':
                return <CheckCircleIcon size={12} />;
            case 'info':
                return <InfoIcon size={12} />;
            case 'danger':
                return <XCircleIcon size={12} />;
            case 'warning':
            default:
                return <AlertIcon size={12} />;
        }
    };

    const handleCourseCodeClick = (code) => {
        const url = `https://ois2.ut.ee/#/courses/${code}`;
        window.open(url, '_blank');
    };

    const renderCourseCodes = () => {
        if (courseCodes.length === 0) return null;

        return (
            <div className={styles.courseCodes}>
                {courseCodes.map((code, index) => (
                    <React.Fragment key={code}>
                        <span
                            className={styles.courseCode}
                            onClick={() => handleCourseCodeClick(code)}
                        >
                            {code}{index < courseCodes.length - 1 && ','}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className={`${styles.alert} ${styles[type]}`}>
            <div className={styles.alertTitle}>
                {getIcon()}
                <Text size={'small'} weight={'semibold'}>{heading}</Text>
            </div>
            {message && <Text size={'small'} className={styles.alertText}>{message}</Text>}
            {renderCourseCodes()}
        </div>
    );
}

export default IssueAlert;