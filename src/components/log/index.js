import React, { useState } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../reduxes/actions/Data";

import Mapping from "../mapping";

import styles from "./styles.module.css";

function Logs(props) {
  const [periods, setPeriods] = useState({
    STARTDATE: null,
    ENDDATE: null,
  });

  const handleViewLogs = (event) => {
    event.preventDefault();

    periods.STARTDATE === null || periods.ENDDATE === null
      ? alert("Хугацаа оруулаагүй байна")
      : props.getLogs(props.dataRef[props.menu?.id]?.api_name, periods);
  };

  const handlePeriodChange = (event) => {
    event.preventDefault();
    setPeriods({ ...periods, [event.target.name]: event.target.value });
  };

  console.log("LOG_PROPS: ", props);

  return (
    <div className={styles.viewlist}>
      <Mapping />
      <div className={styles.title}>{props.menu.name}</div>
      <form className={styles.formP}>
        Хугацаа:
        <br />
        <input
          type="date"
          name="STARTDATE"
          className={styles.formSelect}
          onChange={(event) => handlePeriodChange(event)}
        />{" "}
        &nbsp;&nbsp; - &nbsp;&nbsp;{" "}
        <input
          type="date"
          name="ENDDATE"
          className={styles.formSelect}
          onChange={(event) => handlePeriodChange(event)}
        />
        <span
          className={styles.formSubmit}
          onClick={(event) => handleViewLogs(event)}
        >
          Харах
        </span>
      </form>
      <table
        border={0}
        cellPadding={5}
        cellSpacing={0}
        className={styles.tablelist}
      >
        <thead>
          <tr className={styles.tablemetadata}>
            {props.metadatas[props.menu.id]?.map((metadata, index) => {
              return <th key={index}>{metadata[1]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.datas?.map((data, index) => {
            return (
              <tr key={index} height="25px">
                {props.metadatas[props.menu?.id]?.map((metadata, index) => {
                  console.log(data[metadata[0]]);
                  return (
                    <td align={metadata[2]} key={index}>
                      {metadata[0] === "CONTENT"
                        ? JSON.stringify(data[metadata[0]])
                        : data[metadata[0]]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    datas: state.DataReducer.datas,
    dataRef: state.MetaDataReducer.dataRef,
    metadatas: state.MetaDataReducer.metadatas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLogs: (api_name, periods) =>
      dispatch(DataAction.getLogs(api_name, periods)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
