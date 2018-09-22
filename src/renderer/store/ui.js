// action type //
const SIDEBAR = {
  SELECT: 'sidebar.select'
};

// action //
export const action = {
  sidebar: {
    select: id => ({type: SIDEBAR.SELECT, id})
  }
};

// initial state //
export const initialState = {
  sidebar: {
    selected: 0
  }
};

// reducer //
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIDEBAR.SELECT:
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
    default:
      return state;
  }
}
