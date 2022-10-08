import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../../reduxes/actions/Data";
import * as LocalAction from "../../../reduxes/actions/Local";

import styles from "./styles.module.css";

function QuestionnaireResult(props) {
  useEffect(() => {
    const data = {
      USER_ID: props.questionnaireResult?.USER.ID,
      PERIOD_ID: props.questionnaireResult?.PERIOD_ID,
    };
    props.getResults("amlquestionnaireresults/view", data);
    props.storeReference(props.dataRef[4]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    props.storeQuestionnaireResult();
  };

  // console.log("QUESTIONNAIRE_RESULT_PROPS: ", props);

  return (
    <div>
      <div className={styles.title}>ЭРСДЭЛИЙН ҮНЭЛГЭЭНД ХАРИУЛСАН БАЙДАЛ</div>

      {/* Толгой хүснэгт */}
      <table
        border={0}
        cellPadding={3}
        cellSpacing={10}
        className={styles.table1}
        width="80%"
      >
        <tr>
          <td align="right" width="50%">
            <strong>Байгууллагын нэр: </strong>
          </td>
          <td align="left" width="50%">
            {props.questionnaireResult?.USER.NAME}
          </td>
        </tr>
        <tr>
          <td align="right" width="50%">
            <strong>Регистрийн дугаар: </strong>
          </td>
          <td align="left" width="50%">
            {props.questionnaireResult?.USER.REGISTER}
          </td>
        </tr>
        <tr>
          <td align="right" width="50%">
            <strong>Имэйл хаяг: </strong>
          </td>
          <td align="left" width="50%">
            {props.questionnaireResult?.USER.EMAIL}
          </td>
        </tr>
        <tr>
          <td align="right" width="50%">
            <strong>Салбар: </strong>
          </td>
          <td align="left" width="50%">
            {
              props.referencesAction?.orgtypes.filter(
                (r) => r.ID === props.questionnaireResult?.USER.ORGTYPE_ID
              )[0]?.DESCRIPTION
            }
          </td>
        </tr>
        <tr>
          <td align="right" width="50%">
            <strong>Үнэлгээний хугацаа: </strong>
          </td>
          <td align="left" width="50%">
            {
              props.periods?.filter(
                (period) => period.ID === props.questionnaireResult?.PERIOD_ID
              )[0]?.STARTDATE
            }{" "}
            -{" "}
            {
              props.periods?.filter(
                (period) => period.ID === props.questionnaireResult?.PERIOD_ID
              )[0]?.ENDDATE
            }
          </td>
        </tr>
        <tr>
          <td align="right" width="50%">
            <strong>Баталгаажсан эсэх: </strong>
          </td>
          <td align="left" width="50%">
            {props.resultDatas?.result4[0].IS_APPROVED}
          </td>
        </tr>
        <tr>
          <td colSpan="2" align="center" valign="bottom" height="30px">
            <span className={styles.backBtn} onClick={handleBack}>
              Буцах
            </span>
          </td>
        </tr>
      </table>

      {/* Асуулгын хариуны хүснэгт */}
      <table
        border={1}
        cellPadding={3}
        cellSpacing={0}
        className={styles.table2}
        width="100%"
      >
        <thead>
          <td className={styles.question} width="50%">
            &nbsp;&nbsp;Асуулт
          </td>
          <td width="45%">&nbsp;&nbsp;Хариулт</td>
          <td align="center" width="5%">
            Оноо
          </td>
        </thead>
        <tbody>
          {props.resultDatas?.result3.map((step, index) => {
            return (
              <>
                <tr key={index}>
                  <td colSpan={3} className={styles.mainclass}>
                    {step.NAME}
                  </td>
                </tr>
                {props.resultDatas?.result1
                  .filter((data) => data.MAINCLASS_ID === step.ID)
                  .map((data, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td className={styles.leftintent}>{data.QUESTION}</td>
                          <td className={styles.leftintent}>
                            {data.ANSWER_TYPE_ID === 2
                              ? data.SCORE
                              : props.resultDatas?.result2.filter(
                                  (r) =>
                                    r.PARENT_ID === data.QUESTION_ID &&
                                    Number(data.SCORE) === Number(r.SCORE)
                                )[0]?.NAME}
                          </td>
                          {data.ANSWER_TYPE_ID === 1 ? (
                            <td align="center">{data.SCORE}</td>
                          ) : (
                            <td>&nbsp;</td>
                          )}
                        </tr>
                      </Fragment>
                    );
                  })}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    resultDatas: state.DataReducer.resultDatas,
    dataRef: state.MetaDataReducer.dataRef,
    referencesAction: state.LocalReducer.referencesAction,
    questionnaireResult: state.LocalReducer.questionnaireResult,
    periods: state.DataReducer.periods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeReference: (reference) =>
      dispatch(LocalAction.storeReference(reference)),
    getResults: (api_name, data) =>
      dispatch(DataAction.getResults(api_name, data)),
    storeQuestionnaireResult: (data) =>
      dispatch(LocalAction.storeQuestionnaireResult(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireResult);
