// NOTE: Claude has been used to help migration from classical DB in backend to localstorage

const STORAGE_KEYS = {
    COURSES: 'bachlog_courses',
    LAST_SAVED: 'bachlog_last_saved',
    LAST_EXPORT: 'bachlog_last_export'
};

export const StorageService = {

    getCourses: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.COURSES);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Failed to load courses:', error);
            return {};
        }
    },

    saveCourses: (courses) => {
        try {
            localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
            localStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
            return true;
        } catch (error) {
            console.error('Failed to save courses:', error);
            return false;
        }
    },

    addCourse: (courseData) => {
        const courses = StorageService.getCourses();
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newCourse = { ...courseData, id };

        courses[id] = newCourse;
        StorageService.saveCourses(courses);
        return newCourse;
    },

    addCourses: (coursesArray) => {
        const courses = StorageService.getCourses();

        coursesArray.forEach((courseData, index) => {
            const id = `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
            courses[id] = { ...courseData, id };
        });

        StorageService.saveCourses(courses);
        return courses;
    },

    updateCourse: (id, updates) => {
        const courses = StorageService.getCourses();
        if (courses[id]) {
            courses[id] = { ...courses[id], ...updates };
            StorageService.saveCourses(courses);
            return courses[id];
        }
        return null;
    },

    deleteCourse: (id) => {
        const courses = StorageService.getCourses();
        delete courses[id];
        StorageService.saveCourses(courses);
        return courses;
    },

    clearAll: () => {
        localStorage.removeItem(STORAGE_KEYS.COURSES);
        localStorage.removeItem(STORAGE_KEYS.LAST_SAVED);
        return {};
    },

    // METADATA
    getLastSaved: () => {
        return localStorage.getItem(STORAGE_KEYS.LAST_SAVED);
    },

    markExported: () => {
        localStorage.setItem(STORAGE_KEYS.LAST_EXPORT, new Date().toISOString());
    },

    getLastExport: () => {
        return localStorage.getItem(STORAGE_KEYS.LAST_EXPORT);
    }
};