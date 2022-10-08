import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function EditableRow(props) {
  // console.log("EDITABLE_ROW_PROPS: ", props);

  return (
    <tr className={styles.tabledata}>
      {props.metadatas[props.menu.id]?.map((metadata, index) => {
        let editedData = "";
        editedData = props.data[metadata[0]];
        // console.log(metadata[0]);

        return (
          <td key={index}>
            {metadata[0] === "STATUS" ? (
              <select name={metadata[0]} onChange={props.handleChangeEdit}>
                {Number(props.data.STATUS) === 1 ? (
                  <>
                    <option value="1" selected>
                      Идэвхтэй
                    </option>
                    <option value="2">Идэвхгүй</option>
                  </>
                ) : (
                  <>
                    <option value="1">Идэвхтэй</option>
                    <option value="2" selected>
                      Идэвхгүй
                    </option>
                  </>
                )}
              </select>
            ) : metadata[0] === "DEP_ID" ? (
              <select name={metadata[0]} onChange={props.handleChangeEdit}>
                {props.references.frcdepartments?.map((reference, index) =>
                  props.data.DEP_ID === reference.ID ? (
                    <option value={reference.ID} key={index} selected>
                      {reference.NAME}
                    </option>
                  ) : (
                    <option value={reference.ID} key={index}>
                      {reference.NAME}
                    </option>
                  )
                )}
              </select>
            ) : metadata[0] === "DS_SN" ? (
              props.data.DS_SN ? (
                <input
                  type="text"
                  required="required"
                  value={props.data.DS_SN}
                  name={metadata[0]}
                  placeholder={metadata[1]}
                  onChange={props.handleChangeEdit}
                />
              ) : (
                <input
                  type="text"
                  required="required"
                  name={metadata[0]}
                  placeholder={metadata[1]}
                  onChange={props.handleChangeEdit}
                />
              )
            ) : metadata[0] === "USER_ID" ? (
              props.references[
                props.dataRef[props.menu?.id]?.field_name
              ]?.filter((reference) => reference.ID === props.data?.USER_ID)[0]
                ?.NAME
            ) : metadata[0] === "ORGTYPE_ID" ? (
              <select name={metadata[0]} onChange={props.handleChangeEdit}>
                {props.references.orgtypes?.map((reference, index) =>
                  props.data.ORGTYPE_ID === reference.ID ? (
                    <option value={reference.ID} key={index} selected>
                      {reference.DESCRIPTION}
                    </option>
                  ) : (
                    <option value={reference.ID} key={index}>
                      {reference.DESCRIPTION}
                    </option>
                  )
                )}
              </select>
            ) : metadata[0] === "EMAIL" ? (
              <input
                type="email"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "STARTDATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "ENDDATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "T_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "ISSUED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "EXPIRED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "FOUNDED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "APPROVED_DATE" ? (
              <input
                type="date"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            ) : metadata[0] === "T_NO" ||
              metadata[0] === "ORDERNO" ||
              metadata[0] === "PROGRAM" ? (
              <input
                type="file"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                onChange={props.handleChangeEdit}
              />
            ) : (
              <input
                type="text"
                required="required"
                name={metadata[0]}
                placeholder={metadata[1]}
                value={editedData}
                onChange={props.handleChangeEdit}
              />
            )}
          </td>
        );
      })}
      <td>
        <input
          type="button"
          value="Хадгалах"
          className={styles.saveBtn}
          onClick={(event) => props.handleClickEdit(event)}
        />
        <input
          type="button"
          value="Болих"
          className={styles.cancelBtn}
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
  };
};

export default connect(mapStateToProps, null)(EditableRow);
