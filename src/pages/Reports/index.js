import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../reduxes/actions/Data";

import SectorAssessment from "../../components/reports/sector";
import ScaleAssessment from "../../components/reports/scale";
import ComparisionAssessment from "../../components/reports/comparision";
import CompaniesDetails from "../../components/reports/companyDetail";
import CompanyDashboard from "../../components/reports/companyDashboard";
import RiskAssessmentSummary from "../../components/reports/riskAssessmentSummary";
import RiskAssessmentTable from "../../components/reports/riskAssessmentTable";

import styles from "./styles.module.css";

function Reports(props) {
  const [reportId, setReportId] = useState(0);

  useEffect(() => {
    if (reportId === 0) props.getReports(null, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportId]);

  const handleChangeReport = (event, id) => {
    event.preventDefault();
    setReportId(id);
  };

  // console.log("REPORT_PROPS: ", props);

  return (
    <div>
      {reportId === 0 ? (
        <Fragment>
          <div className={styles.title}>Тайлангууд</div>
          <span
            className={styles.reportlink}
            onClick={(event) => handleChangeReport(event, 1)}
          >
            Эрсдэлийн үнэлгээ (салбараар)
          </span>
          <br />
          <br />
          <span
            className={styles.reportlink}
            onClick={(event) => handleChangeReport(event, 2)}
          >
            Эрсдэлийн үнэлгээ (түвшингээр)
          </span>
          <br />
          <br />
          <span
            className={styles.reportlink}
            onClick={(event) => handleChangeReport(event, 3)}
          >
            Эрсдэлийн үнэлгээ (байгууллагын харьцуулалтаар)
          </span>
          <br />
          <br />
          <span
            className={styles.reportlink}
            onClick={(event) => handleChangeReport(event, 4)}
          >
            Мэдээлэх үүрэгтэй этгээдийн үндсэн мэдээлэл (хүснэгтээр)
          </span>
          <br />
          <br />
          <span
            className={styles.reportlink}
            onClick={(event) => handleChangeReport(event, 5)}
          >
            Мэдээлэх үүрэгтэй этгээдийн мэдээлэл (дашбоард)
          </span>
          <br />
          <br />
          <span
            className={styles.reportlink}
            onClick={(event) => handleChangeReport(event, 6)}
          >
            Эрсдэлийн үнэлгээний нэгтгэл (дашбоард)
          </span>
          <br />
          <br />
          <span
            className={styles.reportlink}
            onClick={(event) => handleChangeReport(event, 7)}
          >
            Эрсдэлийн үнэлгээний нэгтгэл (хүснэгтээр)
          </span>
        </Fragment>
      ) : (
        <Fragment>
          <div className={styles.report}>
            {reportId === 1 ? (
              <SectorAssessment handleChangeReport={handleChangeReport} />
            ) : reportId === 2 ? (
              <ScaleAssessment handleChangeReport={handleChangeReport} />
            ) : reportId === 3 ? (
              <ComparisionAssessment handleChangeReport={handleChangeReport} />
            ) : reportId === 4 ? (
              <CompaniesDetails handleChangeReport={handleChangeReport} />
            ) : reportId === 5 ? (
              <CompanyDashboard handleChangeReport={handleChangeReport} />
            ) : reportId === 6 ? (
              <RiskAssessmentSummary handleChangeReport={handleChangeReport} />
            ) : reportId === 7 ? (
              <RiskAssessmentTable handleChangeReport={handleChangeReport} />
            ) : null}
          </div>
          <span
            className={styles.backbtn}
            onClick={(event) => handleChangeReport(event, 0)}
          >
            Буцах
          </span>
          <br />
          <br />
          <br />
          <br />
        </Fragment>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReports: (api_name, data) =>
      dispatch(DataAction.getReports(api_name, data)),
  };
};

export default connect(null, mapDispatchToProps)(Reports);
