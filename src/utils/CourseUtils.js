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

export const groupCoursesByModule = (courses, modules) => {
    return modules.map((module) => {
        const moduleCourses = courses.filter(
            (course) => course.module === module.code
        );
        const totalEap = moduleCourses.reduce(
            (sum, course) => sum + (course.credits || 0),
            0
        );
        return {
            ...module,
            courses: moduleCourses,
            totalEap,
        };
    });
};

export const getCourseLabels = (course) => {
    const labels = [];

    labels.push({
        id: 'eap',
        variant: 'secondary',
        content: `${course.credits} EAP`
    });

    if (course.isAutumnCourse) {
        labels.push({
            id: 'autumn',
            variant: 'severe',
            content: 'Sügis'
        });
    }
    if (course.isSpringCourse) {
        labels.push({
            id: 'spring',
            variant: 'success',
            content: 'Kevad'
        });
    }
    return labels;
};