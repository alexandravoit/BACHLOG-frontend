import axios from 'axios';
import { Course } from '../models/Course.js';


const API_BASE = '/api/courses';

const normalizeCourse = (dbCourse) => {
  return new Course(dbCourse);
};

// SEARCH
export const searchCourses = async (query) => {
  try {
    const response = await axios.get(`${API_BASE}/search`, {
      params: {
        q: query.toUpperCase()
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching courses:', error);
    throw new Error('Failed to fetch courses');
  }
};

// DATABASE
export const getAllCourses = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data.map(normalizeCourse);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw new Error('Failed to load courses');
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data.map(normalizeCourse);
  } catch (error) {
    console.error('Failed to fetch course:', error);
    throw new Error('Course not found');
  }
};

export const getCoursesBySemester = async (semester) => {
  try {
    const response = await axios.get(`${API_BASE}/semester/${semester}`);
    return response.data.map(normalizeCourse);
  } catch (error) {
    console.error('Failed to fetch courses by semester:', error);
    throw new Error('Failed to load semester courses');
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(API_BASE, courseData);
    return response.data;
  } catch (error) {
    console.error('Failed to create course:', error);
    throw new Error('Failed to save course');
  }
};

export const updateCourseSemester = async (id, semester) => {
  try {
    const response = await axios.put(`${API_BASE}/${id}`, { semester });
    return response.data;
  } catch (error) {
    console.error('Failed to update course:', error);
    throw new Error('Failed to move course');
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete course:', error);
    throw new Error('Failed to delete course');
  }
};

