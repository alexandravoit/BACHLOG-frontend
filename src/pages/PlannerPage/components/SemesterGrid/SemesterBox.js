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
          <div className={styles.labels}>
              <Label
                  variant={semester.id % 2 !== 0 ? 'severe' : 'success'}
                  sx={{ fontSize: 'var(--font-size-label)' }}
              >
                  {semester.id % 2 !== 0 ? 'Sügis' : 'Kevad'}
              </Label>
              <Label
                  variant="secondary"
                  sx={{ fontSize: 'var(--font-size-label)' }}
              >
                  {semester.totalEap} EAP
              </Label>
          </div>
      </div>

      <CourseGrid
        courses={semester.courses}
        onCourseDrag={onCourseDrag}
      />

    </div>
  );
}
export default SemesterBox;
