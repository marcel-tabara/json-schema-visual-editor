import JsonFormSettingsForm from "./jsonFormSettingsForm";
import { connect } from "react-redux";
import {
  setTree,
  setCurrentNode,
  setCurrentUINode
} from "../../../services/mainService/actions";
import { setError } from "../../../services/mainService/actions";

const mapStateToProps = state => ({
  tree: state.mainReducer.tree,
  currentNode: state.mainReducer.currentNode,
  currentUINode: state.mainReducer.currentUINode
});

const mapDispatchToProps = {
  setTree,
  setCurrentNode,
  setCurrentUINode,
  setError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JsonFormSettingsForm);
