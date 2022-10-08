import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaBlackTie, FaRegAddressCard } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { VscOrganization } from "react-icons/vsc";
import { GoIssueClosed } from "react-icons/go";
import { GrDocument } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import fileDownload from "js-file-download";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import * as DataAction from "../../../reduxes/actions/Data";
import * as LocalAction from "../../../reduxes/actions/Local";
import ReportModal from "../modal";

import styles from "./styles.module.css";

Chart.register(ChartDataLabels);

const CompanyDashboard = (props) => {
  const [allDatas, setAllDatas] = useState({
    REGISTER: "null",
    MODAL: null,
  });

  const reference = {
    ref_name: "organizations/status/1",
    field_name: "organizations",
  };

  useEffect(() => {
    props.storeReference(reference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    allDatas.REGISTER !== "null" &&
      props.getReports("amlreports/getCompanyDashboard", allDatas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.REGISTER]);

  const handleChangeOrganization = (event) => {
    event.preventDefault();

    // console.log("VALUE: ", event.target.value);

    setAllDatas({
      ...allDatas,
      REGISTER: event.target.value,
    });
  };

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

  const handleModal = (event, action) => {
    event.preventDefault();

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

  // console.log("DASHBOARD_PROPS: ", props);

  return (
    <div className={styles.container}>
      {allDatas.MODAL !== null && (
        <ReportModal
          allDatas={allDatas}
          handleCloseModal={handleCloseModal}
          handleDownload={handleDownload}
          data={props.reports}
        />
      )}
      <div className={styles.heading}>
        <p className={styles.header}>
          Мэдээлэх үүрэгтэй этгээдийн үндсэн мэдээлэл
        </p>
        <select name="organization" onChange={handleChangeOrganization}>
          <option value="null">Байгууллагыг сонгоно уу</option>
          {props.references?.organizations?.map((ref, index) => {
            return (
              <option key={index} value={ref.REGISTER}>
                {ref.NAME} ({ref.REGISTER})
              </option>
            );
          })}
        </select>
        <span
          className={styles.backbtn}
          onClick={(event) => props.handleChangeReport(event, 0)}
        >
          Буцах
        </span>
      </div>
      {allDatas.REGISTER !== "null" ? (
        <div className={styles.dashboard}>
          <div className={styles.firstColumn}>
            <div className={styles.firstRow}>
              <div className={styles.box}>
                <VscOrganization size="2rem" color="darkblue" />
                <div>
                  <p className={styles.title}>Байгууллага</p>
                  <p>
                    <strong>Нэр: </strong>
                    {props.reports?.result1[0]?.COMPANY_NAME}
                  </p>
                  <p>
                    <strong>Регистр: </strong>
                    {props.reports?.result1[0]?.REGISTER}
                  </p>
                  <p>
                    <strong>Байгуулсан: </strong>
                    {props.reports?.result1[0]?.FOUNDED_DATE}
                  </p>
                </div>
              </div>
              <div className={styles.box}>
                <FaBlackTie size="2rem" color="darkblue" />
                <div>
                  <p className={styles.title}>
                    Гүйцэтгэх захирал{" "}
                    <HiDotsVertical
                      className={styles.dotLink}
                      onClick={(event) => handleModal(event, "ceo")}
                    />
                  </p>
                  <p>
                    <strong>Нэр: </strong>
                    {props.reports?.result1[0]?.CEO_NAME}
                  </p>
                  <p>
                    <strong>Утас: </strong>
                    {props.reports?.result1[0]?.MOBILE}
                  </p>
                  <p>
                    <strong>Имэйл: </strong>
                    {props.reports?.result1[0]?.CEO_EMAIL}
                  </p>
                </div>
              </div>
              <div className={styles.box}>
                <BsCheck2All size="2rem" color="darkblue" />
                <div>
                  <p className={styles.title}>
                    Тусгай зөвшөөрөл
                    <HiDotsVertical
                      className={styles.dotLink}
                      onClick={(event) => handleModal(event, "grant")}
                    />
                  </p>
                  <p>
                    <strong>Нэр: </strong>
                    {props.reports?.result1[0]?.GRANT_NAME}
                  </p>
                  <p>
                    <strong>Дугаар: </strong>
                    {props.reports?.result1[0]?.NO}
                  </p>
                  <p>
                    <strong>Олгосон: </strong>
                    {props.reports?.result1[0]?.ISSUED_DATE}
                  </p>
                </div>
              </div>
            </div>
            {/* End of First Row of First Column*/}
            <div className={styles.secondRow}>
              <div className={styles.box}>
                <GoIssueClosed size="2rem" color="darkblue" />
                <div>
                  <p className={styles.title}>
                    Комплайнсын ажилтан{" "}
                    <HiDotsVertical
                      className={styles.dotLink}
                      onClick={(event) => handleModal(event, "compliance")}
                    />
                  </p>
                  <p>
                    <strong>Нэр: </strong>
                    {props.reports?.result1[0]?.COMPLIANCE_NAME}
                  </p>
                  <p>
                    <strong>Утас: </strong>
                    {props.reports?.result1[0]?.COMPLIANCE_PHONE}
                  </p>
                  <p>
                    <strong>Имэйл: </strong>
                    {props.reports?.result1[0]?.COMPLIANCE_EMAIL}
                  </p>
                </div>
              </div>
              <div className={styles.box}>
                <GrDocument size="2rem" color="darkblue" />
                <div>
                  <p className={styles.title}>
                    Дотоод хяналтын хөтөлбөр{" "}
                    <HiDotsVertical
                      className={styles.dotLink}
                      onClick={(event) => handleModal(event, "program")}
                    />
                  </p>
                  <p>
                    <strong>Батлагдсан: </strong>
                    {props.reports?.result1[0]?.APPROVED_DATE}
                  </p>
                  <p>
                    <strong>Файл татах: </strong>
                    <div
                      onClick={(event) =>
                        handleDownload(
                          event,
                          props.reports?.result1[0]?.PROGRAM
                        )
                      }
                      className={styles.download}
                    >
                      {props.reports?.result1[0]?.PROGRAM}
                    </div>
                  </p>
                  <p>&nbsp;</p>
                </div>
              </div>
              <div className={styles.box}>
                <FaRegAddressCard size="2rem" color="darkblue" />
                <div>
                  <p className={styles.title}>Холбоо барих</p>
                  <p>
                    <strong>Утас: </strong>
                    {props.reports?.result1[0]?.PHONE}
                  </p>
                  <p>
                    <strong>Имэйл: </strong>
                    {props.reports?.result1[0]?.EMAIL}
                  </p>
                  <p>
                    <strong>Хаяг: </strong>
                    {props.reports?.result1[0]?.ADDRESS}
                  </p>
                </div>
              </div>
            </div>
            {/* End of Second Row of First Column*/}
            <div className={styles.thirdRow}>
              <div className={styles.largeBox}>
                <p>Эрсдэлийн үнэлгээ</p>
                <div className={styles.chart}>
                  <Bar
                    data={{
                      labels: props.reports?.chart?.periods,
                      datasets: [
                        {
                          label: "Эрсдэлийн үнэлгээ",
                          data: props.reports?.chart?.scores,
                          backgroundColor: "rgba(255, 153, 51, 0.5)",
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
                          labels: {
                            title: "Үнэлгээ",
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
                            min: 0,
                            max: 5,
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End of First Column*/}
          <div className={styles.secondColumn}>
            <div className={styles.firstRow}>
              <div className={styles.box}>
                <p className={styles.title} align="center">
                  Эрсдэлийн үнэлгээний асуулга ирүүлсэн байдал
                </p>
                <table
                  border={0}
                  cellPadding={2}
                  cellSpacing={0}
                  width="100%"
                  className={styles.table}
                >
                  <thead>
                    <tr>
                      <th align="center" width="40%">
                        Асуулгын хугацаа
                      </th>
                      <th align="center" width="30%">
                        Ирц
                      </th>
                      <th align="center" width="30%">
                        Үнэлгээ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.reports?.result2?.map((assess, index) => {
                      return (
                        <tr className={styles.tableData} key={index}>
                          <td align="center">{assess.PERIOD}</td>
                          <td align="center">
                            <span
                              className={
                                assess.STATUS === "Хугацаандаа"
                                  ? styles.statusOnTime
                                  : styles.statusNoThing
                              }
                            >
                              {assess.STATUS}
                            </span>
                          </td>
                          <td align="center">
                            <span className={styles.assess}>
                              {assess.SCORE}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* End of First Row of Second Column */}
            <div className={styles.secondRow}>
              <div className={styles.box}>
                <p className={styles.title} align="center">
                  Зөрчлийн мэдээлэл
                </p>
                <table
                  border={0}
                  cellPadding={2}
                  cellSpacing={0}
                  width="100%"
                  className={styles.table}
                >
                  <thead>
                    <tr>
                      <th align="center" width="50%">
                        Зөрчлийн төрөл
                      </th>
                      <th align="center" width="25%">
                        Огноо
                      </th>
                      <th align="center" width="25%">
                        Төлөв
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.reports?.result3.map((violation, index) => {
                      return (
                        <tr className={styles.tableData} key={index}>
                          <td align="center">{violation.TYPE}</td>
                          <td align="center">{violation.C_DATE}</td>
                          <td align="center">
                            <span
                              className={
                                violation.STATUS === "Шинэ"
                                  ? styles.statusCritical
                                  : violation.STATUS === "Баталгаажсан"
                                  ? styles.statusSuccess
                                  : styles.statusWarning
                              }
                            >
                              {violation.STATUS}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* End of Second Column */}
        </div>
      ) : (
        <div className={styles.noOrganization}>Байгууллагыг сонгоно уу</div>
      )}
      {/* End of Dashboard */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);
