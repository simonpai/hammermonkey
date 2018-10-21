// action type //
const UI_SELECT_PRIMARY = 'ui.selectPrimary';
const UI_DIALOG_OPEN = 'ui.dialog.open';

// action //
export const action = {
  selectPrimary: (objType, id) => ({type: UI_SELECT_PRIMARY, objType, id}),
  dialog: {
    open: id => ({type: UI_DIALOG_OPEN, id})
  }
};

// initial state //
export const initialState = {
  primary: undefined,
  dialog: undefined
};

// reducer //
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UI_SELECT_PRIMARY:
      return {
        ...state,
        primary: action.objType ? {
          type: action.objType,
          id: action.id
        } : undefined
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
