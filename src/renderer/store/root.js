import { LOAD } from './types';

export const ipc = {
  load: (event, data) => ({type: LOAD, data})
};
