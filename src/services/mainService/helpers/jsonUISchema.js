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
        let isChild = false;
        let isLastChild = false;
        const isObject = el.subtitle === "Object";
        const isArray = el.subtitle === "Array";
        const uiSchema = get(el, "uiSchema", null);
        const hasUiOptions = uiSchema && !isEmpty(uiSchema.uiOptions);

        const flatElement = flatData.find(
          element => element.node.title === el.title
        );

        const parent = !isEmpty(flatElement) ? flatElement.parentNode : null;
        const isParentObject = !isEmpty(parent) && parent.type === "object";
        const isParentArray = !isEmpty(parent) && parent.type === "array";
        const hasTitle = !isEmpty(el.title);

        if (!isEmpty(parent)) {
          isChild = !isEmpty(parent.children);
          isLastChild = isChild
            ? parent.children[parent.children.length - 1].title === el.title
            : false;
        }

        if (isChild && isParentObject && hasTitle) {
          code += `"${el.title}": {`;
        }

        // if (isObject && hasTitle) {
        //   code += `"properties": {`;
        // }

        if (isArray && hasTitle) {
          code += `"items":`;
          code += !isEmpty(el.children) && el.children.length > 1 ? `[{` : "{";
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

        if (has(uiSchema, "uiOptions.addable"))
          code += `"addable": ${uiSchema.uiOptions.addable || false},`;

        if (has(uiSchema, "uiOptions.orderable"))
          code += `"orderable": ${uiSchema.uiOptions.orderable || false},`;

        if (has(uiSchema, "uiOptions.removable"))
          code += `"removable": ${uiSchema.uiOptions.removable || false},`;

        if (has(uiSchema, "uiOptions.uiInline"))
          code += `"inline": ${uiSchema.uiOptions.uiInline},`;
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

        if (isChild && isParentObject && hasTitle) {
          if (!isLastChild) code += `},`;
          if (isLastChild) code += `},`;
        }

        if (isArray && hasTitle) {
          code += !isEmpty(el.children) && el.children.length > 1 ? `}]` : "},";
        }
        if (!isEmpty(parent) && parent.type === "array" && !isLastChild)
          code += "}, {";

        if (isEmpty(parent)) code += `}`;
      }
    });

    return code;
  };

  return prepareJsonFormUICode(tree);
};
