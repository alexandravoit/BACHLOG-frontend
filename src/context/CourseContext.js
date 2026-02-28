import React, {createContext, useCallback, useContext, useState, useEffect} from 'react';
import { checkCourses } from "../api/CoursesApi";
import { StorageService } from '../services/StorageService';

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

    useEffect(() => {
        const savedCourses = StorageService.getCourses();
        setCourses(savedCourses);
    }, []);

    const loadAllCourses = useCallback(() => {
        const savedCourses = StorageService.getCourses();
        setCourses(savedCourses);
    }, []);

    const addCourse = useCallback((courseData) => {
        const newCourse = StorageService.addCourse(courseData);
        setCourses(StorageService.getCourses());
        return newCourse;
    }, []);

    const addCourses = useCallback((coursesArray) => {
        StorageService.addCourses(coursesArray);
        setCourses(StorageService.getCourses());
    }, []);

    const updateCourse = useCallback((id, updates) => {
        StorageService.updateCourse(id, updates);
        setCourses(StorageService.getCourses());
    }, []);

    const deleteCourse = useCallback((id) => {
        StorageService.deleteCourse(id);
        setCourses(StorageService.getCourses());
    }, []);

    const deleteAllCourses = useCallback(() => {
        StorageService.clearAll();
        setCourses({});
    }, []);

    const validateCourses = useCallback(async () => {
        try {
            const coursesArray = Object.values(courses);
            const results = await checkCourses(coursesArray);

            const resultsById = Object.fromEntries(
                results.map(result => [result.id, result])
            );
            setValidationResults(resultsById);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    }, [courses]);

    const getCourseIssues = useCallback((courseId) => {
        return validationResults[courseId] || { ok: true };
    }, [validationResults]);

    const openPane = useCallback((course) => {
        if (course && course.id) {
            setSelectedCourse(course);
            setIsPaneOpen(true);
        }
    }, []);

    const closePane = useCallback(() => {
        setIsPaneOpen(false);
        setSelectedCourse(null);
    }, []);

    const value = {
        courses,
        loadAllCourses,
        addCourse,
        addCourses,
        updateCourse,
        deleteCourse,
        deleteAllCourses,
        validationResults,
        validateCourses,
        getCourseIssues,
        selectedCourse,
        isPaneOpen,
        openPane,
        closePane
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};