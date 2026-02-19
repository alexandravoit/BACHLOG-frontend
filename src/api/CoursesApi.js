import axios from 'axios';

const API_BASE = '/api/courses';

// COURSES API
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

export const getCourseSeason = async (query) => {
  try {
    const response = await axios.get(`${API_BASE}/season`, {
      params: {
        q: query.toUpperCase()
      }
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
            params: {
                q: courseUuid
            }
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

// DATABASE
export const getAllCourses = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw new Error('Failed to load courses');
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    throw new Error('Course not found');
  }
};

export const getCoursesBySemester = async (semester) => {
  try {
    const response = await axios.get(`${API_BASE}/semester/${semester}`);
    return response.data;
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
    const response = await axios.put(`${API_BASE}/${id}/semester`, { semester });
    return response.data;
  } catch (error) {
    console.error('Failed to update course:', error);
    throw new Error('Failed to move course');
  }
};

export const updateCourseSeason = async (courseId, seasonInfo) => {
  try {
    const response = await axios.put(`${API_BASE}/${courseId}/season`, seasonInfo);
    return response.data;
  } catch (error) {
    console.error('Failed to update course season:', error);
    throw new Error('Failed to update course season');
  }
};

export const updateCourseCurriculum = async (courseId, curriculum) => {
    try {
        const response = await axios.put(`${API_BASE}/${courseId}/curriculum`, {curriculum});
        return response.data;
    } catch (error) {
        console.error('Failed to update course curriculum:', error);
        throw new Error('Failed to update course curriculum');
    }
};

export const updateCourseModule = async (courseId, module) => {
    try {
        const response = await axios.put(`${API_BASE}/${courseId}/module`, {module});
        return response.data;
    } catch (error) {
        console.error('Failed to update course module:', error);
        throw new Error('Failed to update course module');
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

export const deleteAllCourses = async () => {
    try {
        const response = await axios.delete(`${API_BASE}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete all courses:', error);
        throw new Error('Failed to delete all courses');
    }
};

// CSV PARSER
export const parseCsv = async (file) => {
    try {
        const formData = new FormData();
        formData.append('csv', file);

        const response = await axios.post(`${API_BASE}/parser`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('CSV upload failed:', error);
        throw new Error(error.response?.data?.error || 'Failed to upload CSV file');
    }
};

// CHECKER

export const checkCourse = async (courseId) => {
    try {
        const response = await axios.get(`${API_BASE}/${courseId}/check`);
        return response.data;
    } catch (error) {
        console.error('Error checking course:', error);
        throw error.response?.data || { error: 'Failed to check course' };
    }
};

export const checkCourses = async () => {
    try {
        const response = await axios.get(`${API_BASE}/check/all`);
        console.log('Check response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error checking all courses:', error);
        throw error.response?.data || { error: 'Failed to check all courses' };
    }
};