import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../../reduxes/actions/Data";
import * as LocalAction from "../../../reduxes/actions/Local";

import styles from "./styles.module.css";

function UserAdm(props) {
  const [sector, setSector] = useState(0);
  const [per, setPer] = useState(1);
  const [viewAssess, setViewAssess] = useState(0);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    props.storeReference(props.dataRef[4], "collapselist");
    props.getDatasByStatus(props.dataRef[4], 1);
    props.getPeriod(props.dataRef[13]);
    const reference = {
      api_name: "amlquestionnaireapproves",
    };
    props.getDatas(reference);
    props.getStatistics("amlquestionnaireresults", per);
    props.getAssessApprove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.getStatistics("amlquestionnaireresults", per);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [per]);

  const handleSectorChange = (event) => {
    event.preventDefault();
    setSector(event.target.value);
  };

  const handlePeriodChange = (event) => {
    event.preventDefault();
    setPer(event.target.value);
  };

  const handleViewAssess = (data) => {
    console.log(data);
    if (viewAssess === data.ID) {
      return setViewAssess(0);
    }

    setViewAssess(data.ID);
    const sendData = {
      ...data,
      PERIOD_ID: Number(per),
    };
    props.viewAssess("amlquestionnaireresults/viewassess", sendData);
  };

  const handleApproveAssess = (event, data) => {
    event.preventDefault();

    const allowedData = {
      USER_ID: data.details[0].USER_ID,
      ASSESS: data.assess[0],
      ASSESS2: data.assess2[0],
      ASSESS3: data.assess3[0],
      ASSESS4: data.assess4[0],
      C_BY: localStorage.getItem("userId"),
    };
    props.saveDatas("amlquestionnaireapproves", allowedData);
    alert("Эрсдэлийн үнэлгээ баталгаажлаа.");

    const reference = {
      api_name: "amlquestionnaireapproves",
    };
    props.getDatas(reference);
  };

  const handleViewResult = (event, assess) => {
    event.preventDefault();

    props.storeQuestionnaireResult({
      USER: assess,
      PERIOD_ID: per,
    });
  };

  const handleChangeSearch = (event) => {
    event.preventDefault();

    setSearchData(event.target.value);
  };

  // console.log("QUESTIONNAIRE_USERADM_PROPS: ", props);
  // console.log("SEARCH_DATA: ", searchData);
  // console.log("QUESTIONNAIRE_USERADM_PERIOD: ", per);
  // console.log("QUESTIONNAIRE_USERADM_SECTOR: ", sector);

  return (
    <div>
      <form>
        <span className={styles.formP}>
          Салбар:
          <select
            className={styles.formSelect}
            onChange={(event) => handleSectorChange(event)}
          >
            {props.referencesAction?.orgtypes.map((reference, index) => {
              return sector === reference.ID ? (
                <option value={reference.ID} key={index} selected>
                  {reference.DESCRIPTION}
                </option>
              ) : (
                <option value={reference.ID} key={index}>
                  {reference.DESCRIPTION}
                </option>
              );
            })}
          </select>
        </span>
        <span className={styles.formP}>
          Хугацаа:
          <select
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
        <span className={styles.formP}>
          Хайлт:
          <input
            className={styles.formInput}
            type="search"
            name="searchData"
            onChange={handleChangeSearch}
          />
        </span>
      </form>

      {/* Статистик хүснэгт */}
      <table
        border={0}
        cellPadding={10}
        cellSpacing={0}
        width="60%"
        className={styles.tableStatistic}
        align="left"
      >
        <tr style={{ height: "2rem" }}>
          <th width="30%">Салбарууд</th>
          <th width="10%">Нийт</th>
          <th width="10%">Бөглөсөн</th>
          <th width="10%">Баталгаажсан</th>
        </tr>
        {props.statistics?.map((statistic, index) => {
          return (
            <tr key={index}>
              <td align="left">
                {
                  props.referencesAction?.orgtypes.filter(
                    (r) => r.ID === statistic.ORGTYPE_ID
                  )[0]?.DESCRIPTION
                }
              </td>
              <td align="center">{statistic.ALL_COUNT}</td>
              <td align="center">
                {statistic.RESULT && statistic.PERIOD_ID === Number(per)
                  ? statistic.RESULT
                  : 0}
              </td>
              <td align="center">
                {statistic.APPROVE && statistic.PERIOD_ID === Number(per)
                  ? statistic.APPROVE
                  : 0}
              </td>
            </tr>
          );
        })}
      </table>

      {/* Үндсэн хүснэгт */}
      <table
        border={1}
        cellPadding={10}
        cellSpacing={0}
        width="100%"
        className={styles.tableList}
      >
        <thead>
          <tr className={styles.headrow}>
            <th width="20%" align="center">
              {props.metadatas[4][0][1]}
            </th>
            <th width="10%" align="center">
              Регистр
            </th>
            <th width="30%" align="center">
              {props.metadatas[4][2][1]}
            </th>
            <th width="10%" align="center">
              Асуулга ирүүлсэн огноо
            </th>
            <th width="10%" align="center">
              Баталгаажсан огноо
            </th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {props.datas
            ?.filter((el) => {
              if (searchData !== null) {
                return Object.values(el)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchData?.toLowerCase());
              } else {
                return el;
              }
            })
            .map((data, index) => {
              return Number(sector) === 0 ? (
                <Fragment key={index}>
                  <tr className={styles.bodyrow}>
                    <td>
                      {
                        props.referencesAction?.orgtypes.filter(
                          (r) => r.ID === data.ORGTYPE_ID
                        )[0]?.DESCRIPTION
                      }
                    </td>
                    <td>{data.REGISTER}</td>
                    <td>{data[props.metadatas[4][2][0]]}</td>
                    <td>
                      {
                        props.assessApprove?.filter(
                          (a) =>
                            a.USER_ID === data.ID &&
                            Number(a.PERIOD_ID) === Number(per)
                        )[0]?.ASSESS_DATE
                      }
                    </td>
                    <td>
                      {
                        props.assessApprove?.filter(
                          (a) =>
                            a.USER_ID === data.ID &&
                            Number(a.PERIOD_ID) === Number(per)
                        )[0]?.APPROVE_DATE
                      }
                    </td>
                    <td>
                      <span
                        className={styles.buttonView}
                        onClick={() => handleViewAssess(data)}
                      >
                        {viewAssess !== data.ID
                          ? "Үнэлгээг харах"
                          : "Үнэлгээг хаах"}
                      </span>
                      <span
                        className={styles.buttonView}
                        onClick={(event) => handleViewResult(event, data)}
                      >
                        Хариу харах
                      </span>
                    </td>
                  </tr>
                  {viewAssess === data.ID &&
                    Number(props.supplies?.details[0].USER_ID) ===
                      Number(data.ID) &&
                    Number(per) ===
                      Number(props.supplies?.assess[0].PERIOD_ID) && (
                      <tr>
                        <td colSpan={10} align="center">
                          <br />
                          <table
                            border={0}
                            cellPadding={10}
                            cellSpacing={0}
                            width="70%"
                          >
                            <tr>
                              <th colSpan={10}>Ерөнхий мэдээлэл</th>
                            </tr>
                            {props.supplies?.details.map((detail, index) => {
                              return (
                                <tr key={index}>
                                  <td height="30px">
                                    <strong>{detail.NAME}</strong>
                                  </td>
                                  <td>{detail.SCORE}</td>
                                  <td>&nbsp;</td>
                                </tr>
                              );
                            })}
                            <tr>
                              <td>&nbsp;</td>
                            </tr>
                            <tr>
                              <th colSpan={10}>Эрсдэлийн үнэлгээ</th>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess2[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess2[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center" width="80px">
                                <span
                                  className={styles.assess}
                                  style={{
                                    backgroundColor: `${props.supplies?.assess2[0].COLOR}`,
                                    color: `${props.supplies?.assess2[0].TEXT_COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess2[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess3[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess3[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center">
                                <span
                                  className={styles.assess}
                                  style={{
                                    color: `${props.supplies?.assess3[0].TEXT_COLOR}`,
                                    backgroundColor: `${props.supplies?.assess3[0].COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess3[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess4[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess4[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center">
                                <span
                                  className={styles.assess}
                                  style={{
                                    color: `${props.supplies?.assess4[0].TEXT_COLOR}`,
                                    backgroundColor: `${props.supplies?.assess4[0].COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess4[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center">
                                <span
                                  className={styles.assess}
                                  style={{
                                    color: `${props.supplies?.assess[0].TEXT_COLOR}`,
                                    backgroundColor: `${props.supplies?.assess[0].COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ height: "20px" }} colSpan="10"></td>
                            </tr>
                            <tr>
                              <td colSpan={10} align="center">
                                {props.approved !== null ? (
                                  props.approved?.filter(
                                    (a) =>
                                      a.USER_ID ===
                                        props.supplies?.details[0].USER_ID &&
                                      a.PERIOD_ID ===
                                        props.supplies?.assess[0].PERIOD_ID
                                  ).length === 0 ? (
                                    <span
                                      className={styles.buttonApprove}
                                      onClick={(event) =>
                                        handleApproveAssess(
                                          event,
                                          props.supplies
                                        )
                                      }
                                    >
                                      Баталгаажуулах
                                    </span>
                                  ) : (
                                    <span className={styles.buttonApproved}>
                                      Баталгаажсан
                                    </span>
                                  )
                                ) : (
                                  <span
                                    className={styles.buttonApprove}
                                    onClick={(event) =>
                                      handleApproveAssess(event, props.supplies)
                                    }
                                  >
                                    Баталгаажуулах
                                  </span>
                                )}
                              </td>
                            </tr>
                          </table>
                          <br />
                          <br />
                        </td>
                      </tr>
                    )}
                </Fragment>
              ) : Number(sector) === Number(data.ORGTYPE_ID) ? (
                <Fragment key={index}>
                  <tr className={styles.bodyrow}>
                    <td>
                      {
                        props.referencesAction?.orgtypes.filter(
                          (r) => r.ID === data.ORGTYPE_ID
                        )[0]?.DESCRIPTION
                      }
                    </td>
                    <td>{data.REGISTER}</td>
                    <td>{data[props.metadatas[4][2][0]]}</td>
                    <td>
                      {
                        props.assessApprove?.filter(
                          (a) =>
                            a.USER_ID === data.ID &&
                            Number(a.PERIOD_ID) === Number(per)
                        )[0]?.ASSESS_DATE
                      }
                    </td>
                    <td>
                      {
                        props.assessApprove?.filter(
                          (a) =>
                            a.USER_ID === data.ID &&
                            Number(a.PERIOD_ID) === Number(per)
                        )[0]?.APPROVE_DATE
                      }
                    </td>
                    <td>
                      <span
                        className={styles.buttonView}
                        onClick={() => handleViewAssess(data)}
                      >
                        {viewAssess !== data.ID
                          ? "Үнэлгээг харах"
                          : "Үнэлгээг хаах"}
                      </span>
                      <span
                        className={styles.buttonView}
                        onClick={(event) => handleViewResult(event, data)}
                      >
                        Хариу харах
                      </span>
                    </td>
                  </tr>
                  {viewAssess === data.ID &&
                    Number(props.supplies?.details[0].USER_ID) ===
                      Number(data.ID) &&
                    Number(per) ===
                      Number(props.supplies?.assess[0].PERIOD_ID) && (
                      <tr>
                        <td colSpan={10} align="center">
                          <br />
                          <table
                            border={0}
                            cellPadding={10}
                            cellSpacing={0}
                            width="70%"
                          >
                            <tr>
                              <th colSpan={10}>Ерөнхий мэдээлэл</th>
                            </tr>
                            {props.supplies?.details.map((detail, index) => {
                              return (
                                <tr key={index}>
                                  <td height="30px">
                                    <strong>{detail.NAME}</strong>
                                  </td>
                                  <td>{detail.SCORE}</td>
                                  <td>&nbsp;</td>
                                </tr>
                              );
                            })}
                            <tr>
                              <td>&nbsp;</td>
                            </tr>
                            <tr>
                              <th colSpan={10}>Эрсдэлийн үнэлгээ</th>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess2[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess2[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center">
                                <span
                                  className={styles.assess}
                                  style={{
                                    backgroundColor: `${props.supplies?.assess2[0].COLOR}`,
                                    color: `${props.supplies?.assess2[0].TEXT_COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess2[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess3[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess3[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center">
                                <span
                                  className={styles.assess}
                                  style={{
                                    backgroundColor: `${props.supplies?.assess3[0].COLOR}`,
                                    color: `${props.supplies?.assess3[0].TEXT_COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess3[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess4[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess4[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center">
                                <span
                                  className={styles.assess}
                                  style={{
                                    backgroundColor: `${props.supplies?.assess4[0].COLOR}`,
                                    color: `${props.supplies?.assess4[0].TEXT_COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess4[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td height="30px">
                                <strong>
                                  {props.supplies?.assess[0].NAME}
                                </strong>
                              </td>
                              <td>
                                {props.supplies?.assess[0].SCORE.toFixed(2)}
                              </td>
                              <td align="center">
                                <span
                                  className={styles.assess}
                                  style={{
                                    backgroundColor: `${props.supplies?.assess[0].COLOR}`,
                                    color: `${props.supplies?.assess[0].TEXT_COLOR}`,
                                  }}
                                >
                                  {props.supplies?.assess[0].RATE}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={10} align="center">
                                {props.approved !== null ? (
                                  props.approved?.filter(
                                    (a) =>
                                      a.USER_ID ===
                                        props.supplies?.details[0].USER_ID &&
                                      a.PERIOD_ID ===
                                        props.supplies?.assess[0].PERIOD_ID
                                  ).length === 0 ? (
                                    <span
                                      className={styles.buttonApprove}
                                      onClick={(event) =>
                                        handleApproveAssess(
                                          event,
                                          props.supplies
                                        )
                                      }
                                    >
                                      Баталгаажуулах
                                    </span>
                                  ) : (
                                    <span className={styles.buttonApproved}>
                                      Баталгаажсан
                                    </span>
                                  )
                                ) : (
                                  <span
                                    className={styles.buttonApprove}
                                    onClick={(event) =>
                                      handleApproveAssess(event, props.supplies)
                                    }
                                  >
                                    Баталгаажуулах
                                  </span>
                                )}
                              </td>
                            </tr>
                          </table>
                          <br />
                          <br />
                        </td>
                      </tr>
                    )}
                </Fragment>
              ) : null;
            })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    metadatas: state.MetaDataReducer.metadatas,
    datas: state.DataReducer.datas,
    dataRef: state.MetaDataReducer.dataRef,
    referencesAction: state.LocalReducer.referencesAction,
    supplies: state.DataReducer.supplies,
    periods: state.DataReducer.periods,
    approved: state.DataReducer.approved,
    statistics: state.DataReducer.statistics,
    assessApprove: state.DataReducer.assessApprove,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPeriod: (reference) => dispatch(DataAction.getPeriod(reference)),
    getDatasByStatus: (reference, status) =>
      dispatch(DataAction.getDatasByStatus(reference, status)),
    storeReference: (reference, action) =>
      dispatch(LocalAction.storeReference(reference, action)),
    viewAssess: (parameter, data) =>
      dispatch(DataAction.viewAssess(parameter, data)),
    saveDatas: (api_name, data) =>
      dispatch(DataAction.saveDatas(api_name, data)),
    getDatas: (reference) => dispatch(DataAction.getDatas(reference)),
    getStatistics: (reference, period) =>
      dispatch(DataAction.getStatistics(reference, period)),
    storeQuestionnaireResult: (data) =>
      dispatch(LocalAction.storeQuestionnaireResult(data)),
    getAssessApprove: () => dispatch(DataAction.getAssessApprove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdm);
