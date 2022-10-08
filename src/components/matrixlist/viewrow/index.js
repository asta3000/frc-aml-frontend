import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function ViewRow(props) {
  return (
    <tr className={styles.tabledata}>
      {props.metadatas[props.menu?.id]?.map((metadata, index) => {
        return (
          <td key={index} align={metadata[2]} width={metadata[3]}>
            {props.data[metadata[0]]}
          </td>
        );
      })}
      <td align="center" className={styles.action}>
        <span
          className={`${styles.button} + ${styles.editButton}`}
          onClick={(event) =>
            props.handleClickAction(event, props.data, "edit")
          }
          key={"edit+" + props.data.ID}
        >
          Засах
        </span>
      </td>
    </tr>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    dataRef: state.MetaDataReducer.dataRef,
    metadatas: state.MetaDataReducer.metadatas,
    references: state.LocalReducer.references,
  };
};

export default connect(mapStateToProps, null)(ViewRow);
