import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function TrackAddRow(props) {
  // console.log("TRACK_ADD_ROW_PROPS: ", props);
  return (
    <form className={styles.form}>
      <div>
        {props.mod_metadatas[props.refer]?.map((metadata, index) => {
          return metadata[0] === "SECTOR" ? (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <select
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeAdd}
              >
                <option value={0}>Сонгоно уу</option>
                {props.sector?.map((s, index) => {
                  return (
                    s.ID !== 0 && (
                      <option value={s.ID} key={index}>
                        {s.DESCRIPTION}
                      </option>
                    )
                  );
                })}
              </select>
            </div>
          ) : metadata[0] === "STATUS" ? (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <select
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeAdd}
              >
                <option value="0">Сонгоно уу...</option>
                {props.refer === "0" ? (
                  <>
                    <option value="1">Идэвхтэй</option>
                    <option value="2">Идэвхгүй</option>
                  </>
                ) : (
                  props.refer === "1" &&
                  props.status?.map((s, index) => {
                    return (
                      <option value={s.ID} key={index}>
                        {s.NAME}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          ) : metadata[0] === "TYPE_ID" ? (
            <div key={index}>
              <div className={styles.formTitle}>Төрөл</div>
              <select
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeAdd}
              >
                <option value="0">Сонгоно уу...</option>
                {props.types?.map((t, index) => {
                  return (
                    <option value={t.ID} key={index}>
                      {t.NAME}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : metadata[0] === "IS_PERIOD" ? (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <select
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeAdd}
              >
                <option value={0}>Сонгоно уу</option>
                <option value={1}>Тийм</option>
                <option value={2}>Үгүй</option>
              </select>
            </div>
          ) : metadata[0] === "STARTDATE" || metadata[0] === "ENDDATE" ? (
            props.addData.IS_PERIOD === "2" ? (
              <div key={index}>
                <div className={styles.formTitle}>{metadata[1]}</div>
                <input
                  type="date"
                  name={metadata[0]}
                  required
                  className={styles.formInput}
                  onChange={props.handleChangeAdd}
                  disabled
                />
              </div>
            ) : (
              <div key={index}>
                <div className={styles.formTitle}>{metadata[1]}</div>
                <input
                  type="date"
                  name={metadata[0]}
                  required
                  className={styles.formInput}
                  onChange={props.handleChangeAdd}
                />
              </div>
            )
          ) : metadata[0] === "USER_ID" ? (
            <div key={index}>
              <div className={styles.formTitle}>Байгууллага</div>
              <select
                name="USER_ID"
                required
                className={styles.formInput}
                onChange={props.handleChangeAdd}
              >
                <option value={0}>Сонгоно уу</option>
                {props.orgs?.map((org, index) => {
                  return (
                    Number(props.addData?.SECTOR) === org.ORGTYPE_ID && (
                      <option value={org.ID} key={index}>
                        {org.NAME}
                      </option>
                    )
                  );
                })}
              </select>
            </div>
          ) : metadata[0] === "FIRST_NAME" || metadata[0] === "LAST_NAME" ? (
            props.refer === "0" ? (
              <div key={index}>
                <div className={styles.formTitle}>{metadata[1]}</div>
                <input
                  type="text"
                  name={metadata[0]}
                  required
                  className={styles.formInput}
                  onChange={props.handleChangeAdd}
                />
              </div>
            ) : null
          ) : (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <input
                type="text"
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeAdd}
              />
            </div>
          );
        })}
      </div>

      <div>
        <div className={styles.formTitle}>Хуулийн нэр</div>
        <input
          type="text"
          name="LEGAL_NAME"
          required
          className={styles.formInput}
          onChange={props.handleChangeAdd}
        />
        <div className={styles.formTitle}>Хуулийн заалт</div>
        <input
          type="text"
          name="LEGAL_NO"
          required
          className={styles.formInput}
          onChange={props.handleChangeAdd}
        />
        {props.refer === "0" ? (
          <div className={styles.formTitle}>Орсон шалтгаан</div>
        ) : props.refer === "1" ? (
          <div className={styles.formTitle}>Шалтгаан</div>
        ) : null}
        <textarea
          rows={5}
          className={styles.formInput}
          onChange={props.handleChangeAdd}
          name="IN_REASON"
        ></textarea>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    mod_metadatas: state.MetaDataReducer.mod_metadatas,
    status: state.TrackReducer.status,
    sector: state.TrackReducer.sector,
    types: state.TrackReducer.types,
    orgs: state.TrackReducer.orgs,
  };
};

export default connect(mapStateToProps, null)(TrackAddRow);
