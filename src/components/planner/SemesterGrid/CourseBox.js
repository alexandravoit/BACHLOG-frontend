import { Text } from '@primer/react';
import {useCourse} from '../../../context';
import styles from './SemesterGrid.module.css'

function CourseBox({ course, onDragStart, draggable }) {

    const { getCourseIssues } = useCourse();
    const issues = getCourseIssues(course.id);

    const handleDragStart = (event) => {
    if (onDragStart && course) {
      onDragStart(event, course);
    }
  };

  return (
    <div
        className={`${styles.courseBox} ${!issues.ok ? styles.hasIssues : ''}`}
        draggable={draggable}
        onDragStart={draggable ? handleDragStart : undefined}
    >
      <Text>{course.code}</Text>
    </div>
  );
}
export default CourseBox;