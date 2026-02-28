import axios from 'axios';
import { StorageService } from '../services/StorageService';

const API_BASE = '/api/courses';

// OIS API

export const searchCourses = async (query) => {
    try {
        const response = await axios.get(`${API_BASE}/search`, {
            params: { q: query.toUpperCase() }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching courses:', error);
        throw new Error('Failed to fetch courses');
    }
};

export const getCourseSeason = async (query) => {
    try {
        const response = await axios.get(`${API_BASE}/season`, {
            params: { q: query.toUpperCase() }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting course season:', error);
        throw new Error('Failed to get course season');
    }
};

export const getCourseCurricula = async (courseUuid) => {
    try {
        const response = await axios.get(`${API_BASE}/curricula`, {
            params: { q: courseUuid }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting course curricula:', error);
        throw new Error('Failed to get course curricula');
    }
};

export const getAllCurricula = async () => {
    try {
        const response = await axios.get(`${API_BASE}/curricula/all`);
        return response.data;
    } catch (error) {
        console.error('Error getting all curricula:', error);
        throw new Error('Failed to get all curricula');
    }
};

// VALIDATION

export const checkCourses = async (coursesData) => {
    try {
        const response = await axios.post(`${API_BASE}/check/all`, {
            courses: coursesData
        });
        return response.data;
    } catch (error) {
        console.error('Error checking all courses:', error);
        throw error.response?.data || { error: 'Failed to check all courses' };
    }
};


// CSV

export const parseCsv = async (file) => {
    try {
        const formData = new FormData();
        formData.append('csv', file);

        const response = await axios.post(`${API_BASE}/parser`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        console.error('CSV upload failed:', error);
        throw new Error(error.response?.data?.error || 'Failed to upload CSV file');
    }
};

// NOTE: Claude was used to refactor csv logic from backend to frontend (due to DB removal)

export const exportCsv = async () => {
    try {
        const courses = Object.values(StorageService.getCourses());

        // CREATE
        const csvRows = [
            'KOOD,SEMESTER,MOODUL',
            ...courses.map(course =>
                `${course.code},${course.semester},${course.module || ''}`
            )
        ];
        const csvContent = csvRows.join('\n');

        // DOWNLOAD
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'BACHLOG.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();

        StorageService.markExported();
    } catch (error) {
        console.error('CSV export failed:', error);
        throw error;
    }
};