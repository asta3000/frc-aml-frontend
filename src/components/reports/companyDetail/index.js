import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { DownloadTableExcel } from "react-export-table-to-excel";
import fileDownload from "js-file-download";
import axios from "axios";

import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

const CompaniesDetails = (props) => {
  const tableRef = useRef(null);
  const [searchValue, setSearchValue] = useState(null);
  useEffect(() => {
    props.getReports("amlreports/getCompanyDetail");
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

  const handleChangeSearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    // console.log(event.target.value);
  };

  // console.log("REPORT_PROPS: ", props);
  // console.log("SEARCH_VALUE: ", searchValue);

  return (
    <div>
      <div className={styles.title}>
        Мэдээлэх үүрэгтэй этгээдийн үндсэн мэдээлэл
      </div>
      <DownloadTableExcel
        filename="Мэдээлэх үүрэгтэй этгээдийн үндсэн мэдээлэл"
        sheet="Report"
        currentTableRef={tableRef.current}
      >
        <button className={styles.downloadXLS}>XLS-ээр татах</button>
      </DownloadTableExcel>

      {/* <button className={styles.downloadPDF}>PDF-ээр татах</button> */}

      <input
        type="search"
        name="search"
        placeholder="Хайх утгаа оруулна уу..."
        className={styles.searchInput}
        onChange={handleChangeSearch}
      />

      <span
        className={styles.backbtn}
        onClick={(event) => props.handleChangeReport(event, 0)}
      >
        Буцах
      </span>

      <table
        border={1}
        cellPadding={3}
        cellSpacing={0}
        id="report"
        ref={tableRef}
        className={styles.table}
      >
        <thead>
          <tr>
            <th width={80}>Регистр</th>
            <th width={150}>Компанийн нэр</th>
            <th width={200}>Салбар</th>
            <th width={100}>Үүсгэн байгуулагдсан</th>
            <th width={80}>Салбарын тоо</th>
            <th width={80}>Ажилтны тоо</th>
            <th width={100}>ГЗ-ын иргэншил</th>
            <th width={100}>ГЗ-ын нэр</th>
            <th width={150}>ГЗ-ын тушаал</th>
            <th width={100}>Комплайнсын ажилтан</th>
            <th width={100}>Томилогдсон огноо</th>
            <th width={150}>Комплайнсын тушаал</th>
            <th width={150}>Дотоод хөтөлбөр</th>
            <th width={100}>Батлагдсан огноо</th>
          </tr>
        </thead>
        <tbody>
          {props.reports?.result
            .filter((el) => {
              if (searchValue !== null) {
                return Object.values(el)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchValue?.toLowerCase());
              } else {
                return el;
              }
            })
            ?.map((report, index) => {
              return (
                <tr key={index} className={styles.tableData}>
                  <td align="center" valign="middle">
                    {report["REGISTER"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["COMPANY_NAME"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["ORG_NAME"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["FOUNDED_DATE"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["NO_BRANCHES"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["NO_EMPS"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["CITIZEN"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["CEO_NAME"]}
                  </td>
                  <td
                    align="center"
                    valign="middle"
                    onClick={(event) =>
                      handleDownload(event, report["ORDERNO"])
                    }
                    className={styles.downloadLink}
                  >
                    {report["ORDERNO"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["COMPLIANCE_NAME"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["T_DATE"]}
                  </td>
                  <td
                    align="center"
                    valign="middle"
                    onClick={(event) => handleDownload(event, report["T_NO"])}
                    className={styles.downloadLink}
                  >
                    {report["T_NO"]}
                  </td>
                  <td
                    align="center"
                    valign="middle"
                    onClick={(event) =>
                      handleDownload(event, report["PROGRAM"])
                    }
                    className={styles.downloadLink}
                  >
                    {report["PROGRAM"]}
                  </td>
                  <td align="center" valign="middle">
                    {report["APPROVED_DATE"]}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p className={styles.footer}>
        <strong>Нийт байгууллагын тоо: </strong>
        {props.reports?.result?.length}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  reports: state.DataReducer.reports,
});

const mapDispatchToProps = (dispatch) => ({
  getReports: (api_name, data) =>
    dispatch(DataAction.getReports(api_name, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDetails);
