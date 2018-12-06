// type //
const UI_BODY_SELECT = 'ui.body.select';
const UI_SESSION_SECTION_SELECT = 'ui.session.section.select';
const UI_RULE_SECTION_SELECT = 'ui.rule.section.select';
const UI_DIALOG_OPEN = 'ui.dialog.open';

const SESSION_DELETE_REQUEST = 'session.delete.request';
const RULE_DELETE_REQUEST = 'rule.delete.request';

// action //
export const action = {
  selectBody: (type, id) => ({type: UI_BODY_SELECT, value: [type, id]}),
  session: {
    selectSection: (id, value) => ({type: UI_SESSION_SECTION_SELECT, id, value})
  },
  rule: {
    selectSection: (id, value) => ({type: UI_RULE_SECTION_SELECT, id, value})
  },
  dialog: {
    open: id => ({type: UI_DIALOG_OPEN, id})
  }
};

// initial state //
export const initialState = {
  body: undefined,
  session: {},
  rule: {},
  dialog: undefined
};

// reducer //
export function reducer(state = initialState, action = {}) {
  const {body} = state;
  switch (action.type) {
    case UI_BODY_SELECT:
      return {
        ...state,
        body: action.value
      };
    case UI_SESSION_SECTION_SELECT:
      return {
        ...state,
        session: {
          ...state.session,
          [action.id]: {
            ...state.session[action.id],
            section: action.value
          }
        }
      };
    case UI_RULE_SECTION_SELECT:
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
      if (body && body.type === 'session' && body.id === action.id) {
        return {
          ...state,
          body: undefined
        };
      }
      return state;
    case RULE_DELETE_REQUEST:
      if (body && body.type === 'rule' && body.id === action.id) {
        return {
          ...state,
          body: undefined
        };
      }
      return state;
    default:
      return state;
  }
}
