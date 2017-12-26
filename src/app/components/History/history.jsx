import React from "react";
import PropTypes from "prop-types";

const History = props => (
  <div>
    {props.history.map((item, i) => <div key={i}>{item}</div>)}
  </div>
);

History.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string)
};

export default History;
