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
    const [moduleOptions, setModuleOptions] = useState([]);
    const [validationResults, setValidationResults] = useState({});
    const [warnings, setWarnings] = useState({ misplaced: [], doubled: [] });
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCurriculum, setSelectedCurriculum] = useState('2476'); // default is Computer Science

    useEffect(() => {
        async function fetchYears() {
            try {
                const response = await getModuleVersions(selectedCurriculum);
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
        if (selectedCurriculum) {
            fetchYears();
        }
    }, [selectedCurriculum]);


    const loadAllModules = useCallback(async () => {
        try {
            const options = await getModuleOptions();
            setModuleOptions(options);

            const grouped = groupCoursesByModule(Object.values(courses), options);
            setModules(grouped);
        } catch (err) {
            console.error("Failed to load modules:", err);
        }
    }, [courses]);

    const validateModules = useCallback(async (curriculumId, year = selectedYear) => {
        try {
            const results = await checkModules(curriculumId, year);

            const allSubmodules = [
                ...results.modules.required_submodules,
                results.modules.thesis_submodule
            ].filter(Boolean);

            const resultsByCode = allSubmodules.reduce((acc, result) => {
                const code = result.code;
                if (!acc[code]) {
                    acc[code] = {
                        code: code,
                        submodules: [],
                        totalMissing: 0,
                        ok: true
                    };
                }

                acc[code].submodules.push(result);
                acc[code].totalMissing += result.missing.length;
                if (!result.ok) {
                    acc[code].ok = false;
                }

                return acc;
            }, {});
            console.log(resultsByCode);
            setValidationResults(resultsByCode);
            setWarnings(results.warnings || { misplaced: [], doubled: [] });
        } catch (error) {
            console.error("Module validation failed:", error);
        }
    }, [selectedYear]);

    const handleYearChange = (newYear) => {
        setSelectedYear(newYear);
    };

    const handleCurriculumChange = (newCurriculum) => {
        setSelectedCurriculum(newCurriculum);
        setSelectedYear('');
        setYears([]);
    };

    useEffect(() => {
        loadAllModules();
    }, [loadAllModules]);

    useEffect(() => {
        if (selectedYear && selectedCurriculum) {
            validateModules(selectedCurriculum, selectedYear);
        }
    }, [selectedYear, selectedCurriculum, validateModules]);

    const value = {
        modules,
        moduleOptions,
        years,
        selectedYear,
        selectedCurriculum,
        validationResults,
        warnings,
        loadAllModules,
        validateModules,
        setSelectedYear: handleYearChange,
        setSelectedCurriculum: handleCurriculumChange
    };

    return (
        <ModuleContext.Provider value={value}>
            {children}
        </ModuleContext.Provider>
    );
};