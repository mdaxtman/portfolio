import React, { Component, PropTypes } from "react";

export default class Prompt extends Component {
  static defaultProps = {
    currentPath: "~"
  }

  render() {
    return (
      <span>{this.props.currentPath} $&nbsp; </span>
    );
  }
}

Prompt.propTypes = {
  currentPath: PropTypes.string
};
