import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

function SectorAssessment(props) {
  const [period, setPeriod] = useState({ PERIOD: null });

  useEffect(() => {
    props.getPeriod(props.dataRef[13]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePeriodChange = (event) => {
    event.preventDefault();
    setPeriod({ ...period, [event.target.name]: Number(event.target.value) });
  };

  const handleViewAssess = () => {
    period.PERIOD === null
      ? alert("Хугацааг оруулна уу!")
      : props.getReports("amlreports/getBySector", period);
  };

  // console.log("SECTOR_ASSESSMENT_PROPS: ", props);
  return (
    <div>
      <div className={styles.title}>Эрсдэлийн үнэлгээг салбараар харах</div>
      <form className={styles.formP}>
        Эрсдэлийн үнэлгээний хугацаа:
        <select
          name="PERIOD"
          className={styles.formSelect}
          onChange={(event) => handlePeriodChange(event)}
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
      <table
        border={0}
        cellPadding={2}
        cellSpacing={0}
        width="100%"
        style={{ fontSize: "0.8rem" }}
      >
        <tr height="50px">
          <td></td>
          <td>Байгууллагын нэр</td>
          <td>Регистрийн дугаар</td>
          <td>Ерөнхий үнэлгээ</td>
          <td>Эрсдэлийн түвшин</td>
        </tr>
        {props.reports?.result1?.map((sector, index) => {
          return (
            <Fragment>
              <tr key={index} align="left" height="35px">
                <th colSpan={5}>{sector.DESCRIPTION}</th>
              </tr>
              {props.reports.result
                ?.filter((a) => a.ORGTYPE_ID === sector.ID)
                ?.map((assessment, index1) => {
                  return (
                    <tr key={index1} height="25px">
                      <td width={50}></td>
                      <td>{assessment.USER_NAME}</td>
                      <td>{assessment.REGISTER}</td>
                      <td>{assessment.SCORE.toFixed(2)}</td>
                      <td>
                        <span
                          className={styles.assess}
                          style={{
                            backgroundColor: assessment.COLOR,
                            color: assessment.TEXT_COLOR,
                          }}
                        >
                          {assessment.RATE}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </Fragment>
          );
        })}
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(SectorAssessment);
