import { useEffect } from 'react';
import SemesterBox from './SemesterBox.js';
import styles from './SemesterGrid.module.css';
import { groupCoursesBySemester, useDragAutoScroll } from '../../../../utils/CourseUtils.js';
import { getCourseSeason, getCourseCurricula } from '../../../../api/CoursesApi.js';
import { useCourse } from '../../../../context';


function SemesterGrid() {

    const { courses, addCourse, updateCourse, validateCourses  } = useCourse();

    useEffect(() => {
        validateCourses();
    }, [validateCourses]);

    useDragAutoScroll();

    const semesters = groupCoursesBySemester(Object.values(courses));

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
                await updateCourse(course.id, {semester: targetSemesterId});
            } else {
                const newCourse = await addCourse({
                    uuid: course.uuid,
                    semester: targetSemesterId,
                    code: course.code,
                    title: course.title.et,
                    credits: course.credits,
                });

                const [seasonInfo, curriculumInfo] = await Promise.all([
                    getCourseSeason(course.code),
                    getCourseCurricula(course.uuid)
                ]);

                await updateCourse(newCourse.id, {
                    isAutumnCourse: seasonInfo.isAutumnCourse,
                    isSpringCourse: seasonInfo.isSpringCourse,
                    curriculum: curriculumInfo.default
                });
            }
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
}
export default SemesterGrid;