import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

function UserOrg(props) {
  const sector = localStorage.getItem("sector");
  const sector_desc = localStorage.getItem("sector_desc");
  const orgName = localStorage.getItem("name");
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(1);
  const history = useHistory();
  const pageRef = React.createRef();
  let tempAnswers = [];
  const maxStep = 4;
  let today = new Date(),
    date =
      today.getFullYear() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getDate();

  useEffect(() => {
    props.getDatasByStatus(props.dataRef[10], 1);
    props.questionnaireChecking(
      props.dataRef[10].api_name,
      localStorage.getItem("userId")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishQuestionnaire = () => {
    let validation = [];
    const tempArray = props.datas?.filter(
      (d) => d.MAINCLASS_ID === step && d.IS_QUESTION === 1 && d.IS_MANDAT === 1
    );

    for (let i = 0; i < tempArray.length; i++) {
      if (
        tempArray[i].SECTOR.includes(0) ||
        tempArray[i].SECTOR.includes(Number(sector))
      ) {
        // console.log(tempArray[i]);
        answers[tempArray[i].ID] === undefined ||
        answers[tempArray[i].ID] === ""
          ? validation.push(false)
          : validation.push(true);
      }
    }

    // console.log(validation.includes(false));

    if (validation.includes(false) === true)
      alert(
        "Хариулаагүй асуулт байна. Улаан одтой асуултад заавал хариулна уу..."
      );
    else {
      props.saveResults(answers, props.period.ID);
      alert("Асуулгын хариу илгээгдлээ. Танд баярлалаа.");
      <Redirect to={window.location.origin} />;
      history.push(window.location.origin);
      document.location = window.location.origin;
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    pageRef.current.scrollTo(0, 0);
  };

  const nextStep = () => {
    let validation = [];
    const tempArray = props.datas?.filter(
      (d) => d.MAINCLASS_ID === step && d.IS_QUESTION === 1 && d.IS_MANDAT === 1
    );

    // console.log(tempArray);
    // console.log(answers);

    for (let i = 0; i < tempArray.length; i++) {
      if (
        tempArray[i].SECTOR.includes(0) ||
        tempArray[i].SECTOR.includes(Number(sector))
      ) {
        // console.log(tempArray[i]);
        answers[tempArray[i].ID] === undefined ||
        answers[tempArray[i].ID] === ""
          ? validation.push(false)
          : validation.push(true);
      }
    }

    // console.log(validation.includes(false));

    if (validation.includes(false) === true) {
      alert(
        "Хариулаагүй асуулт байна. Улаан одтой асуултад заавал хариулна уу..."
      );
    } else {
      setStep(step + 1);
      pageRef.current.scrollTo(0, 0);
    }
  };

  const handleChangeQuestionnaire = (event) => {
    // event.preventDefault();

    const { name, value } = event.target;

    tempAnswers = answers;
    tempAnswers[Number(name)] = value;
    setAnswers(tempAnswers);
  };

  // console.log("USERORG_PROPS: ", props);
  // console.log("USERORG_STEPS: ", step);
  // console.log("SECTOR: ", typeof sector);
  // console.log("ANSWERS: ", answers);

  return (
    <div className={styles.qContainer} ref={pageRef}>
      {Date.parse(date) >= Date.parse(props.period?.STARTDATE) &&
        Date.parse(date) <= Date.parse(props.period?.ENDDATE) &&
        props.qChecking === false && (
          <>
            <div>&nbsp;&nbsp;&nbsp;</div> {step}/{maxStep}
          </>
        )}
      <div className={styles.organization}>
        {sector_desc}: &nbsp;&nbsp;&nbsp;<strong>{orgName}</strong>
        <br />
        <br />
        Асуулгын хугацаа: &nbsp;&nbsp;&nbsp;
        <strong>
          {props.period?.STARTDATE} - {props.period?.ENDDATE}
        </strong>
      </div>
      {Date.parse(date) >= Date.parse(props.period?.STARTDATE) &&
      Date.parse(date) <= Date.parse(props.period?.ENDDATE) ? (
        props.qChecking === false ? (
          <form>
            {props.datas?.map((question, index) => {
              return (
                question?.MAINCLASS_ID === step &&
                question?.PARENT_ID === 0 &&
                question?.IS_QUESTION === 1 &&
                (question?.SECTOR[0] === 0 ||
                  question?.SECTOR.includes(Number(sector)) === true) && (
                  <Fragment key={index}>
                    <div className={styles.questions}>
                      {question?.NAME}
                      {question?.IS_MANDAT === 1 && (
                        <span className={styles.mandatory}>*</span>
                      )}
                    </div>
                    {question?.ANSWER_TYPE_ID === 1 ? (
                      props.datas?.map((answer, index) => {
                        return (
                          answer?.MAINCLASS_ID === step &&
                          answer?.IS_QUESTION === 0 &&
                          question?.ID === answer?.PARENT_ID && (
                            <Fragment key={index}>
                              {Number(answers[Number(answer.PARENT_ID)]) ===
                              answer.SCORE ? (
                                <>
                                  <input
                                    type="radio"
                                    name={answer.PARENT_ID}
                                    className={styles.inputRadio}
                                    value={answer.SCORE}
                                    onChange={handleChangeQuestionnaire}
                                    checked
                                  />
                                </>
                              ) : (
                                <input
                                  type="radio"
                                  name={answer.PARENT_ID}
                                  className={styles.inputRadio}
                                  value={Number(answer.SCORE)}
                                  onChange={handleChangeQuestionnaire}
                                />
                              )}

                              <span className={styles.inputRadio}>
                                {answer.NAME}
                              </span>
                              <br />
                            </Fragment>
                          )
                        );
                      })
                    ) : question.ANSWER_TYPE_ID === 2 ? (
                      <input
                        type="text"
                        name={question.ID}
                        className={styles.inputText}
                        onChange={handleChangeQuestionnaire}
                        value={answers[question.ID]}
                        required="required"
                      />
                    ) : null}
                  </Fragment>
                )
              );
            })}
            <div className={styles.nextprev}>
              {step !== 1 && <div onClick={prevStep}>Өмнөх</div>}
              {step < maxStep && <div onClick={nextStep}>Дараах</div>}
              {step === maxStep && (
                <div onClick={finishQuestionnaire}>Илгээх</div>
              )}
            </div>
          </form>
        ) : (
          <div className={styles.error}>Эрсдэлийн асуулгад оролцсон байна.</div>
        )
      ) : (
        <div className={styles.error}>
          Эрсдэлийн асуулгад оролцох хугацаа болоогүй байна. Нүүр хуудаснаас
          хугацааг харна уу.
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    period: state.DataReducer.period,
    datas: state.DataReducer.datas,
    dataRef: state.MetaDataReducer.dataRef,
    qChecking: state.DataReducer.questionnaireChecking,
    localPeriod: state.LocalReducer.period,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDatasByStatus: (reference, status) =>
      dispatch(DataAction.getDatasByStatus(reference, status)),
    saveResults: (answers, period_id) =>
      dispatch(DataAction.saveResults(answers, period_id)),
    questionnaireChecking: (api_name, user_id) =>
      dispatch(DataAction.questionnaireChecking(api_name, user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrg);
