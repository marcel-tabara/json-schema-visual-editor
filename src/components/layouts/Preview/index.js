import Preview from "./preview";
import { connect } from "react-redux";
import {
  setTree,
  setCurrentNode,
} from '../../../services/mainService/actions';

const mapStateToProps = state => ({
  schemaCode: state.mainReducer.schemaCode,
  uiSchemaCode: state.mainReducer.uiSchemaCode,
});

const mapDispatchToProps = {
  setTree,
  setCurrentNode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
