import Home from "./home";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  tree: state.mainReducer.tree,
  currentNode: state.mainReducer.currentNode
});

export default connect(
  mapStateToProps,
  null
)(Home);
