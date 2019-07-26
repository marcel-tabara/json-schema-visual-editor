import * as actionTypes from "./actionTypes";

export const initialState = () => ({
  tree: [],
  currentNode: [],
  currentUINode: [],
  schemaCode: "",
  uiSchemaCode: ""
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case actionTypes.SET_TREE:
      return {
        ...state,
        tree: action.tree
      };
    case actionTypes.SET_CURRENT_NODE:
      return {
        ...state,
        currentNode: action.currentNode
      };
    case actionTypes.SET_CURRENT_UI_NODE:
      return {
        ...state,
        currentUINode: action.currentUINode
      };
    case actionTypes.SET_SCHEMA_CODE:
      return {
        ...state,
        schemaCode: action.schemaCode
      };
    case actionTypes.SET_UISCHEMA_CODE:
      return {
        ...state,
        uiSchemaCode: action.uiSchemaCode
      };
    case actionTypes.SET_TREE:
      return {
        ...state,
        tree: action.tree
      };
    default:
      return state;
  }
};
