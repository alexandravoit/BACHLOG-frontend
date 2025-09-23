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