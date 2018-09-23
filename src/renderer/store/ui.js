// action type //
const UI_SIDEBAR_SELECT_TAB = 'ui.sidebar.selectTab';
const UI_SIDEBAR_SELECT_OBJECT = 'ui.sidebar.selectObject';
const UI_DIALOG_OPEN = 'ui.dialog.open';

// action //
export const action = {
  sidebar: {
    selectTab: id => ({type: UI_SIDEBAR_SELECT_TAB, id}),
    selectObject: (objType, id) => ({type: UI_SIDEBAR_SELECT_OBJECT, objType, id})
  },
  dialog: {
    open: id => ({type: UI_DIALOG_OPEN, id})
  }
};

// initial state //
export const initialState = {
  sidebar: {
    selectedTab: 0,
    selectedObject: undefined
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
    case UI_SIDEBAR_SELECT_TAB:
      if (action.id < 0 || action.id > 1) {
        return state;
      }
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          selectedTab: action.id
        }
      };
    case UI_SIDEBAR_SELECT_OBJECT:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          selectedObject: action.objType ? {
            type: action.objType,
            id: action.id
          } : undefined
        }
      };
    case UI_DIALOG_OPEN:
      return {
        ...state,
        dialog: action.id
      };
    default:
      return state;
  }
}
