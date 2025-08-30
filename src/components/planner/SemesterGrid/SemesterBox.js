import { Text, Label } from "@primer/react";
import CourseGrid from './CourseGrid.js';
import styles from './SemesterGrid.module.css'

function SemesterBox({ semester, onCourseDrop, onCourseDrag }) {

  const handleDrop = (event) => {
    event.preventDefault();
    const courseData = event.dataTransfer.getData("application/json");
    if (courseData) {
      const course = JSON.parse(courseData);
      onCourseDrop(course);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={styles.semesterBox}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={styles.header}>
        <Text>{semester.name}</Text>
        <Label variant="secondary">{semester.totalEap} EAP</Label>
      </div>

      <CourseGrid
        courses={semester.courses}
        onCourseDrag={onCourseDrag}
      />

    </div>
  );
}
export default SemesterBox;
