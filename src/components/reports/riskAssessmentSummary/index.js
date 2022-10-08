import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Bar, Doughnut } from "react-chartjs-2";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import * as DataAction from "../../../reduxes/actions/Data";
import * as LocalAction from "../../../reduxes/actions/Local";
import ReportModal from "../modal";

import styles from "./styles.module.css";

Chart.register(ChartDataLabels);

const RiskAssessmentSummary = (props) => {
  const tableRef = useRef(null);
  const [allDatas, setAllDatas] = useState({
    MODAL: null,
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
      props.getReports(
        "amlreports/getRiskAssessmentSummary",
        allDatas.duration
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.duration]);

  const handleModal = (action) => {
    setAllDatas({
      ...allDatas,
      MODAL: action,
    });
  };

  const handleCloseModal = (event) => {
    event.preventDefault();

    setAllDatas({
      ...allDatas,
      MODAL: null,
    });
  };

  // console.log("RISK_REPORT_PROPS: ", props);
  // console.log("RISK_REPORT_ALLDATAS: ", allDatas);

  return (
    <div className={styles.container}>
      {allDatas.MODAL !== null && (
        <ReportModal
          allDatas={allDatas}
          handleCloseModal={handleCloseModal}
          // handleDownload={handleDownload}
          data={props.reports}
        />
      )}
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
        <div className={styles.dashboard}>
          <div className={styles.firstRow}>
            <div className={styles.firstColumn}>
              <div className={styles.allOrgs}>
                <p>Нийт бүртгэлтэй</p>
                <p className={styles.number}>
                  {props.reports?.org_statistics[0]?.ALL_ORGS}
                </p>
              </div>
              <div className={styles.activeOrgs}>
                <p>Нийт идэвхтэй</p>
                <p className={styles.number}>
                  {props.reports?.org_statistics[0]?.ACTIVE_ORGS}
                </p>
              </div>
              <div className={styles.assessOrgs}>
                <p>Асуулга ирүүлсэн</p>
                <p className={styles.number}>
                  {props.reports?.org_statistics[0]?.ASSESS_ORGS}
                </p>
              </div>
            </div>
            {/* End of firstColumn of firstRow */}
            <div className={styles.chart1}>
              <Bar
                width={200}
                data={{
                  labels: props.reports?.barchart?.periods,
                  datasets: [
                    {
                      label: "Хугацаандаа ирүүлсэн",
                      data: props.reports?.barchart?.ontimes,
                      backgroundColor: "rgba(255, 153, 51, 0.7)",
                      borderWidth: 1,
                    },
                    {
                      label: "Асуулга ирүүлээгүй",
                      data: props.reports?.barchart?.noassesses,
                      backgroundColor: "rgba(170, 153, 51, 0.7)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    datalabels: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 7,
                      font: {
                        size: 12,
                        weight: 700,
                      },
                      anchor: "center",
                    },
                  },
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
              {/* End of Chart 1 of FirstRow */}
            </div>
            {/* End of secondColumn of firstRow*/}
            <div className={styles.chart2}>
              <p>Эрсдэлийн үнэлгээ</p>
              <div>
                {props.reports?.piechart?.percents?.length === 0 ? (
                  <span className={styles.chartError}>
                    Баталгаажсан үнэлгээ олдсонгүй.
                  </span>
                ) : (
                  <Doughnut
                    width={100}
                    data={{
                      labels: props.reports?.piechart?.scales,
                      datasets: [
                        {
                          label: "Эрсдэлийн үнэлгээ",
                          data: props.reports?.piechart?.percents,
                          backgroundColor: props.reports?.piechart?.colors,
                          hoverOffset: 10,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        datalabels: {
                          color: "black",
                          backgroundColor: "white",
                          borderRadius: 10,
                          padding: 7,
                          font: {
                            size: 12,
                            weight: 700,
                          },
                          anchor: "end",
                        },
                      },
                      maintainAspectRatio: false,
                      responsive: true,
                      legend: {
                        position: "bottom",
                        align: "center",
                        color: ["red", "blue", "green", "cyan", "yellow"],
                      },
                    }}
                  />
                )}{" "}
              </div>
            </div>
            {/* End of thirdColumn of firstRow*/}
          </div>
          {/* End of firstRow */}
          <div className={styles.secondRow}>
            <div className={styles.firstColumn}>
              <p>Эрсдэлийн үнэлгээний статистик</p>
              <table
                border={1}
                cellPadding={3}
                cellSpacing={0}
                className={styles.table1}
                id="report"
                ref={tableRef}
              >
                <thead height="25px">
                  <tr>
                    <td width="40%">Салбарууд</td>
                    <td width="12%">Ирүүлбэл зохих</td>
                    <td width="12%">Ирүүлсэн</td>
                    <td width="12%">Өндөр эрсдэлтэй</td>
                    <td width="12%">Дотоод хяналтын хөтөлбөртэй</td>
                    <td width="12%">Комплайнсын ажилтантай</td>
                  </tr>
                </thead>
                <tbody>
                  {props.reports?.statistics?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={styles.chartError}>
                        Өгөгдөл олдсонгүй
                      </td>
                    </tr>
                  ) : (
                    props.reports?.statistics?.map((statistic, index) => {
                      return (
                        <tr key={index}>
                          <td
                            className={styles.link}
                            onClick={() => handleModal(statistic.NAME)}
                          >
                            {statistic.DESCRIPTION}
                          </td>
                          <td>{statistic.ACTIVE_ORGS}</td>
                          <td>{statistic.ASSESS_TOO}</td>
                          <td>{statistic.HIGH_TOO}</td>
                          <td>{statistic.PROGRAM_TOO}</td>
                          <td>{statistic.COMPLIANCE_TOO}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <DownloadTableExcel
                filename="Эрсдэлийн үнэлгээний нэгтгэл"
                sheet="Report"
                currentTableRef={tableRef.current}
              >
                <button className={styles.downloadXLS}>XLS-ээр татах</button>
              </DownloadTableExcel>
            </div>
            <div className={styles.secondColumn}>
              <p>Зөрчлийн статистик</p>
              <table
                border={1}
                cellPadding={3}
                cellSpacing={0}
                className={styles.table2}
              >
                <thead>
                  <tr>
                    <td width="40%">Зөрчлийн төрөл</td>
                    <td width="20%">Нийт</td>
                    <td width="20%">Биелэлт</td>
                    <td width="20%">Биелэлтийн хувь</td>
                  </tr>
                </thead>
                <tbody>
                  {props.reports?.violations?.length === 0 ? (
                    <tr>
                      <td colSpan={4} className={styles.chartError}>
                        Өгөгдөл олдсонгүй
                      </td>
                    </tr>
                  ) : (
                    props.reports?.violations?.map((violation, index) => {
                      return (
                        <tr key={index}>
                          <td>{violation.NAME}</td>
                          <td>{violation.V_TOO}</td>
                          <td>{violation.COMPLETED_TOO}</td>
                          <td>{violation.PERCENT}%</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
  references: state.LocalReducer.references,
  reports: state.DataReducer.reports,
});

const mapDispatchToProps = (dispatch) => {
  return {
    storeReference: (reference) =>
      dispatch(LocalAction.storeReference(reference)),
    getReports: (api_name, data) =>
      dispatch(DataAction.getReports(api_name, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiskAssessmentSummary);
