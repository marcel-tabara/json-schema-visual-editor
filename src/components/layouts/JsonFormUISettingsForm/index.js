import JsonFormUISettingsForm from "./jsonFormUISettingsForm";
import { connect } from "react-redux";
import {
  setTree,
  setCurrentUINode
} from "../../../services/mainService/actions";

const mapStateToProps = state => {
  return {
    tree: state.mainReducer.tree,
    currentUINode: state.mainReducer.currentUINode
  };
};

const mapDispatchToProps = {
  setTree,
  setCurrentUINode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JsonFormUISettingsForm);
