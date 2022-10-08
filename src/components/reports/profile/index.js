import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Mapping from "../../mapping";
import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

function ProfileAssessment(props) {
  const [periods, setPeriods] = useState({
    PERIOD1: 1,
    PERIOD2: 1,
    USER_ID: Number(localStorage.getItem("userId")),
  });

  useEffect(() => {
    props.getPeriod(props.dataRef[13]);
    props.getReports("amlreports", periods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.getReports("amlreports", periods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periods]);

  const handlePeriodChange = (event) => {
    event.preventDefault();
    setPeriods({ ...periods, [event.target.name]: Number(event.target.value) });
  };

  // console.log("PROFILE_ASSESS_PROPS: ", props);

  return (
    <div>
      <Mapping />
      <div className={styles.title}>{props.menu.name}</div>
      <form>
        <span className={styles.formP}>
          Харьцуулах үнэлгээний хугацаа:
          <select
            name="PERIOD1"
            className={styles.formSelect}
            onChange={(event) => handlePeriodChange(event)}
          >
            {props.periods?.map((period, index) => {
              return (
                <option value={period.ID} key={index}>
                  {period.STARTDATE} - {period.ENDDATE}
                </option>
              );
            })}
          </select>
          <select
            name="PERIOD2"
            className={styles.formSelect}
            onChange={(event) => handlePeriodChange(event)}
          >
            {props.periods?.map((period, index) => {
              return (
                <option value={period.ID} key={index}>
                  {period.STARTDATE} - {period.ENDDATE}
                </option>
              );
            })}
          </select>
        </span>
      </form>
      <div className={styles.assessment}>
        <div className={styles.assessment1}>
          <table border={0} width="100%">
            <tr height="50px">
              <th colSpan={2} align="center">
                {props.periods?.filter((p) => p.ID === periods.PERIOD1)[0]
                  ?.STARTDATE +
                  " - " +
                  props.periods?.filter((p) => p.ID === periods.PERIOD1)[0]
                    ?.ENDDATE}
              </th>
            </tr>
            {props.reports?.result
              .filter((r) => r.PERIOD_ID === periods.PERIOD1)
              ?.map((report, index) => {
                return (
                  <tr key={index} height="35px">
                    <td>{report.NAME}</td>
                    <td align="right">
                      <span
                        className={styles.assess}
                        style={{
                          backgroundColor: report.COLOR,
                          color: report.TEXT_COLOR,
                        }}
                      >
                        {report.SCORE.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <div className={styles.assessment2}>
          <table border={0} width="100%">
            <tr height="50px">
              <th colSpan={2} align="center">
                {props.periods?.filter((p) => p.ID === periods.PERIOD2)[0]
                  ?.STARTDATE +
                  " - " +
                  props.periods?.filter((p) => p.ID === periods.PERIOD2)[0]
                    ?.ENDDATE}
              </th>
            </tr>
            {props.reports?.result
              .filter((r) => r.PERIOD_ID === periods.PERIOD2)
              ?.map((report, index) => {
                return (
                  <tr key={index} height="35px">
                    <td>{report.NAME}</td>
                    <td align="right">
                      <span
                        className={styles.assess}
                        style={{
                          backgroundColor: report.COLOR,
                          color: report.TEXT_COLOR,
                        }}
                      >
                        {report.SCORE.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    dataRef: state.MetaDataReducer.dataRef,
    periods: state.DataReducer.periods,
    reports: state.DataReducer.reports,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPeriod: (reference) => dispatch(DataAction.getPeriod(reference)),
    getReports: (api_name, data) =>
      dispatch(DataAction.getReports(api_name, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAssessment);
