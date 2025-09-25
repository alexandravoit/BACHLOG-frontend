import React, {createContext, useCallback, useContext, useState, useEffect} from 'react';
import {checkCourses, getCourseById, getAllCourses} from "../api/CoursesApi";

const CourseContext = createContext();

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error('useCourse must be used within a CourseProvider');
    }
    return context;
};

export const CourseProvider = ({ children }) => {
    const [validationResults, setValidationResults] = useState({});
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [courses, setCourses] = useState({});

    const loadAllCourses = async () => {
        try {
            const all = await getAllCourses();
            const mapped = Object.fromEntries(all.map(c => [c.id, c]));
            setCourses(mapped);
        } catch (err) {
            console.error("Failed to load courses:", err);
        }
    };

    const refreshCourse = async (courseId) => {
        try {
            const course = await getCourseById(courseId);
            setCourses(prev => ({ ...prev, [courseId]: course }));
            return course;
        } catch (err) {
            console.error('Failed to refresh course:', err);
            return null;
        }
    };

    const validateCourses = useCallback(async () => {
        try {
            const results = await checkCourses();
            const resultsById = Object.fromEntries(
                results.map(result => [result.id, result])
            );
            setValidationResults(resultsById);
        } catch (error) {
            console.error('Automatic validation failed:', error);
        }
    }, [])

    const getCourseIssues = (courseId) => {
        return validationResults[courseId] || { ok: true };
    };

    const openPane = (course) => {
        if (course && course.id) {
            setSelectedCourse(course);
            setIsPaneOpen(true);
        }
    };

    const closePane = () => {
        setIsPaneOpen(false);
        setSelectedCourse(null);
    };

    useEffect(() => {
        loadAllCourses();
    }, []);

    const value = {
        validationResults,
        validateCourses,
        getCourseIssues,
        selectedCourse,
        isPaneOpen,
        openPane,
        closePane,
        courses,
        refreshCourse,
        loadAllCourses
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
