import isEmpty from "lodash/isEmpty";
import has from "lodash/has";
import get from "lodash/get";
import { getFlatDataFromTree } from "react-sortable-tree";

export const generateJsonUISchemaCode = props => {
  const { tree } = props;
  let code = "";

  const flatData = getFlatDataFromTree({
    treeData: tree,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false
  });

  if (!isEmpty(tree) && tree[0].title) code += `{`;

  const prepareJsonFormUICode = jsonForm => {
    jsonForm.map(el => {
      if (el.title) {
        let isChild,
          isLastChild = false;
        let parent = null;
        const uiSchema = get(el, "uiSchema", null);
        const flatElement = flatData.find(
          element => element.node.title === el.title
        );

        const hasUiOptions =
          !isEmpty(uiSchema) &&
          (uiSchema.uiOptions.uiInline ||
            uiSchema.uiOptions.backgroundColor ||
            uiSchema.uiOptions.classNames ||
            uiSchema.uiOptions.inputType ||
            uiSchema.uiOptions.label ||
            uiSchema.uiOptions.rows);

        if (!isEmpty(flatElement)) parent = flatElement.parentNode;
        if (!isEmpty(parent)) {
          isChild = !isEmpty(parent.children);
          isLastChild = isChild
            ? parent.children[parent.children.length - 1].title === el.title
            : false;
        }

        if (isChild && parent.type === 'object' && el.title !== 'properties') {
          if (!isEmpty(el.title)) code += `"${el.title}": {`;
        }

        if (isChild && parent.type === 'array' && el.title === 'items') {
          if (!isEmpty(el.title)) code += `"${el.title}": [`;
        }

        if (isChild && parent.type === 'array' && el.title !== 'items') {
          if (!isEmpty(el.title)) code += `{`;
        }

        if (!isEmpty(el.children)) prepareJsonFormUICode(el.children);

        if (has(uiSchema, "uiMore.uiDisabled") && uiSchema.uiMore.uiDisabled)
          code += `"ui:disabled": true,`;
        if (
          has(uiSchema, "uiMore.uiEnumDisabled") &&
          uiSchema.uiMore.uiEnumDisabled
        )
          code += `"ui:enumDisabled": '${uiSchema.uiMore.uiEnumDisabled}',`;
        if (has(uiSchema, "uiMore.uiReadonly") && uiSchema.uiMore.uiReadonly)
          code += `"ui:readonly": true,`;

        // uiOptions
        if (hasUiOptions) code += `"ui:options": {`;

        if (has(uiSchema, "uiOptions.uiInline"))
          code += `"inline": ${uiSchema.uiMore.uiInline},`;
        if (
          has(uiSchema, "uiOptions.backgroundColor") &&
          uiSchema.uiOptions.backgroundColor
        )
          code += `"backgroundColor": '${uiSchema.uiOptions.backgroundColor}',`;
        if (
          has(uiSchema, "uiOptions.classNames") &&
          uiSchema.uiOptions.classNames
        )
          code += `"classNames": '${uiSchema.uiOptions.classNames}',`;
        if (
          has(uiSchema, "uiOptions.inputType") &&
          uiSchema.uiOptions.inputType
        )
          code += `"inputType": '${uiSchema.uiOptions.inputType}',`;
        if (has(uiSchema, "uiOptions.label"))
          code += `"label": ${uiSchema.uiOptions.label},`;
        if (has(uiSchema, "uiOptions.rows") && uiSchema.uiOptions.rows)
          code += `"rows": ${uiSchema.uiOptions.rows},`;

        if (hasUiOptions) code += `},`;

        // other options
        if (
          has(uiSchema, "uiOthers.uiAutofocus") &&
          uiSchema.uiOthers.uiAutofocus
        )
          code += `"ui:autofocus": ${uiSchema.uiOthers.uiAutofocus},`;
        if (
          has(uiSchema, "uiOthers.uiDescription") &&
          uiSchema.uiOthers.uiDescription
        )
          code += `"ui:description": '${uiSchema.uiOthers.uiDescription}',`;
        if (has(uiSchema, "uiOthers.uiTitle") && uiSchema.uiOthers.uiTitle)
          code += `'ui:title': "${uiSchema.uiOthers.uiTitle}",`;
        if (has(uiSchema, "uiOthers.uiHelp") && uiSchema.uiOthers.uiHelp)
          code += `"ui:help": "${uiSchema.uiOthers.uiHelp}",`;
        if (
          has(uiSchema, "uiOthers.uiPlaceholder") &&
          uiSchema.uiOthers.uiPlaceholder
        )
          code += `"ui:placeholder": "${uiSchema.uiOthers.uiPlaceholder}",`;

        if (has(uiSchema, "uiWidget.widget") && uiSchema.uiWidget.widget)
          code += `"ui:widget": "${uiSchema.uiWidget.widget}",`;

        if (isChild && parent.type === 'object' && isLastChild && el.title !== 'properties') {
          if (!isEmpty(el.title)) code += `},`;
        }

        if (isChild && parent.type === 'array' && el.title !== 'items') {
          if (!isEmpty(el.title)) code += `},`;
        }

        if (isChild && parent.type === 'array' && isLastChild && el.title === 'items') {
          if (!isEmpty(el.title)) code += `],`;
        }

        if (isChild && parent.type === 'object' && !isLastChild && el.title !== 'properties') {
          if (!isEmpty(el.title)) code += `},`;
        }

        if (isEmpty(parent)) code += `}`;
      }
    });

    return code;
  };

  return prepareJsonFormUICode(tree);
};
