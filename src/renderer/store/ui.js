import { UI, RULE, SESSION } from './types';
const { SET_BODY, CONFIRM } = UI;

// action //
export const action = {
  setBody: (type, id) => ({type: SET_BODY, value: [type, id]}),
  confirm: options => ({type: CONFIRM, options})
};

// selector //
class UiSelector {

  constructor(state = {}) {
    const {body = [], confirm} = state;
    this.state = Object.freeze({body, confirm});
  }

  get body() {
    return this.state.body;
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
    case SET_BODY:
      return $state._body(...action.value).state;
    case CONFIRM:
      return $state._confirm(action.options).state;
    // TODO: simplify
    case SESSION.CLOSE:
      if (bodyType === 'session' && bodyId === action.id) {
        return $state._body().state;
      }
      return state;
    case RULE.DELETE.REQUEST:
      if (bodyType === 'rule' && bodyId === action.id) {
        return $state._body().state;
      }
      return state;
    default:
      return state;
  }
}
