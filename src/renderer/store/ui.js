import { LOAD, UI } from './types';
const { CONFIRM } = UI;

// action //
export const action = {
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

  _load(settings) {
    return new UiSelector({
      ...this.state,
      body: settings['ui.body'] || []
    });
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

  switch (action.type) {
    case LOAD:
      return $state._load(action.data.settings).state;
    case CONFIRM:
      return $state._confirm(action.options).state;
    default:
      return state;
  }
}
