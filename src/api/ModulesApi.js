import axios from 'axios';

const API_BASE = '/api/modules';

export const getModuleOptions = async () => {
    try {
        const response = await axios.get(API_BASE);
        return response.data.modules;
    } catch (error) {
        console.error("Failed to fetch module options:", error);
        throw new Error("Failed to fetch module options");
    }
};

export async function getModuleVersions(curriculumId) {
    try {
        const response = await axios.get(
            `${API_BASE}/versions/${curriculumId}`
        );
        return response.data;
    } catch (err) {
        console.error("Error checking modules:", err);
        throw err;
    }
}

export async function checkModules(curriculumId, year) {
    try {
        const response = await axios.get(
            `${API_BASE}/check/${curriculumId}/${year}`
        );
        console.log("Modules check response:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error checking modules:", err);
        throw err;
    }
}

