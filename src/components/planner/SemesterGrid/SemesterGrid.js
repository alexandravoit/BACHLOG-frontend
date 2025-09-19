import { useState, useEffect } from 'react';
import SemesterBox from './SemesterBox.js';
import styles from './SemesterGrid.module.css'; 
import { groupCoursesBySemester } from '../../../utils/CourseUtils.js';
import {
    getAllCourses,
    createCourse,
    updateCourseSemester,
    getCourseSeason,
    updateCourseSeason,
    getCourseCurricula,
    updateCourseCurriculum
} from '../../../api/CoursesApi.js';
import { getEmptySemesters } from '../../../constants/Semesters.js';
import { useCourse } from '../../../context';


function SemesterGrid() {
    const { validateCourses } = useCourse();

    const [semesters, setSemesters] = useState(getEmptySemesters());

    useEffect(() => {
        loadCoursesFromDatabase();
        validateCourses();
    }, [validateCourses]);

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
            await loadCoursesFromDatabase();
        } else {
            const newCourse = await createCourse({
                uuid: course.uuid,
                semester: targetSemesterId,
                code: course.code,
                title: course.title.et,
                credits: course.credits,
            });

            await loadCoursesFromDatabase();
            await updateNewCourseSeason(newCourse.id, course.code);
            await updateNewCourseCurriculum(newCourse.id, course.uuid);
        }
/*        setTimeout(() => {
            validateCourses();
        }, 300);*/
    } catch (error) {
    console.error('Failed to save course:', error);
    }
    };

    const updateNewCourseSeason = async (courseId, courseCode) => {
    try {
    const seasonInfo = await getCourseSeason(courseCode);
    await updateCourseSeason(courseId, seasonInfo);
    await loadCoursesFromDatabase();
    } catch (error) {
    console.error("Background season update failed:", error);
    }
    };

    const updateNewCourseCurriculum = async (courseId, courseUuid) => {
    try {
        const curriculumInfo = await getCourseCurricula(courseUuid);
        const curriculum = curriculumInfo.default;
        await updateCourseCurriculum(courseId, curriculum);
        await loadCoursesFromDatabase();
    } catch (error) {
        console.error("Background curriculum update failed:", error);
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
}
export default SemesterGrid;