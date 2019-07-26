import JsonFormSettingsForm from "./jsonFormSettingsForm";
import { connect } from "react-redux";
import { setTree, setCurrentNode } from "../../../services/mainService/actions";

const mapStateToProps = state => ({
  tree: state.mainReducer.tree,
  currentNode: state.mainReducer.currentNode
});

const mapDispatchToProps = {
  setTree,
  setCurrentNode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JsonFormSettingsForm);
