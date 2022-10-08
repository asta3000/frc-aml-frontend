import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

export const SearchRow = (props) => {
  return (
    <input
      type="search"
      placeholder="Хайх утгаа оруулна уу..."
      name="searchData"
      onChange={props.handleChangeSearch}
      className={styles.search}
    />
  );
};

const mapStateToProps = (state) => ({
  menu: state.LocalReducer.menu,
  datas: state.DataReducer.datas,
  dataRef: state.MetaDataReducer.dataRef,
  metadatas: state.MetaDataReducer.metadatas,
  references: state.LocalReducer.references,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchRow);
