import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function ReportModal(props) {
  let data = {};

  if (props.allDatas.MODAL === "ceo") {
    data = {
      lists: props.data.result4,
      unno: null,
      no: 19,
      title: "Гүйцэтгэх захирлын түүх",
    };
  } else if (props.allDatas.MODAL === "program") {
    data = {
      lists: props.data.result7,
      unno: null,
      no: 20,
      title: "Дотоод хяналтын хөтөлбөрийн түүх",
    };
  } else if (props.allDatas.MODAL === "grant") {
    data = {
      lists: props.data.result5,
      unno: null,
      no: 21,
      title: "Тусгай зөвшөөрлийн түүх",
    };
  } else if (props.allDatas.MODAL === "compliance") {
    data = {
      lists: props.data.result6,
      unno: null,
      no: 16,
      title: "Комплайнсын ажилтны түүх",
    };
  } else {
    data = {
      no: null,
      unno: props.allDatas?.MODAL,
      title: props.data?.statistics?.filter(
        (s) => s.NAME === props.allDatas.MODAL
      )[0].DESCRIPTION,
    };
  }

  // console.log("PROPS_REPORT_MODAL: ", props);
  // console.log("PROPS_REPORT_DATA: ", details);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.title}>{data.title}</div>
        {data.lists?.length === 0 ? (
          <p className={styles.norecord}>Өгөгдөл олдсонгүй</p>
        ) : data.no !== null && data.unno === null ? (
          <table
            border={1}
            cellPadding={3}
            cellSpacing={0}
            className={styles.table}
          >
            <thead>
              <tr>
                {props.metadatas[data.no]?.map((metadata, index) => {
                  if (
                    metadata[0] !== "L_NAME" &&
                    metadata[0] !== "LAST_NAME" &&
                    metadata[0] !== "MOBILE" &&
                    metadata[0] !== "PHONE" &&
                    metadata[0] !== "EMAIL"
                  )
                    return <td key={index}>{metadata[1]}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.lists?.map((list, i1) => {
                return (
                  <tr key={i1}>
                    {props.metadatas[data.no]?.map((metadata, i2) => {
                      if (
                        metadata[0] !== "L_NAME" &&
                        metadata[0] !== "LAST_NAME" &&
                        metadata[0] !== "MOBILE" &&
                        metadata[0] !== "PHONE" &&
                        metadata[0] !== "EMAIL"
                      ) {
                        if (
                          metadata[0] === "ORDERNO" ||
                          metadata[0] === "T_NO" ||
                          metadata[0] === "PROGRAM"
                        ) {
                          return (
                            <td
                              key={i2}
                              onClick={(event) =>
                                props.handleDownload(event, list[metadata[0]])
                              }
                              className={styles.download}
                            >
                              {list[metadata[0]]}
                            </td>
                          );
                        } else {
                          return <td key={i2}>{list[metadata[0]]}</td>;
                        }
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table
            border={1}
            cellPadding={3}
            cellSpacing={0}
            className={styles.table}
          >
            <thead>
              <tr>
                <td>Регистр</td>
                <td>Байгууллагын нэр</td>
                <td>Асуулга ирүүлсэн огноо</td>
                <td>Эрсдэлийн үнэлгээ</td>
                <td>Төлөв</td>
              </tr>
            </thead>
            <tbody>
              {props.data?.details
                ?.filter((el) => el.SECTOR === data.unno)
                ?.map((detail, index) => {
                  return (
                    <tr key={index}>
                      <td>{detail.REGISTER}</td>
                      <td>{detail.NAME}</td>
                      <td>{detail.FILLED_DATE}</td>
                      <td>{detail.ASSESS}</td>
                      <td
                        className={
                          detail.STATUS === "Баталгаажсан"
                            ? styles.approved
                            : detail.STATUS === "Ирүүлээгүй"
                            ? styles.nothing
                            : null
                        }
                      >
                        {detail.STATUS}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        <div className={styles.buttons}>
          <div className={styles.buttons}>
            <div onClick={props.handleCloseModal} className={styles.closeBtn}>
              Хаах
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  metadatas: state.MetaDataReducer.metadatas,
});

export default connect(mapStateToProps, null)(ReportModal);
