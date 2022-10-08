import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { DownloadTableExcel } from "react-export-table-to-excel";

import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

const RiskAssessmentTable = (props) => {
  const tableRef = useRef(null);
  const [searchValue, setSearchValue] = useState(null);
  const [allDatas, setAllDatas] = useState({
    duration: {
      STARTDATE: null,
      ENDDATE: null,
    },
  });

  const handleChangeDuration = (event) => {
    event.preventDefault();

    setAllDatas({
      ...allDatas,
      duration: {
        ...allDatas.duration,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    if (
      allDatas.duration.STARTDATE !== null &&
      allDatas.duration.ENDDATE !== null
    ) {
      props.getReports("amlreports/getReport23", allDatas.duration);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.duration]);

  const handleChangeSearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    // console.log(event.target.value);
  };

  // console.log("RISK_REPORT_PROPS: ", props);
  // console.log("RISK_REPORT_ALLDATAS: ", allDatas);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p className={styles.header}>Эрсдэлийн үнэлгээний нэгтгэл</p>
        <div>
          <span className={styles.duration}>Хугацаа: </span>
          <input name="STARTDATE" type="date" onChange={handleChangeDuration} />
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <input name="ENDDATE" type="date" onChange={handleChangeDuration} />
          <span
            className={styles.backbtn}
            onClick={(event) => props.handleChangeReport(event, 0)}
          >
            Буцах
          </span>
        </div>
      </div>
      {allDatas.duration?.STARTDATE !== null &&
      allDatas.duration?.ENDDATE !== null &&
      props.reports !== null ? (
        <div>
          {/* <DownloadTableExcel
            filename="Эрсдэлийн үнэлгээний нэгтгэл.xlsx"
            sheet="Report"
            currentTableRef={tableRef.current}
          >
            <button className={styles.downloadXLS}>XLS-ээр татах</button>
          </DownloadTableExcel> */}

          <input
            type="search"
            name="search"
            placeholder="Хайх утгаа оруулна уу..."
            className={styles.searchInput}
            onChange={handleChangeSearch}
          />

          <table
            border={1}
            cellPadding={3}
            cellSpacing={0}
            id="report23"
            ref={tableRef}
            className={styles.table}
          >
            <thead>
              <tr>
                <th width={100}>Регистр</th>
                <th width={150}>Нэр</th>
                {props.reports?.periods?.map((period, index) => {
                  return (
                    <th key={index} width={150}>
                      {period.DURATION}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {props.reports?.orgs
                ?.filter((el) => {
                  if (searchValue !== null) {
                    return Object.values(el)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchValue?.toLowerCase());
                  } else {
                    return el;
                  }
                })
                ?.map((org, index) => {
                  return (
                    <tr key={index} className={styles.tableData}>
                      <td align="center" valign="middle">
                        {org.REGISTER}
                      </td>
                      <td align="center" valign="middle">
                        {org.NAME}
                      </td>
                      {props.reports?.periods?.map((period, index) => {
                        return (
                          <td
                            align="center"
                            valign="middle"
                            key={index}
                            style={{
                              backgroundColor: props.reports?.result_assess[
                                period.ID
                              ]?.filter(
                                (a) =>
                                  a.USER_ID === org.ID &&
                                  a.PERIOD_ID === period.ID
                              )[0]?.COLOR,
                              color: props.reports?.result_assess[
                                period.ID
                              ]?.filter(
                                (a) =>
                                  a.USER_ID === org.ID &&
                                  a.PERIOD_ID === period.ID
                              )[0]?.TEXT_COLOR,
                            }}
                          >
                            <p>
                              <strong>Огноо: </strong>
                              {
                                props.reports?.result_assess[period.ID]?.filter(
                                  (a) =>
                                    a.USER_ID === org.ID &&
                                    a.PERIOD_ID === period.ID
                                )[0]?.C_DATE
                              }
                            </p>
                            <p className={styles.paragraph}>
                              <strong>Үнэлгээ: </strong>
                              {props.reports?.result_assess[period.ID]
                                ?.filter(
                                  (a) =>
                                    a.USER_ID === org.ID &&
                                    a.PERIOD_ID === period.ID
                                )[0]
                                ?.ASSESS.toFixed(2)}
                            </p>

                            <p className={styles.paragraph}>
                              <strong>Түвшин: </strong>
                              {
                                props.reports?.result_assess[period.ID]?.filter(
                                  (a) =>
                                    a.USER_ID === org.ID &&
                                    a.PERIOD_ID === period.ID
                                )[0]?.RATE
                              }
                            </p>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.noDuration}>
          Эхлэх, дуусах хугацааг оруулна уу.
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  reports: state.DataReducer.reports,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getReports: (api_name, data) =>
      dispatch(DataAction.getReports(api_name, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiskAssessmentTable);
