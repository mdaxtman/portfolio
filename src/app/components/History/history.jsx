import React from "react";
import PropTypes from "prop-types";

const History = props => (
  <div>
    {props.text.map((item, i) => <div key={i}>{item}</div>)}
  </div>
);

History.defaultProps = {
  text: []
};

History.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.arrayOf(PropTypes.object)
  ])
};

export default History;
