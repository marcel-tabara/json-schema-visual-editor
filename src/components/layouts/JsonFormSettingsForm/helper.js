import { changeNodeAtPath } from "react-sortable-tree";

const getTitleFromPath = path => {
  return path
    .toString()
    .split(",")
    .join("-");
};

const getNodeKey = ({ treeIndex }) => treeIndex;

export const prepareFirst = (el, tree) => {
  const {
    title,
    description,
    defaultValue,
    enumVal,
    enumNames,
    isRequired,
    format,
    uniqueItems,
    minItems,
    maxItems,
    multipleOf,
    minimum,
    maximum,
    minLength,
    maxLength,
    pattern,
    excludeMinimum,
    excludeMaximum,
  } = el.node;

  const newNode = { ...el.node };

  newNode.title =
    title.length > 0 && title.substring(0, 1) !== "0"
      ? title
      : getTitleFromPath(el.path);
  newNode.uiSchema = {};
  newNode.description = description;
  newNode.defaultValue = defaultValue;
  newNode.enumVal = enumVal;
  newNode.enumNames = enumNames;
  newNode.isRequired = isRequired;
  newNode.format = format;
  newNode.type = el.node.subtitle.toLowerCase();
  newNode.uniqueItems = uniqueItems;

  newNode.minItems = minItems;
  newNode.maxItems = maxItems;
  newNode.multipleOf = multipleOf;
  newNode.minimum = minimum;
  newNode.maximum = maximum;
  newNode.minLength = minLength;
  newNode.maxLength = maxLength;

  newNode.excludeMinimum = excludeMinimum;
  newNode.excludeMaximum = excludeMaximum;
  newNode.pattern = pattern;

  const newTree = changeNodeAtPath({
    treeData: tree,
    path: el.path,
    getNodeKey,
    newNode,
  });

  return newTree;
};
