import React from "react";
import isEmpty from "lodash/isEmpty";
import has from "lodash/has";
import AceEditor from "react-ace";
import "brace/mode/jsx";
import "brace/theme/xcode";
import Form from "react-jsonschema-form-bs4";

const Preview = props => {
  let { schemaCode, uiSchemaCode, error } = props;

  if (isEmpty(schemaCode)) schemaCode = "{}";
  if (isEmpty(uiSchemaCode)) uiSchemaCode = "{}";

  const onChange = () => null;
  const onSubmit = () => null;
  const getButtonClass = () => (schemaCode !== "{}" ? "" : "hidden");

  const showFormPreview = () => {
    if (has(error, "message")) return console.log("########## error", error);
    return (
      <div className="previewForm">
        <Form
          schema={JSON.parse(schemaCode)}
          uiSchema={JSON.parse(uiSchemaCode)}
          onChange={onChange}
          onSubmit={onSubmit}
          showErrorList={true}
        >
          <button type="submit" className={getButtonClass()}>
            Submit
          </button>
        </Form>
      </div>
    );
  };

  return (
    <>
      {showFormPreview()}
      <div className="container_editor_area">
        {schemaCode !== "{}" && (
          <>
            <div className="editor-box">
              <div className="labelStyle">Schema</div>
              <AceEditor
                mode="json"
                theme="xcode"
                onChange={onChange}
                name="schemaEditor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                fontSize={12}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={schemaCode}
                height="350px"
              />
            </div>
          </>
        )}

        <div className="editor-box">
          {uiSchemaCode !== "{}" && (
            <>
              <div className="labelStyle">UISchema</div>
              <AceEditor
                mode="json"
                theme="xcode"
                onChange={onChange}
                name="uiSchemaEditor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                fontSize={12}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={uiSchemaCode}
                height="350px"
              />
            </>
          )}
        </div>
        {schemaCode === "{}" && uiSchemaCode === "{}" && (
          <div className="center">Nothing to preview</div>
        )}
      </div>
    </>
  );
};

export default Preview;
