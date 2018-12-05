// type //
const UI_SELECT_PRIMARY = 'ui.selectPrimary';
const UI_SESSION_SECTION = 'ui.session.section';
const UI_RULE_SECTION = 'ui.rule.section';
const UI_DIALOG_OPEN = 'ui.dialog.open';

const SESSION_DELETE_REQUEST = 'session.delete.request';
const RULE_DELETE_REQUEST = 'rule.delete.request';

// action //
export const action = {
  selectPrimary: (objType, id) => ({type: UI_SELECT_PRIMARY, objType, id}),
  session: {
    section: (id, value) => ({type: UI_SESSION_SECTION, id, value})
  },
  rule: {
    section: (id, value) => ({type: UI_RULE_SECTION, id, value})
  },
  dialog: {
    open: id => ({type: UI_DIALOG_OPEN, id})
  }
};

// initial state //
export const initialState = {
  primary: undefined,
  session: {},
  rule: {},
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
    case UI_SESSION_SECTION:
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
    case UI_RULE_SECTION:
      return {
        ...state,
        rule: {
          ...state.rule,
          [action.id]: {
            ...state.rule[action.id],
            section: action.value
          }
        }
      };
    case UI_DIALOG_OPEN:
      return {
        ...state,
        dialog: action.id
      };

    // TODO: simplify
    case SESSION_DELETE_REQUEST:
      if (primary && primary.type === 'session' && primary.id === action.id) {
        return {
          ...state,
          primary: undefined
        };
      }
      return state;
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
