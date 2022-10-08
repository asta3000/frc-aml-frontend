import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

function EditRow(props) {
  useEffect(() => {
    props.supplyDatas(props.dataRef[10]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("EDITROW_PROPS: ", props);
  return (
    <tr className={styles.tabledata}>
      {props.metadatas[props.menu.id]?.map((metadata, index) => {
        let editedData = "";
        editedData = props.data[metadata[0]];

        return (
          <td key={index}>
            {metadata[0] === "SECTOR_NAME" ? (
              <select
                name="SECTOR_ID"
                onChange={props.handleChangeEdit}
                className={styles.inputField}
              >
                {props.references?.orgtypes.map((reference, index) =>
                  reference.ID !== 0 ? (
                    props.data.SECTOR_ID === reference.ID ? (
                      <option value={reference.ID} key={index} selected>
                        {reference.DESCRIPTION}
                      </option>
                    ) : (
                      <option value={reference.ID} key={index}>
                        {reference.DESCRIPTION}
                      </option>
                    )
                  ) : null
                )}
              </select>
            ) : metadata[0] === "QUESTION" ? (
              <select
                name="QUESTION_ID"
                onChange={props.handleChangeAdd}
                className={styles.inputField}
              >
                {props.supplies?.map(
                  (supply, index) =>
                    supply.ANSWER_TYPE_ID === 2 &&
                    supply.STATUS === 1 &&
                    supply.IS_QUESTION === 1 &&
                    (props.data.QUESTION_ID === supply.ID ? (
                      <option value={supply.ID} key={index} selected>
                        {supply.NAME}
                      </option>
                    ) : (
                      <option value={supply.ID} key={index}>
                        {supply.NAME}
                      </option>
                    ))
                )}
              </select>
            ) : (
              <input
                type="text"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
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
          onClick={(event) => props.handleClickEdit(event)}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRow);
