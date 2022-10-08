import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as LocalAction from "../../../reduxes/actions/Local";

import styles from "./styles.module.css";

function MainViewRow(props) {
  useEffect(() => {
    props.answerTypes === null && props.getAnswerTypes(props.answerTypeRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("MAIN_VIEWROW: ", props);

  return (
    <tr className={styles.tableData}>
      {props.metadatas[props.menu?.id].map((metadata, index) => {
        let editedData = "";
        metadata[0] === "STATUS" ? (
          Number(props.data?.STATUS) === 1 ? (
            (editedData = "Идэвхтэй")
          ) : (
            (editedData = "Идэвхгүй")
          )
        ) : metadata[0] === "SECTOR" ? (
          <>
            {props.data.SECTOR[0] === 0
              ? (editedData = "Бүгд")
              : props.data?.SECTOR?.map((sector) => {
                  editedData =
                    editedData +
                    props.references?.orgtypes?.filter(
                      (reference) => reference.ID === sector
                    )[0]?.DESCRIPTION +
                    ", ";
                })}
          </>
        ) : metadata[0] === "MAINCLASS_ID" ? (
          (editedData = props.classifications?.filter(
            (classification) => classification.ID === props.data?.MAINCLASS_ID
          )[0]?.NAME)
        ) : metadata[0] === "SUBCLASS_ID" ? (
          (editedData = props.classifications?.filter(
            (classification) => classification.ID === props.data?.SUBCLASS_ID
          )[0]?.NAME)
        ) : metadata[0] === "ANSWER_TYPE_ID" ? (
          (editedData = props.answerTypes?.filter(
            (answerType) => answerType.ID === props.data?.ANSWER_TYPE_ID
          )[0]?.DESCRIPTION)
        ) : metadata[0] === "SCORE" ? (
          (editedData = null)
        ) : metadata[0] === "IS_ASSESS" ? (
          props.data?.IS_ASSESS === 1 ? (
            (editedData = "Тийм")
          ) : (
            (editedData = "Үгүй")
          )
        ) : metadata[0] === "IS_MANDAT" ? (
          props.data?.IS_MANDAT === 1 ? (
            (editedData = "Тийм")
          ) : (
            (editedData = "Үгүй")
          )
        ) : (
          (editedData = props.data[metadata[0]])
        );

        return (
          <td
            key={index}
            align={metadata[2]}
            width={metadata[3]}
            className={styles.data}
          >
            {editedData}
          </td>
        );
      })}
      <td className={styles.action}>
        <span
          onClick={() => props.expander(props.data.ID)}
          className={`${styles.button} ${styles.collapseButton}`}
        >
          {props.data.ID === props.expand ? "Хураах" : "Задлах"}
        </span>
        <span
          className={`${styles.button} ${styles.editButton}`}
          onClick={() => props.handleClickEdit(props.data)}
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
    answerTypeRef: state.MetaDataReducer.answerTypeRef,
    classifications: state.LocalReducer.classifications,
    answerTypes: state.LocalReducer.answerTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnswerTypes: (answerType) =>
      dispatch(LocalAction.getAnswerTypes(answerType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainViewRow);
