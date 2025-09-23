import { Text } from '@primer/react';
import {useCourse} from '../../../context';
import styles from './CourseBox.module.css'

function CourseBox({ course, onDragStart, draggable }) {

    const { getCourseIssues, openPane } = useCourse();
    const issues = getCourseIssues(course.id);
    const moduleClass = course.module ? course.module.toLowerCase() : 'none';

    const handleDragStart = (event) => {
    if (onDragStart && course) {
      onDragStart(event, course);
    }
  };

  return (
    <div
        className={`${styles.courseBox} ${styles[moduleClass]} ${!issues.ok ? styles.issues : ''}`}
        draggable={draggable}
        onDragStart={draggable ? handleDragStart : undefined}
        onClick={() => openPane(course)} //
    >
      <Text>{course.code}</Text>
    </div>
  );
}
export default CourseBox;