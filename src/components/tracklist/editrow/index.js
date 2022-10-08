import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function TrackEditRow(props) {
  // console.log("TRACK_EDIT_ROW_PROPS: ", props);
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
                onChange={props.handleChangeEdit}
              >
                {props.sector?.map((s, index) => {
                  return (
                    s.ID !== 0 &&
                    (props.editData.SECTOR === s.ID ? (
                      <option value={s.ID} key={index} selected>
                        {s.DESCRIPTION}
                      </option>
                    ) : (
                      <option value={s.ID} key={index}>
                        {s.DESCRIPTION}
                      </option>
                    ))
                  );
                })}
              </select>
            </div>
          ) : metadata[0] === "USER_ID" ? (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <select
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeEdit}
              >
                {props.orgs?.map((o, index) => {
                  return (
                    Number(props.editData?.SECTOR) === o.ORGTYPE_ID &&
                    (props.editData.USER_ID === o.ID ? (
                      <option value={o.ID} key={index} selected>
                        {o.NAME}
                      </option>
                    ) : (
                      <option value={o.ID} key={index}>
                        {o.NAME}
                      </option>
                    ))
                  );
                })}
              </select>
            </div>
          ) : metadata[0] === "TYPE_ID" ? (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <select
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeEdit}
              >
                {props.types?.map((t, index) => {
                  return props.editData.USER_ID === t.ID ? (
                    <option value={t.ID} key={index} selected>
                      {t.NAME}
                    </option>
                  ) : (
                    <option value={t.ID} key={index}>
                      {t.NAME}
                    </option>
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
                onChange={props.handleChangeEdit}
              >
                {props.refer === "0" ? (
                  props.editData.STATUS === 1 ? (
                    <>
                      <option value={1} selected>
                        Идэвхтэй
                      </option>
                      <option value={2}>Идэвхгүй</option>
                    </>
                  ) : (
                    <>
                      <option value={1}>Идэвхтэй</option>
                      <option value={2} selected>
                        Идэвхгүй
                      </option>
                    </>
                  )
                ) : props.refer === "1" ? (
                  props.status?.map((s, index) => {
                    return s.ID === props.editData.STATUS_ID ? (
                      <option value={s.ID} key={index} selected>
                        {s.NAME}
                      </option>
                    ) : (
                      <option value={s.ID} key={index}>
                        {s.NAME}
                      </option>
                    );
                  })
                ) : null}
              </select>
            </div>
          ) : metadata[0] === "STARTDATE" || metadata[0] === "ENDDATE" ? (
            props.editData.IS_PERIOD === "2" ? (
              <div key={index}>
                <div className={styles.formTitle}>
                  {metadata[1]} ({props.editData[metadata[0]]})
                </div>
                <input
                  type="date"
                  name={metadata[0]}
                  required
                  className={styles.formInput}
                  onChange={props.handleChangeEdit}
                  disabled
                />
              </div>
            ) : (
              <div key={index}>
                <div className={styles.formTitle}>
                  {metadata[1]} ({props.editData[metadata[0]]})
                </div>
                <input
                  type="date"
                  name={metadata[0]}
                  required
                  className={styles.formInput}
                  onChange={props.handleChangeEdit}
                />
              </div>
            )
          ) : metadata[0] === "IS_PERIOD" ? (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <select
                name={metadata[0]}
                required
                className={styles.formInput}
                onChange={props.handleChangeEdit}
              >
                {props.editData.IS_PERIOD === 1 ? (
                  <>
                    <option value={1} selected>
                      Тийм
                    </option>
                    <option value={2}>Үгүй</option>
                  </>
                ) : (
                  <>
                    <option value={1}>Тийм</option>
                    <option value={2} selected>
                      Үгүй
                    </option>
                  </>
                )}
              </select>
            </div>
          ) : (
            <div key={index}>
              <div className={styles.formTitle}>{metadata[1]}</div>
              <input
                type="text"
                name={metadata[0]}
                required
                className={styles.formInput}
                value={props.editData[metadata[0]]}
                onChange={props.handleChangeEdit}
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
          value={props.editData["LEGAL_NAME"]}
          onChange={props.handleChangeEdit}
        />
        <div className={styles.formTitle}>Хуулийн заалт</div>
        <input
          type="text"
          name="LEGAL_NO"
          required
          className={styles.formInput}
          value={props.editData["LEGAL_NO"]}
          onChange={props.handleChangeEdit}
        />
        {props.refer === "0" ? (
          <div className={styles.formTitle}>Орсон шалтгаан</div>
        ) : props.refer === "1" ? (
          <div className={styles.formTitle}>Шалтгаан</div>
        ) : null}
        <textarea
          rows={5}
          className={styles.formInput}
          onChange={props.handleChangeEdit}
          name="IN_REASON"
        >
          {props.editData["IN_REASON"]}
        </textarea>
        {props.refer === "0" && (
          <>
            <div className={styles.formTitle}>Гарсан шалтгаан</div>
            <textarea
              rows={3}
              className={styles.formInput}
              onChange={props.handleChangeEdit}
              name="OUT_REASON"
            >
              {props.editData["OUT_REASON"]}
            </textarea>
          </>
        )}
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

export default connect(mapStateToProps, null)(TrackEditRow);
