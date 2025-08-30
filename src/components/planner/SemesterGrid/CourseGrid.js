import CourseBox from './CourseBox.js';
import styles from './SemesterGrid.module.css';

function CourseGrid({ courses = [], onCourseDrag }) {

  return (
    <div className={styles.courseGrid}>
      {courses.map((course) => (
        <CourseBox
          key={course.id}
          course={course}
          draggable={true}
          onDragStart={(event) => onCourseDrag(event, course)}
        />
      ))}
    </div>
  );
}
export default CourseGrid;