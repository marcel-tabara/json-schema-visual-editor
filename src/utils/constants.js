export const defaultTree = [
  {
    title: "",
    subtitle: "String"
  },
  {
    title: "",
    subtitle: "Number"
  },
  {
    title: "",
    subtitle: "Integer"
  },
  {
    title: "",
    subtitle: "Boolean"
  },
  {
    title: "",
    subtitle: "Object",
    expanded: true,
    children: [
      {
        title: "properties",
        type: "object"
      }
    ]
  },
  {
    title: "",
    subtitle: "Array",
    expanded: true,
    children: [
      {
        title: "items",
        type: "array"
      }
    ]
  }
];

export const booleanWidgetEnum = ["radio", "select", "checkbox", "hidden"];
export const stringWidgetEnumDefault = [
  "color",
  "password",
  "text",
  "textarea",
  "hidden"
];
export const integerWidgetEnum = ["updown", "range", "radio", "hidden"];
export const html5InputTypesEnum = [
  "text",
  "password",
  "submit",
  "reset",
  "radio",
  "checkbox",
  "button",
  "color",
  "date",
  "datetime-local",
  "email",
  "month",
  "number",
  "range",
  "search",
  "tel",
  "time",
  "url",
  "week",
  "hidden"
];
