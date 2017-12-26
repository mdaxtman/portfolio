import React, { Component } from "react";
import PropTypes from "prop-types";

class Output extends Component {
  render() {
    const { returnValue, rootRef } = this.props;

    return (<div ref={rootRef}>{returnValue}</div>);
  }
}

Output.defaultProps = {
  returnValue: ""
};

Output.propTypes = {
  rootRef: PropTypes.func.isRequired,
  returnValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Output;
