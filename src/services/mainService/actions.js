import * as actionTypes from "./actionTypes";

export const setTree = tree => ({
  type: actionTypes.SET_TREE,
  tree
});

export const setCurrentNode = currentNode => ({
  type: actionTypes.SET_CURRENT_NODE,
  currentNode
});

export const setCurrentUINode = currentUINode => ({
  type: actionTypes.SET_CURRENT_UI_NODE,
  currentUINode
});

export const setSchemaCode = schemaCode => ({
  type: actionTypes.SET_SCHEMA_CODE,
  schemaCode
});

export const setUISchemaCode = uiSchemaCode => ({
  type: actionTypes.SET_UISCHEMA_CODE,
  uiSchemaCode
});
