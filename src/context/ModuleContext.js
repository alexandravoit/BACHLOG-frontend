import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getModuleOptions, checkModules, getModuleVersions } from "../api/ModulesApi";
import { groupCoursesByModule } from "../utils/CourseUtils";
import { useCourse } from "./CourseContext";

const ModuleContext = createContext();

export const useModules = () => {
    const context = useContext(ModuleContext);
    if (!context) {
        throw new Error("useModules must be used within a ModuleProvider");
    }
    return context;
};

export const ModuleProvider = ({ children }) => {
    const { courses } = useCourse();

    const [modules, setModules] = useState([]);
    const [validationResults, setValidationResults] = useState({});
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        async function fetchYears() {
            try {
                const curriculumId = '2476';
                const response = await getModuleVersions(curriculumId);
                const yearOptions = response.result || [];
                setYears(yearOptions);
                if (yearOptions.length > 0) {
                    setSelectedYear(yearOptions[0]);
                }
            } catch (error) {
                console.error('Failed to fetch years:', error);
                setYears([]);
            }
        }
        fetchYears();
    }, []);

    const loadAllModules = useCallback(async () => {
        try {
            const options = await getModuleOptions();
            const grouped = groupCoursesByModule(Object.values(courses), options);
            setModules(grouped);
        } catch (err) {
            console.error("Failed to load modules:", err);
        }
    }, [courses]);

    const validateModules = useCallback(async (curriculumId, year = selectedYear) => {
        try {
            const results = await checkModules(curriculumId, year);

            const resultsByKey = Object.fromEntries(
                results.modules.map(result => [result.title, result])
            );

            setValidationResults(resultsByKey);
        } catch (error) {
            console.error("Module validation failed:", error);
        }
    }, [selectedYear]);

    const getModuleIssues = (moduleCode, moduleTitle) => {
        const key = `${moduleCode}-${moduleTitle}`;
        return validationResults[key] || { ok: true, missing: [] };
    };

    const handleYearChange = (newYear) => {
        setSelectedYear(newYear);
    };

    useEffect(() => {
        loadAllModules();

        if (selectedYear) {
            validateModules(2476, selectedYear);
        }
    }, [loadAllModules, selectedYear, validateModules]);

    const value = {
        modules,
        years,
        selectedYear,
        validationResults,
        loadAllModules,
        validateModules,
        getModuleIssues,
        setSelectedYear: handleYearChange
    };

    return (
        <ModuleContext.Provider value={value}>
            {children}
        </ModuleContext.Provider>
    );
};