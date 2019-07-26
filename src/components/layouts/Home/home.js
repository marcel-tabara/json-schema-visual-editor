import React, { useState } from "react";
import "react-sortable-tree/style.css";
import isEmpty from "lodash/isEmpty";
import Nav from "react-bootstrap/Nav";
import JsonFormSettingsForm from "../JsonFormSettingsForm";
import JsonFormInfoForm from "../JsonFormInfoForm";
import JsonFormUISettingsForm from "../JsonFormUISettingsForm";
import Preview from "../Preview";
import "../../../stylesheets/main.scss";

const Home = props => {
  const { currentNode } = props;
  const [view, setView] = useState("schema");

  const renderView = () =>
    isEmpty(currentNode) ? <JsonFormSettingsForm /> : <JsonFormInfoForm />;

  const mainRender = () => {
    return view === "schema" ? (
      renderView()
    ) : view === "preview" ? (
      <Preview />
    ) : (
      <JsonFormUISettingsForm />
    );
  };
  return (
    <div className="infoform">
      <Nav fill variant="tabs" defaultActiveKey="schema">
        <Nav.Item>
          <Nav.Link eventKey="schema" onClick={() => setView("schema")}>
            Schema
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="uiachema" onClick={() => setView("uischema")}>
            UI Schema
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="preview" onClick={() => setView("preview")}>
            Preview
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div>{mainRender()}</div>
    </div>
  );
};

export default Home;
