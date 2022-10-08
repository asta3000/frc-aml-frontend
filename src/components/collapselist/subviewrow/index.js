import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function SubViewRow(props) {
  return (
    <tr className={styles.tableData}>
      {props.metadatas[props.menu?.id].map((submetadata, index) => {
        let subEditedData = "";
        submetadata[0] === "STATUS" ? (
          Number(props.subdata?.STATUS) === 1 ? (
            (subEditedData = "Идэвхтэй")
          ) : (
            (subEditedData = "Идэвхгүй")
          )
        ) : submetadata[0] === "SECTOR" ? (
          <>
            {props.subdata.SECTOR[0] === 0
              ? (subEditedData = "Бүгд")
              : props.subdata?.SECTOR?.map((sector) => {
                  subEditedData =
                    subEditedData +
                    props.references?.orgtypes?.filter(
                      (reference) => reference.ID === sector
                    )[0]?.DESCRIPTION +
                    ", ";
                })}
          </>
        ) : submetadata[0] === "MAINCLASS_ID" ||
          submetadata[0] === "SUBCLASS_ID" ||
          submetadata[0] === "ANSWER_TYPE_ID" ||
          submetadata[0] === "IS_ASSESS" ||
          submetadata[0] === "IS_MANDAT" ? (
          (subEditedData = null)
        ) : (
          (subEditedData = props.subdata[submetadata[0]])
        );
        return (
          <td
            key={index}
            align={submetadata[2]}
            width={submetadata[3]}
            className={styles.subdata}
          >
            {subEditedData}
          </td>
        );
      })}
      <td className={styles.action}>
        <span
          className={`${styles.button} ${styles.editButton}`}
          onClick={() => props.handleClickEdit(props.subdata)}
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
    metadatas: state.MetaDataReducer.metadatas,
    references: state.LocalReducer.references,
    classifications: state.LocalReducer.classifications,
    answerTypes: state.LocalReducer.answerTypes,
  };
};

export default connect(mapStateToProps, null)(SubViewRow);
