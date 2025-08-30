import { getEmptySemesters } from '../constants/Semesters.js';

export const groupCoursesBySemester = (courses) => {

    return getEmptySemesters().map(semester => {
        const semesterCourses = courses.filter(course => course.semester === semester.id);
        const totalEap = semesterCourses.reduce((sum, course) => sum + (course.credits || 0), 0);
        
        return {
        ...semester,
        courses: semesterCourses,
        totalEap
        };
    });
};