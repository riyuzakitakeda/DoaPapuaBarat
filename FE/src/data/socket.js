import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_API_URL;
const user = await JSON.parse(localStorage.getItem('user'));

export const socket = io(URL, {
  autoConnect: false,
  path: '/ws',
  auth: {
    token: user ? user.token : ''
  }
});