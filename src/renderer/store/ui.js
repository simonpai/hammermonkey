// type //
const UI_BODY_SELECT = 'ui.body.select';
const UI_SESSION_SECTION_SELECT = 'ui.session.section.select';
const UI_RULE_SECTION_SELECT = 'ui.rule.section.select';
const UI_CONFIRM_OPEN = 'ui.confirm.open';

const SESSION_DELETE_REQUEST = 'session.delete.request';
const RULE_DELETE_REQUEST = 'rule.delete.request';

// action //
export const action = {
  setBody: (type, id) => ({type: UI_BODY_SELECT, value: [type, id]}),
  session: {
    selectSection: (id, value) => ({type: UI_SESSION_SECTION_SELECT, id, value})
  },
  rule: {
    selectSection: (id, value) => ({type: UI_RULE_SECTION_SELECT, id, value})
  },
  confirm: options => ({type: UI_CONFIRM_OPEN, options})
};

// selector //
class UiSelector {

  constructor(state = {}) {
    const {body = [], section = {}, confirm} = state;
    this.state = Object.freeze({body, section, confirm});
  }

  get body() {
    return this.state.body;
  }

  section(type, id) {
    let v;
    return (v = this.state.section[type]) && (v = v[id]) || undefined;
  }

  get confirm() {
    return this.state.confirm;
  }

  _body(type, id) {
    return new UiSelector({
      ...this.state,
      body: [type, id]
    });
  }

  _section(type, id, section) {
    return new UiSelector({
      ...this.state,
      section: {
        ...this.state.section,
        [type]: {
          ...this.state.section[type],
          [id]: section
        }
      }
    });
  }

  _confirm(options) {
    return new UiSelector({
      ...this.state,
      confirm: options
    });
  }

}

export const $ = state => new UiSelector(state);

// initial state //
export const initialState = $().state;

// reducer //
export function reducer(state = initialState, action = {}) {
  const $state = $(state);
  const {body} = $state;
  const [bodyType, bodyId] = body;
  // $state.body
  switch (action.type) {
    case UI_BODY_SELECT:
      return $state._body(...action.value).state;
    case UI_SESSION_SECTION_SELECT:
      return $state._section('session', action.id, action.value).state;
    case UI_RULE_SECTION_SELECT:
      return $state._section('rule', action.id, action.value).state;
    case UI_CONFIRM_OPEN:
      return $state._confirm(action.options).state;
    // TODO: simplify
    case SESSION_DELETE_REQUEST:
      if (bodyType === 'session' && bodyId === action.id) {
        return $state._body().state;
      }
      return state;
    case RULE_DELETE_REQUEST:
      if (bodyType === 'rule' && bodyId === action.id) {
        return $state._body().state;
      }
      return state;
    default:
      return state;
  }
}
