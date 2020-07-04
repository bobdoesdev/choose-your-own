import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://choose-your-own-adventur-8cf98.firebaseio.com/'
});

export default instance;





