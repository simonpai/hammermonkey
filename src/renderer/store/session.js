import {ipcRenderer as ipcr} from 'electron';

const OPEN_REQUEST = 'session.open.request';
const OPEN_SUCCESS = 'session.open.success';
const OPEN_FAILURE = 'session.open.failure';

// action //
export const action = {
  open: (url) => ({type: OPEN_REQUEST, url})
};

// ipc //
export const ipc = {
  'session.open': (event, url, sessionId) => ({type: OPEN_SUCCESS, url, sessionId})
};

// initial state //
export const initialState = {
  sessions: []
};

// reducer //
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_REQUEST:
      // TODO: create a placeholder session
      ipcr.send('session.open', action.url);
      return state;
    case OPEN_SUCCESS:
      return {
        sessions: [
          ...state.sessions,
          {
            url: action.url,
            sessionId: action.sessionId
          }
        ]
      };
    case OPEN_FAILURE:
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
