import Home from "./home";
import { connect } from "react-redux";
import { setError } from "../../../services/mainService/actions";

const mapStateToProps = state => ({
  tree: state.mainReducer.tree,
  currentNode: state.mainReducer.currentNode,
  error: state.mainReducer.error
});

const mapDispatchToProps = {
  setError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
