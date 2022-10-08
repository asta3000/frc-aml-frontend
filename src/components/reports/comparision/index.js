import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../../reduxes/actions/Data";
import * as LocalAction from "../../../reduxes/actions/Local";

import styles from "./styles.module.css";

function ComparisionAssessment(props) {
  const [periods, setPeriods] = useState({
    PERIOD1: null,
    PERIOD2: null,
    USER_ID: null,
  });

  useEffect(() => {
    props.getPeriod(props.dataRef[13]);
    props.storeReference(props.dataRef[15]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePeriodChange = (event) => {
    event.preventDefault();
    setPeriods({ ...periods, [event.target.name]: Number(event.target.value) });
  };

  const handleViewAssess = () => {
    periods.PERIOD1 === null ||
    periods.PERIOD2 === null ||
    periods.USER_ID === null
      ? alert("Байгууллага эсвэл хугацааг оруулна уу!")
      : props.getReports("amlreports/getComparision", periods);
  };

  // console.log("COMPARISION_ASSESS_PROPS: ", props);

  return (
    <div>
      <div className={styles.title}>
        Эрсдэлийн үнэлгээг байгууллагын харьцуулалтаар харах
      </div>
      <form className={styles.formP}>
        Байгууллага:
        <br />
        <select
          name="USER_ID"
          className={styles.formSelect}
          onChange={(event) => handlePeriodChange(event)}
        >
          <option value={0}>Сонгоно уу...</option>
          {props.references?.organizations?.map((organization, index) => {
            return (
              <option value={organization.ID} key={index}>
                {organization.NAME}
              </option>
            );
          })}
        </select>
        <br />
        Харьцуулах хугацаа:
        <br />
        <select
          name="PERIOD1"
          className={styles.formSelect}
          onChange={(event) => handlePeriodChange(event)}
          style={{ marginRight: "0.8rem" }}
        >
          <option value={0}>Сонгоно уу...</option>
          {props.periods?.map((period, index) => {
            return (
              <option value={period.ID} key={index}>
                {period.STARTDATE} - {period.ENDDATE}
              </option>
            );
          })}
        </select>
        -
        <select
          name="PERIOD2"
          className={styles.formSelect}
          onChange={(event) => handlePeriodChange(event)}
          style={{ marginLeft: "0.8rem" }}
        >
          <option value={0}>Сонгоно уу...</option>
          {props.periods?.map((period, index) => {
            return (
              <option value={period.ID} key={index}>
                {period.STARTDATE} - {period.ENDDATE}
              </option>
            );
          })}
        </select>
        <span className={styles.formSubmit} onClick={() => handleViewAssess()}>
          Харах
        </span>
      </form>
      <div className={styles.assessment}>
        <div className={styles.assessment1}>
          <table border={0} width="100%">
            <tr height="50px">
              <th colSpan={2} align="center">
                {props.reports !== null &&
                  props.periods?.filter((p) => p.ID === periods.PERIOD1)[0]
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
                {props.reports != null &&
                  props.periods?.filter((p) => p.ID === periods.PERIOD2)[0]
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
    dataRef: state.MetaDataReducer.dataRef,
    periods: state.DataReducer.periods,
    reports: state.DataReducer.reports,
    references: state.LocalReducer.references,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPeriod: (reference) => dispatch(DataAction.getPeriod(reference)),
    getReports: (api_name, data) =>
      dispatch(DataAction.getReports(api_name, data)),
    storeReference: (reference) =>
      dispatch(LocalAction.storeReference(reference)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparisionAssessment);
