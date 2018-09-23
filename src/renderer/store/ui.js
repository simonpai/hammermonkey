// action type //
const UI_SIDEBAR_SELECT = 'ui.sidebar.select';
const UI_DIALOG_OPEN = 'ui.dialog.open';

// action //
export const action = {
  sidebar: {
    select: id => ({type: UI_SIDEBAR_SELECT, id})
  },
  dialog: {
    open: id => ({type: UI_DIALOG_OPEN, id})
  }
};

// initial state //
export const initialState = {
  sidebar: {
    selected: 0
  },
  dialog: undefined
  /*
  form: {
    newSession: {
      url: 'http://google.com'
    }
  }
  */
};

// reducer //
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UI_SIDEBAR_SELECT:
      if (action.id < 0 || action.id > 1) {
        return state;
      }
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          selected: action.id
        }
      };
    case UI_DIALOG_OPEN:
      return {
        ...state,
        dialog: action.id
      }
    default:
      return state;
  }
}
