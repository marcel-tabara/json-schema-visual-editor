import React from "react";

import SortableTree, {
  removeNodeAtPath,
  getFlatDataFromTree,
} from "react-sortable-tree";
import isEmpty from "lodash/isEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { defaultTree } from "../../../utils/constants";
import { setError } from "../../../services/mainService/actions";
import { prepareFirst } from "./helper";

const externalNodeType = "yourNodeType";
const shouldCopyOnOutsideDrop = true;
const getNodeKey = ({ treeIndex }) => treeIndex;

const JsonFormSettingsForm = props => {
  const {
    tree,
    setTree,
    setCurrentNode,
    setCurrentUINode,
    currentUINode,
    setError,
  } = props;

  if (!isEmpty(currentUINode)) setCurrentUINode({});

  const remove = path => {
    const newTree = removeNodeAtPath({
      treeData: tree,
      path,
      getNodeKey,
    });
    setTree(newTree);
  };

  const isPrimitive = subtitle =>
    subtitle === "String" ||
    subtitle === "Integer" ||
    subtitle === "Boolean" ||
    subtitle === "Number";

  const validateJsonForm = jsonForm => {
    if (jsonForm.length > 1) return jsonForm;
    const flatData = getFlatDataFromTree({
      treeData: jsonForm,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: false,
    });

    return flatData.find(el => {
      return isPrimitive(el.node.subtitle) && !isEmpty(el.node.children);
    });
  };

  const onChange = treeData => {
    if (isEmpty(validateJsonForm(treeData))) {
      const flatData = getFlatDataFromTree({
        treeData,
        getNodeKey: ({ treeIndex }) => treeIndex,
        ignoreCollapsed: false,
      });
      let newTree = treeData;

      flatData.map(el => {
        newTree = prepareFirst(el, newTree);
        setTree(newTree);
      });
    } else {
      setError({ message: "Not allowed." });
    }
  };

  const setCurrentForm = (node, path) => {
    setCurrentNode({ node, path });
  };

  const getButtons = ({ node, path }) => {
    if (node.title === "properties" || node.title === "items") return [];
    return [
      <FontAwesomeIcon
        icon={faMinusCircle}
        onClick={() => remove(path)}
        className="generic-button-red"
      />,
      <FontAwesomeIcon
        icon={faPlusCircle}
        onClick={() => setCurrentForm(node, path)}
        className="generic-button"
      />,
    ];
  };

  return (
    <>
      <div className="flex">
        <div
          style={{
            height: window.innerHeight,
            width: "30%",
            float: "left",
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
            height: window.innerHeight,
            width: "40%",
            float: "left",
          }}
        >
          <SortableTree
            treeData={tree}
            onChange={onChange}
            dndType={externalNodeType}
            shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
            getNodeKey={getNodeKey}
            generateNodeProps={({ node, path }) => ({
              buttons: getButtons({ node, path }),
            })}
          />
        </div>
      </div>
    </>
  );
};

export default JsonFormSettingsForm;
