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

const normalizeCourse = (course) => ({
    ...course,
    title: course.title?.et || course.title?.en || course.code,
    code: course.code
});

  if (!courses || courses.length === 0) return null;

  return (
    <div className={styles.searchResultBox}>
      <div className={styles.coursesResult}>
          {courses.map((course) => {
              const normalizedCourse = normalizeCourse(course);
              return (
                  <CourseBox
                      key={normalizedCourse.code}
                      course={normalizedCourse}
                      onDragStart={(event) => handleDragStart(event, course)}
                      draggable={true}
                  />
              );
          })}
      </div>
    </div>
  );
}
export default SearchResultBox;