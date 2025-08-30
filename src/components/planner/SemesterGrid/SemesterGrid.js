import { useState, useEffect } from 'react';
import SemesterBox from './SemesterBox.js';
import styles from './SemesterGrid.module.css'; 
import { groupCoursesBySemester } from '../../../utils/CourseUtils.js';
import { getAllCourses, createCourse, updateCourseSemester } from '../../../api/CoursesApi.js';
import { getEmptySemesters } from '../../../constants/Semesters.js';


function SemesterGrid() {

  const [semesters, setSemesters] = useState(getEmptySemesters()); 

  useEffect(() => {
    loadCoursesFromDatabase();
  }, []);

  const loadCoursesFromDatabase = async () => {
    try {
      const courses = await getAllCourses();
      const groupedSemesters = groupCoursesBySemester(courses);
      setSemesters(groupedSemesters);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const handleCourseDrag = (event, course, sourceSemesterId) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        course: course,
        sourceSemesterId,
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const addCourseToSemester = async (targetSemesterId, course, sourceSemesterId) => {
    try {
      if (sourceSemesterId) {
        await updateCourseSemester(course.id, targetSemesterId);
      } else {
        await createCourse({
          semester: targetSemesterId,
          code: course.code,
          title: course.title.et,
          credits: course.credits
        });
      }

      await loadCoursesFromDatabase();
    } catch (error) {
      console.error('Failed to save course:', error);
    }
  };

  return (
    <div className={styles.semesterGrid}>
      {semesters.map((semester) => (
        <SemesterBox
          key={semester.id}
          semester={semester}
          onCourseDrop={(courseData) => addCourseToSemester(semester.id, courseData.course, courseData.sourceSemesterId)}
          onCourseDrag={(event, course) => handleCourseDrag(event, course, semester.id)}
        />
      ))}
    </div>
  );
};
export default SemesterGrid;