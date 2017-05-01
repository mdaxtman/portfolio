import React, { PropTypes } from "react";

const History = props => (
  <div>
    {props.history.map((item, i) => <div key={i}>{item}</div>)}
  </div>
);

History.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string)
};

export default History;
