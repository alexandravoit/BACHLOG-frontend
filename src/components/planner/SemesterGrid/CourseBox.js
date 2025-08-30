import { Text } from '@primer/react';
import styles from './SemesterGrid.module.css'

function CourseBox({ course, onDragStart, draggable }) {

  const handleDragStart = (event) => {
    if (onDragStart && course) {
      onDragStart(event, course);
    }
  };

  return (
    <div
      className={styles.courseBox}
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
    >
      <Text>{course.code}</Text>
    </div>
  );
}
export default CourseBox;