import CourseBox from "../SemesterGrid/CourseBox.js";
import styles from './SearchBox.module.css'

function SearchResultBox({ courses }) {

  const handleDragStart = (event, course) => {

    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        course: course,
        sourceSemesterId: null,
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  if (!courses || courses.length === 0) return null;

  return (
    <div className={styles.searchResultBox}>
      <div className={styles.coursesResult}>
        {courses.map((course) => (
          <CourseBox
            key={course.code}
            course={course}
            onDragStart={(event) => handleDragStart(event, course)}
            draggable={true}
          />
        ))}
      </div>
    </div>
  );
}
export default SearchResultBox;