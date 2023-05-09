import dotenv from 'dotenv';
dotenv.config();

export default function apiUrl() {
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL_PROD : process.env.API_URL_DEV;
    return apiUrl;
}