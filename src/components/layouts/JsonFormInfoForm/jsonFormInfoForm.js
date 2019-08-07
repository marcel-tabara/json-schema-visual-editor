import React from "react";
import Form from "react-jsonschema-form";
import { changeNodeAtPath } from "react-sortable-tree";
import isEmpty from "lodash/isEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

const JsonFormInfoForm = props => {
  const { tree, setTree, currentNode, setCurrentNode } = props;

  if (isEmpty(currentNode)) return null;

  const fieldsTypeEnum = [
    "boolean",
    "string",
    "integer",
    "number",
    "object",
    "array"
  ];
  const stringFormatWidgetEnum = [
    "default",
    "email",
    "uri",
    "data-url",
    "date",
    "date-time"
  ];

  const getNodeKey = ({ treeIndex }) => treeIndex;
  const { node, path } = currentNode;

  const getUIOrder = () => {
    if (node.subtitle === "String") {
      return [
        "title",
        "description",
        "defaultValue",
        "format",
        "pattern",
        "minLength",
        "maxLength",
        "enumVal",
        "enumNames",
        "isRequired"
      ];
    }
    if (node.subtitle === "Number") {
      return [
        "title",
        "description",
        "defaultValue",
        "minimum",
        "excludeMinimum",
        "maximum",
        "excludeMaximum",
        "multipleOf",
        "enumVal",
        "enumNames",
        "isRequired"
      ];
    }
    if (node.subtitle === "Integer") {
      return [
        "title",
        "description",
        "defaultValue",
        "minimum",
        "excludeMinimum",
        "maximum",
        "excludeMaximum",
        "multipleOf",
        "enumVal",
        "enumNames",
        "isRequired"
      ];
    }
    if (node.subtitle === "Array") {
      return ["title", "description", "minItems", "maxItems", "uniqueItems"];
    }
    if (node.subtitle === "Object") {
      return ["title", "description", "defaultValue"];
    }
    return ["title", "description", "defaultValue", "enumVal", "enumNames"];
  };

  const transformErrors = errors => {
    return errors.map(error => {
      if (error.name === "pattern") {
        error.message =
          "Only alphanumeric characters, dash and underscore are allowed";
      }
      return error;
    });
  };

  const schema = {
    type: "object",
    required: ["title"],
    properties: {
      title: {
        type: "string",
        title: "title",
        default: "",
        pattern: "^[a-zA-Z0-9-_]+$"
      },
      description: {
        type: "string",
        title: "description",
        default: ""
      }
    }
  };
  const uiSchema = {
    format: {
      "ui:widget": "select",
      "ui:placeholder": "Choose a format"
    },
    "ui:order": getUIOrder()
  };

  if (node.subtitle !== "Object" && node.subtitle !== "Array") {
    schema.properties = {
      ...schema.properties,
      isRequired: {
        type: "boolean",
        title: "isRequired",
        default: false
      },
      defaultValue: {
        type: "string",
        title: "default",
        default: ""
      }
    };
  }

  if (node.subtitle === "String") {
    schema.properties = {
      ...schema.properties,
      format: {
        type: "string",
        title: "Format",
        enum: stringFormatWidgetEnum,
        default: "default"
      },
      minLength: {
        type: "string",
        title: "minLength",
        default: ""
      },
      maxLength: {
        type: "string",
        title: "maxLength",
        default: ""
      },
      pattern: {
        type: "string",
        title: "pattern",
        default: ""
      }
    };
  }

  if (node.subtitle === "Number" || node.subtitle === "Integer") {
    schema.properties = {
      ...schema.properties,
      minimum: {
        type: "string",
        title: "Minimum",
        default: ""
      },
      maximum: {
        type: "string",
        title: "Maximum",
        default: ""
      },
      multipleOf: {
        type: "string",
        title: "multipleOf",
        default: ""
      },
      excludeMinimum: {
        type: "boolean",
        title: "excludeMinimum",
        default: false
      },
      excludeMaximum: {
        type: "boolean",
        title: "excludeMaximum",
        default: false
      }
    };
  }

  if (node.subtitle === "Array") {
    schema.properties = {
      ...schema.properties,
      minItems: {
        type: "string",
        title: "minItems",
        default: ""
      },
      maxItems: {
        type: "string",
        title: "maxItems",
        default: ""
      },
      uniqueItems: {
        type: "boolean",
        title: "uniqueItems",
        default: false
      }
    };
  }

  if (node.subtitle !== "Object" && node.subtitle !== "Array") {
    schema.properties = {
      ...schema.properties,
      enumVal: {
        type: "string",
        title: "Enum",
        default: ""
      },
      enumNames: {
        type: "string",
        title: "EnumNames",
        default: ""
      }
    };
  }

  const onSubmit = data => {
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
      excludeMaximum
    } = data.formData;

    const newNode = { ...node };
    newNode.title = title;
    newNode.uiSchema = {};
    newNode.description = description;
    newNode.defaultValue = defaultValue;
    newNode.enumVal = enumVal;
    newNode.enumNames = enumNames;
    newNode.isRequired = isRequired;
    newNode.format = format;
    newNode.type = node.subtitle.toLowerCase();
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
      path,
      getNodeKey,
      newNode
    });

    setTree(newTree);
    setCurrentNode([]);
  };

  const close = () => setCurrentNode([]);

  const log = type => console.log.bind(console, type);
  return (
    <div className="infoform-body">
      <div className="rightClose">
        <FontAwesomeIcon
          className="generic-button"
          icon={faWindowClose}
          onClick={close}
        />
      </div>

      <Form
        schema={schema}
        noHtml5Validate={true}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={onSubmit}
        onError={log("errors")}
        formData={node}
        transformErrors={transformErrors}
      />
    </div>
  );
};

export default JsonFormInfoForm;
