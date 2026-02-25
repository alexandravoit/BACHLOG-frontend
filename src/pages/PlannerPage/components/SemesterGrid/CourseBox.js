import {Text, AnchoredOverlay, Label} from '@primer/react';
import { useState } from 'react';
import { useCourse } from '../../../../context';
import styles from './CourseBox.module.css';

function CourseBox({ course, onDragStart, draggable }) {
    const { getCourseIssues, openPane } = useCourse();
    const issues = getCourseIssues(course.id);
    const moduleClass = course.module ? course.module.toLowerCase() : 'none';

    const [open, setOpen] = useState(false);

    const handleDragStart = (event) => {
        if (onDragStart && course) onDragStart(event, course);
    };

    return (
        <AnchoredOverlay
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderAnchor={(anchorProps) => (
                <div
                    {...anchorProps}
                    className={`${styles.courseBox} ${styles[moduleClass]} ${!issues.ok ? styles.issues : ''}`}
                    draggable={draggable}
                    onDragStart={draggable ? handleDragStart : undefined}
                    onClick={() => openPane(course)}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <Text>{course.code}</Text>
                </div>
            )}
        >
            <div className={styles.overlay}>
                <Text fontWeight="bold">{course.title}</Text>
                <div><Label variant="secondary">{course.credits} EAP</Label></div>
            </div>
        </AnchoredOverlay>
    );
}

export default CourseBox;
