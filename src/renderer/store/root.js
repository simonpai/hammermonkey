const LOAD = 'load';

export const type = {
  LOAD
};

export const ipc = {
  load: (event, data) => ({type: LOAD, data})
};
