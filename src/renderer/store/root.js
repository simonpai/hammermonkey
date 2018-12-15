import { MTR } from '../../shared/model/ipc';
import { LOAD } from './types';

export const ipc = {
  [MTR.LOAD]: (event, data) => ({type: LOAD, data})
};
