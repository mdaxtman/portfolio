import React, { Component, PropTypes } from "react";

export default class Prompt extends Component {
	render() {
		return (
			<span>{this.props.currentPath || "C:"}/></span>
		);
	}
}

Prompt.propTypes = {
	currentPath: PropTypes.string
};
