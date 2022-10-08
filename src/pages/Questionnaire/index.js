import React from "react";
import { connect } from "react-redux";

import UserOrg from "../../components/questionnaire/userorg";
import UserAdm from "../../components/questionnaire/useradm";
import QuestionnaireResult from "../../components/questionnaire/result";

import styles from "./styles.module.css";

function Questionnaire(props) {
  const role = localStorage.getItem("role");

  // console.log("QUESTIONNAIRE_PROPS: ", props);
  return (
    <div className={styles.qContainer}>
      <div className={styles.title}>{props.module.name}</div>
      {props.questionnaireResult === undefined ||
      props.questionnaireResult === null ? (
        role === "USERORG" ? (
          <UserOrg />
        ) : role === "USERADM" ? (
          <UserAdm />
        ) : null // Эрх шалгалт
      ) : (
        <QuestionnaireResult />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    module: state.LocalReducer.module,
    questionnaireResult: state.LocalReducer.questionnaireResult,
  };
};

export default connect(mapStateToProps, null)(Questionnaire);
