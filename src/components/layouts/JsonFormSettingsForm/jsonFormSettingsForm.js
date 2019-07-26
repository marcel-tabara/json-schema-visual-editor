import React from "react";

import SortableTree, {
  removeNodeAtPath,
  getFlatDataFromTree
} from "react-sortable-tree";
import isEmpty from "lodash/isEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";

import { defaultTree } from "../../../utils/constants";

const externalNodeType = "yourNodeType";
const shouldCopyOnOutsideDrop = true;
const getNodeKey = ({ treeIndex }) => treeIndex;

const JsonFormSettingsForm = props => {
  const { tree, setTree, setCurrentNode } = props;

  const remove = path => {
    const newTree = removeNodeAtPath({
      treeData: tree,
      path,
      getNodeKey
    });
    setTree(newTree);
  };

  const validateJsonForm = jsonForm => {
    const flatData = getFlatDataFromTree({
      treeData: jsonForm,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: false
    });

    return flatData.find(el => {
      const isPrimitive =
        el.node.subtitle === "String" ||
        el.node.subtitle === "Integer" ||
        el.node.subtitle === "Boolean" ||
        el.node.subtitle === "Number";

      return (
        (isPrimitive && !isEmpty(el.node.children)) ||
        jsonForm.length > 1 ||
        (isPrimitive &&
          !isEmpty(el.parentNode) &&
          (el.parentNode.subtitle === "Object" ||
            el.parentNode.subtitle === "Array"))
      );
    });
  };

  const onChange = treeData => {
    if (isEmpty(validateJsonForm(treeData))) {
      setTree(treeData);
    }
  };

  const setCurrentForm = (node, path) => {
    setCurrentNode({ node, path });
  };

  const onChangeSchemaEditor = data => {
    setTree(data);
  };

  const log = type => console.log.bind(console, type);

  const getButtons = ({ node, path }) => {
    if (node.title === "properties" || node.title === "items") return [];
    return [
      <FontAwesomeIcon
        icon={faMinusCircle}
        onClick={() => remove(path)}
        className="generic-button"
      />,
      <FontAwesomeIcon
        icon={faArrowCircleRight}
        onClick={() => setCurrentForm(node, path)}
        className="generic-button"
      />
    ];
  };

  return (
    <>
      <div className="flex">
        <div
          style={{
            height: 600,
            width: "30%",
            float: "left"
          }}
        >
          <SortableTree
            treeData={defaultTree}
            onChange={() => console.log("changed")}
            dndType={externalNodeType}
            shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          />
        </div>

        <div
          style={{
            height: 600,
            width: "40%",
            float: "left"
          }}
        >
          <SortableTree
            treeData={tree}
            onChange={onChange}
            dndType={externalNodeType}
            shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
            getNodeKey={getNodeKey}
            generateNodeProps={({ node, path }) => ({
              buttons: getButtons({ node, path })
            })}
          />
        </div>
      </div>
    </>
  );
};

export default JsonFormSettingsForm;
