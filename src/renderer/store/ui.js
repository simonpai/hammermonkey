// action type //
const UI_SELECT_PRIMARY = 'ui.selectPrimary';
const UI_SESSION_SELECT_TAB = 'ui.session.selectTab';
const UI_DIALOG_OPEN = 'ui.dialog.open';
const RULE_DELETE_REQUEST = 'rule.delete.request';

// action //
export const action = {
  selectPrimary: (objType, id) => ({type: UI_SELECT_PRIMARY, objType, id}),
  session: {
    selectTab: (id, value) => ({type: UI_SESSION_SELECT_TAB, id, value})
  },
  dialog: {
    open: id => ({type: UI_DIALOG_OPEN, id})
  }
};

// initial state //
export const initialState = {
  primary: undefined,
  session: {},
  dialog: undefined
};

// reducer //
export function reducer(state = initialState, action = {}) {
  const {primary} = state;
  switch (action.type) {
    case UI_SELECT_PRIMARY:
      return {
        ...state,
        primary: action.objType ? {
          type: action.objType,
          id: action.id
        } : undefined
      };
    case UI_SESSION_SELECT_TAB:
      return {
        ...state,
        session: {
          ...state.session,
          [action.id]: {
            ...state.session[action.id],
            selectedTab: action.value
          }
        }
      };
    case UI_DIALOG_OPEN:
      return {
        ...state,
        dialog: action.id
      };
    case RULE_DELETE_REQUEST:
      if (primary && primary.type === 'rule' && primary.id === action.id) {
        return {
          ...state,
          primary: undefined
        };
      }
      return state;
    default:
      return state;
  }
}
