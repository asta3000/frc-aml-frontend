import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function Mapping(props) {
  return (
    <div className={styles.mapping}>
      {props.menu.module_name} &nbsp;&nbsp; &gt; &nbsp;&nbsp; {props.menu.name}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
  };
};

export default connect(mapStateToProps, null)(Mapping);
