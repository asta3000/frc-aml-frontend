import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function ViewableRow(props) {
  // console.log("VIEWABLE_ROW_PROPS: ", props);
  return (
    <tr className={styles.tabledata}>
      {props.metadatas[props.menu?.id]?.map((metadata, index) => {
        let editedData = "";
        metadata[0] === "DEP_ID"
          ? (editedData = props.references[
              props.dataRef[props.menu?.id]?.field_name
            ]?.filter(
              (reference) => reference.ID === Number(props.data?.DEP_ID)
            )[0]?.NAME)
          : metadata[0] === "STATUS"
          ? Number(props.data?.STATUS) === 1
            ? (editedData = "Идэвхтэй")
            : (editedData = "Идэвхгүй")
          : metadata[0] === "DS_SN"
          ? props.data?.DS_SN
            ? (editedData = props.data.DS_SN)
            : (editedData = "Байхгүй")
          : metadata[0] === "USER_ID"
          ? (editedData = props.references[
              props.dataRef[props.menu?.id]?.field_name
            ]?.filter(
              (reference) => reference.ID === Number(props.data?.USER_ID)
            )[0]?.NAME)
          : metadata[0] === "ORGTYPE_ID"
          ? (editedData = props.references[
              props.dataRef[props.menu?.id]?.field_name
            ]?.filter(
              (reference) => reference.ID === Number(props.data?.ORGTYPE_ID)
            )[0]?.DESCRIPTION)
          : (editedData = props.data[metadata[0]]);

        return (
          <td key={index} align={metadata[2]} width={metadata[3]}>
            {metadata[0] === "T_NO" ||
            metadata[0] === "ORDERNO" ||
            metadata[0] === "PROGRAM" ? (
              <span
                onClick={(event) => props.handleDownload(event, editedData)}
                className={styles.downloadLink}
              >
                {editedData}
              </span>
            ) : (
              editedData
            )}
          </td>
        );
      })}
      <td className={styles.action}>
        {(props.menu.id === 1 || props.menu.id === 4) && (
          <>
            <span
              className={`${styles.button} + ${styles.permButton}`}
              onClick={() => props.handleOpenModal(props.data, "perm")}
              key={"perm+" + props.data.ID}
            >
              Эрх
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span
              className={`${styles.button} + ${styles.passButton}`}
              onClick={() => props.handleOpenModal(props.data, "pass")}
              key={"pass+" + props.data.ID}
            >
              Нууц үг
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </>
        )}
        {props.menu.id !== 5 &&
        props.menu.id !== 6 &&
        props.menu.id !== 7 &&
        props.menu.id !== 16 ? (
          <span
            className={`${styles.button} + ${styles.editButton}`}
            onClick={(event) =>
              props.handleClickAction(event, props.data, "edit")
            }
            key={"edit+" + props.data.ID}
          >
            Засах
          </span>
        ) : null}
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

export default connect(mapStateToProps, null)(ViewableRow);
