import React from "react";
import { connect } from "react-redux";

import Tracklist from "../../components/tracklist";

import styles from "./styles.module.css";

function ViolationsList(props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.module.name}</div>
      <Tracklist refer="1" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    module: state.LocalReducer.module,
  };
};
export default connect(mapStateToProps, null)(ViolationsList);
