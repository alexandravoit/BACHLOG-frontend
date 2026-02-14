import { useEffect } from 'react';
import SemesterBox from './SemesterBox.js';
import styles from './SemesterGrid.module.css';
import { groupCoursesBySemester } from '../../../../utils/CourseUtils.js';
import {
    createCourse,
    updateCourseSemester,
    getCourseSeason,
    updateCourseSeason,
    getCourseCurricula,
    updateCourseCurriculum
} from '../../../../api/CoursesApi.js';
import { useCourse } from '../../../../context';


function SemesterGrid() {

    const { courses, refreshCourse, validateCourses } = useCourse();

    useEffect(() => {
        validateCourses();
    }, [validateCourses]);

    // AUTO-SCROLL ON DRAG, implemented using Claude
    useEffect(() => {
        const handleDragOver = (e) => {
            e.preventDefault();

            const edge = 150;
            const speed = 10;

            if (e.clientY < edge) {
                window.scrollBy(0, -speed);
            } else if (window.innerHeight - e.clientY < edge) {
                window.scrollBy(0, speed);
            }
        };

        document.addEventListener('dragover', handleDragOver);
        return () => document.removeEventListener('dragover', handleDragOver);
    }, []);

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
                await updateCourseSemester(course.id, targetSemesterId);
                await refreshCourse(course.id);
            } else {
                const newCourse = await createCourse({
                    uuid: course.uuid,
                    semester: targetSemesterId,
                    code: course.code,
                    title: course.title.et,
                    credits: course.credits,
                });

                await refreshCourse(newCourse.id);
                await updateNewCourseSeason(newCourse.id, course.code);
                await updateNewCourseCurriculum(newCourse.id, course.uuid);
            }
        } catch (error) {
            console.error('Failed to save course:', error);
        }
    };

    const updateNewCourseSeason = async (courseId, courseCode) => {
        try {
            const seasonInfo = await getCourseSeason(courseCode);
            await updateCourseSeason(courseId, seasonInfo);
            await refreshCourse(courseId);
        } catch (error) {
            console.error("Background season update failed:", error);
        }
    };

    const updateNewCourseCurriculum = async (courseId, courseUuid) => {
        try {
            const curriculumInfo = await getCourseCurricula(courseUuid);
            const curriculum = curriculumInfo.default;
            await updateCourseCurriculum(courseId, curriculum);
            await refreshCourse(courseId);
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