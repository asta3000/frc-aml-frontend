import React, { useEffect } from "react";
import { connect } from "react-redux";
import fileDownload from "js-file-download";
import axios from "axios";

import * as TrackAction from "../../../reduxes/actions/Track";

import styles from "./styles.module.css";

function TrackViewRow(props) {
  useEffect(() => {
    if (
      props.data.STATUS_ID === 7 &&
      localStorage.getItem("role") === "USERORG"
    ) {
      const data = {
        STATUS: 2,
        VIOLATION_ID: props.data.ID,
        C_BY: localStorage.getItem("userId"),
        MSG: "Үзсэн төлөвт шилжлээ.",
        USER_ID: props.data.USER_ID,
      };
      props.changeTrack(props.mod_dataRef[props.refer]?.api_name, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = (event, fileName) => {
    event.preventDefault();
    // console.log("FILE: ", fileName);

    axios({
      method: "POST",
      responseType: "blob",
      url: "http://localhost:1234/v1/download",
      data: { fileName },
    })
      .then((result) => {
        console.log("File is downloaded");
        fileDownload(result.data, fileName);
      })
      .catch((error) =>
        console.log("File is not downloaded and try again. Error is", error)
      );
  };

  // console.log("VIEW_ROW_PROPS: ", props);

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
              <span
                className={
                  props.data.V_DAY === 0
                    ? styles.v_day0
                    : props.data.V_DAY === 1
                    ? styles.v_day1
                    : styles.v_day2
                }
              >
                {value}
              </span>
            </td>
          </tr>
        );
      })}
      <tr>
        <td className={styles.title}>Хуулийн нэр</td>
        <td className={styles.data}>
          <span
            className={
              props.data.V_DAY === 0
                ? styles.v_day0
                : props.data.V_DAY === 1
                ? styles.v_day1
                : styles.v_day2
            }
          >
            {props.data["LEGAL_NAME"]}
          </span>
        </td>
      </tr>
      <tr>
        <td className={styles.title}>Хуулийн заалт</td>
        <td className={styles.data}>
          <span
            className={
              props.data.V_DAY === 0
                ? styles.v_day0
                : props.data.V_DAY === 1
                ? styles.v_day1
                : styles.v_day2
            }
          >
            {props.data["LEGAL_NO"]}
          </span>
        </td>
      </tr>
      <tr>
        <td className={styles.title}>Орсон шалтгаан</td>
        <td className={styles.data}>
          <span
            className={
              props.data.V_DAY === 0
                ? styles.v_day0
                : props.data.V_DAY === 1
                ? styles.v_day1
                : styles.v_day2
            }
          >
            {props.data["IN_REASON"]}
          </span>
        </td>
      </tr>
      <tr>
        <td className={styles.title}>Гарсан шалтгаан</td>
        <td className={styles.data}>
          <span
            className={
              props.data.V_DAY === 0
                ? styles.v_day0
                : props.data.V_DAY === 1
                ? styles.v_day1
                : styles.v_day2
            }
          >
            {props.data["OUT_REASON"]}
          </span>
        </td>
      </tr>
      <tr>
        <td className={styles.title}>Хавсралт файл:</td>
        <td className={styles.data}>
          <span
            className={styles.download}
            onClick={(event) => handleDownload(event, props.data["ATTACH"])}
          >
            {props.data["ATTACH"]}
          </span>
        </td>
      </tr>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    mod_metadatas: state.MetaDataReducer.mod_metadatas,
    mod_dataRef: state.MetaDataReducer.mod_dataRef,
    status: state.TrackReducer.status,
    sector: state.TrackReducer.sector,
    orgs: state.TrackReducer.orgs,
    types: state.TrackReducer.types,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTrack: (api_name, data) =>
      dispatch(TrackAction.changeTrack(api_name, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackViewRow);
