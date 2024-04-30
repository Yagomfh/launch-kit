import axios from 'axios';

import { setupInterceptors } from '../../../.';

export const api = setupInterceptors(
  axios.create({
    baseURL: 'http://localhost:3000',
  })
);
