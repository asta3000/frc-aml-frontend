import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

function AddRow(props) {
  useEffect(() => {
    props.supplyDatas(props.dataRef[10]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("ADDROW_PROPS: ", props);
  return (
    <tr className={styles.tabledata}>
      {props.metadatas[props.menu.id]?.map((metadata, index) => {
        return (
          <td key={index}>
            {metadata[0] === "SECTOR_NAME" ? (
              <select
                name="SECTOR_ID"
                onChange={props.handleChangeAdd}
                className={styles.inputField}
              >
                <option value="">Сонгоно уу...</option>
                {props.references?.orgtypes.map(
                  (reference, index) =>
                    reference.ID !== 0 && (
                      <option value={reference.ID} key={index}>
                        {reference.DESCRIPTION}
                      </option>
                    )
                )}
              </select>
            ) : metadata[0] === "QUESTION" ? (
              <select
                name="QUESTION_ID"
                onChange={props.handleChangeAdd}
                className={styles.inputField}
              >
                <option value="">Сонгоно уу...</option>
                {props.supplies?.map(
                  (supply, index) =>
                    supply.ANSWER_TYPE_ID === 2 &&
                    supply.STATUS === 1 &&
                    supply.IS_QUESTION === 1 && (
                      <option value={supply.ID} key={index}>
                        {supply.NAME}
                      </option>
                    )
                )}
              </select>
            ) : (
              <input
                type="text"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeAdd}
                className={styles.inputField}
              />
            )}
          </td>
        );
      })}
      <td>
        <input
          type="button"
          value="Хадгалах"
          className={styles.buttonSave}
          onClick={(event) => props.handleClickSave(event)}
        />
        <input
          type="button"
          value="Болих"
          className={styles.buttonCancel}
          onClick={(event) => props.handleClickCancel(event)}
        />
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
    supplies: state.DataReducer.supplies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    supplyDatas: (parameter) => dispatch(DataAction.supplyDatas(parameter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRow);
