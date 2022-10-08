import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function AddableRow(props) {
  // console.log("ADDABLE_ROW_PROPS: ", props);
  return (
    <tr className={styles.tabledata}>
      {props.metadatas[props.menu.id]?.map((metadata, index) => {
        return (
          <td key={index}>
            {metadata[0] === "STATUS" ? (
              <select
                name={metadata[0]}
                onChange={props.handleChangeAdd}
                required
              >
                <option value="">Сонгоно уу...</option>
                <option value="1">Идэвхтэй</option>
                <option value="2">Идэвхгүй</option>
              </select>
            ) : metadata[0] === "DEP_ID" ? (
              <select
                name={metadata[0]}
                onChange={props.handleChangeAdd}
                required
              >
                <option value="">Сонгоно уу...</option>
                {props.references?.frcdepartments?.map((reference, index) => (
                  <option value={reference.ID} key={index}>
                    {reference.NAME}
                  </option>
                ))}
              </select>
            ) : metadata[0] === "USER_ID" ? (
              <select
                name={metadata[0]}
                onChange={props.handleChangeAdd}
                required
              >
                <option value="">Сонгоно уу...</option>
                <option value={localStorage.getItem("userId")} key={index}>
                  {
                    props.references[
                      props.dataRef[props.menu?.id]?.field_name
                    ]?.filter(
                      (reference) =>
                        reference.ID === Number(localStorage.getItem("userId"))
                    )[0]?.NAME
                  }
                </option>
              </select>
            ) : metadata[0] === "ORGTYPE_ID" ? (
              <select
                name={metadata[0]}
                onChange={props.handleChangeAdd}
                required
              >
                <option value="">Сонгоно уу...</option>
                {props.references?.orgtypes?.map((reference, index) => (
                  <option value={reference.ID} key={index}>
                    {reference.DESCRIPTION}
                  </option>
                ))}
              </select>
            ) : metadata[0] === "EMAIL" ? (
              <input
                type="email"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "STARTDATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "ENDDATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "T_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "ISSUED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "EXPIRED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "FOUNDED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "APPROVED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            ) : metadata[0] === "T_NO" ||
              metadata[0] === "ORDERNO" ||
              metadata[0] === "PROGRAM" ? (
              <input
                type="file"
                required="required"
                name={metadata[0]}
                onChange={props.handleChangeAdd}
              />
            ) : (
              <input
                type="text"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
              />
            )}
          </td>
        );
      })}
      <td>
        <span
          className={styles.btnSave}
          onClick={(event) => props.handleClickSave(event)}
        >
          Хадгалах
        </span>
        <span
          className={styles.btnCancel}
          onClick={(event) => props.handleClickCancel(event)}
        >
          Болих
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

export default connect(mapStateToProps, null)(AddableRow);
