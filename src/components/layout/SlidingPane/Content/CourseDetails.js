import React from 'react';
import styles from './CourseDetails.module.css';
import {Label, Text} from '@primer/react';
import {AlertIcon, InfoIcon} from '@primer/octicons-react'
import { getCourseLabels } from "../../../../utils/CourseUtils";
import { useCourse } from '../../../../context';

function CourseDetails({ course }) {
    const labels = getCourseLabels(course);
    const { getCourseIssues } = useCourse();
    const issues =  getCourseIssues(course.id);

    const renderPrereqs = (prereqs) => {
        if (!prereqs) return null;
        return (
            <div className={styles.prereqs}>
                <div className={styles.issueTitle}>
                    <InfoIcon size={12}/>
                    <Text size={'small'}>Eeldusained</Text>
                </div>
                <Text size={'small'}>
                    Planeeri vähemalt üks järgmistest ainetest: {prereqs.join(', ')}
                </Text>
            </div>
        );
    };

    const renderIssues = () => {
        if (issues.ok) return null;
        return (
            <div>
                {issues.issues.map((issue, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.issues}>
                            <div className={styles.issue}>
                                <div className={styles.issueTitle}>
                                    <AlertIcon size={12}/>
                                    <Text size={'small'}>{issue.type}</Text>
                                </div>
                                <Text size={'small'}>{issue.message}</Text>
                            </div>
                        </div>

                        {renderPrereqs(issue.prereqs)}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.courseDetails}>
            <div className={styles.header}>
                <Text size={'large'}>{course.title}</Text>
            </div>

            <Text>{course.code}</Text>

            <div className={styles.labels}>
                {labels.map(label => (
                    <Label key={label.id} variant={label.variant}>
                        {label.content}
                    </Label>
                ))}
            </div>
            {renderIssues()}
        </div>
    );
}

export default CourseDetails;