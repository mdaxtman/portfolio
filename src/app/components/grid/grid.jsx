import React from "react";
import styles from "./grid.css";
import PropTypes from "prop-types";

const Grid = ({ items }) => (
  <div className={styles.parent}>
    {items.map((item, i) => (
      <div
        className={styles.child}
        key={i}
      >
        {item}
      </div>
    ))}
  </div>
);

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Grid;
