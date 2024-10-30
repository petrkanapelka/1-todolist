import axios from 'axios';
import { BEARER_TOKEN, API_KEY } from '../../api-env';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: BEARER_TOKEN,
        'API-KEY': API_KEY,
    },
});
