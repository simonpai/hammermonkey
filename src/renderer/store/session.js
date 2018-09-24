import {ipcRenderer as ipcr} from 'electron';

const OPEN_REQUEST = 'session.open.request';
const OPEN_SUCCESS = 'session.open.success';
const OPEN_FAILURE = 'session.open.failure';
const URL_REQUEST = 'session.url.request';
const URL_SUCCESS = 'session.url.success';
const URL_FAILURE = 'session.url.failure';

// action //
export const action = {
  open: () => ({type: OPEN_REQUEST}),
  url: (sessionId, url) => ({type: URL_REQUEST, sessionId, url})
};

// ipc //
export const ipc = {
  'session.open': (event, sessionId) => ({type: OPEN_SUCCESS, sessionId}),
  'session.url': (event, sessionId, url) => ({type: URL_SUCCESS, sessionId, url})
};

// initial state //
export const initialState = {
  map: {},
  ids: []
};

// reducer //
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_REQUEST:
      // TODO: create a placeholder session
      ipcr.send('session.open');
      return state;
    case OPEN_SUCCESS:
      return {
        ...state,
        map: {
          ...state.map,
          [action.sessionId]: {
            sessionId: action.sessionId
          }
        },
        ids: [
          ...state.ids,
          action.sessionId
        ]
      };
    case OPEN_FAILURE:
      // TODO
      return state;
    case URL_REQUEST:
      if (!action.url.trim()) {
        return state;
      }
      // TODO: throttle
      ipcr.send('session.url', action.sessionId, action.url.trim());
      return state;
    case URL_SUCCESS:
      return {
        ...state,
        map: {
          ...state.map,
          [action.sessionId]: {
            ...state.map[action.sessionId],
            url: action.url
          }
        }
      };
    case URL_FAILURE:
      // TODO
      return state;
    default:
      return state;
  }
}

/*
function* open(action) {
  try {
    const session = yield call(bridge.open, action.url);
    yield put({
      type: OPEN_SUCCESS,
      session: session
    });
  } catch(err) {
    yield put({
      type: OPEN_FAILURE,
      message: err.message
    });
  }
}

export function* saga() {
  yield all([
    takeEvery(OPEN_REQUEST, open)
  ]);
}
*/
