import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Prompt extends Component {
  static defaultProps = {
    currentPath: "~"
  }

  render() {
    return (
      <span>{this.props.currentPath} $&nbsp;</span>
    );
  }
}

Prompt.propTypes = {
  currentPath: PropTypes.string
};
