import React, {createContext, useCallback, useContext, useState} from 'react';
import {checkCourses} from "../api/CoursesApi";

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

    const value = {
        validationResults,
        validateCourses,
        getCourseIssues
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
