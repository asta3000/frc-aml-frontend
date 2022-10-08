import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function TrackReason(props) {
  // console.log("TRACK_REASON_PROPS: ", props);
  return (
    <table
      border={0}
      cellPadding={0}
      cellSpacing={10}
      align="center"
      width="100%"
    >
      {props.mod_metadatas[props.refer]?.map((metadata, index) => {
        let value;
        metadata[0] === "SECTOR"
          ? (value = props.sector?.filter(
              (s) => s.ID === props.data[metadata[0]]
            )[0]?.DESCRIPTION)
          : metadata[0] === "USER_ID"
          ? (value = props.orgs?.filter(
              (o) => o.ID === props.data[metadata[0]]
            )[0]?.NAME)
          : metadata[0] === "TYPE_ID"
          ? (value = props.types?.filter(
              (t) => t.ID === props.data[metadata[0]]
            )[0]?.NAME)
          : metadata[0] === "IS_PERIOD"
          ? props.data[metadata[0]] === 2
            ? (value = "Үгүй")
            : (value = "Тийм")
          : metadata[0] === "STATUS"
          ? props.refer === "0"
            ? props.data[metadata[0]] === 1
              ? (value = "Идэвхтэй")
              : (value = "Идэвхгүй")
            : props.refer === "1" &&
              (value = props.status?.filter(
                (s) => s.ID === props.data.STATUS_ID
              )[0]?.NAME)
          : metadata[0] === "STARTDATE" || metadata[0] === "ENDDATE"
          ? props.data[metadata[0]] === null
            ? (value = "-")
            : (value = props.data[metadata[0]])
          : (value = props.data[metadata[0]]);
        return (
          <tr key={index} align="left">
            <td className={styles.title} width="25%">
              {metadata[1]}
            </td>
            <td className={styles.data} width="85%">
              {value}
            </td>
          </tr>
        );
      })}
      <tr>
        <td className={styles.title}>Хуулийн нэр</td>
        <td className={styles.data}>{props.data["LEGAL_NAME"]}</td>
      </tr>
      <tr>
        <td className={styles.title}>Хуулийн заалт</td>
        <td className={styles.data}>{props.data["LEGAL_NO"]}</td>
      </tr>
      <tr>
        <td className={styles.title}>Орсон шалтгаан</td>
        <td className={styles.data}>{props.data["IN_REASON"]}</td>
      </tr>
      <tr>
        <td className={styles.title} valign="top">
          Гарсан шалтгаан
        </td>
        <td className={styles.data}>
          <textarea
            className={styles.textarea}
            rows="10"
            name="OUT_REASON"
            onChange={(event) => props.handleChangeReason(event)}
          >
            {!props.reason.OUT_REASON ? null : props.reason.OUT_REASON}
          </textarea>
        </td>
      </tr>
      <tr>
        <td className={styles.title}>Файл хавсаргах</td>
        <td className={styles.data}>
          <input
            type="file"
            required="required"
            name="ATTACH"
            onChange={(event) => props.handleChangeReason(event)}
          />
        </td>
      </tr>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    mod_metadatas: state.MetaDataReducer.mod_metadatas,
    status: state.TrackReducer.status,
    types: state.TrackReducer.types,
    sector: state.TrackReducer.sector,
    orgs: state.TrackReducer.orgs,
  };
};

export default connect(mapStateToProps)(TrackReason);
