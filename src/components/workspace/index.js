import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import ChangeSelfPass from "../change_selfpass";
import Menu from "../menu";
import Home from "../home";
import ProfileList from "../profilelist";
import TableList from "../tablelist";
import CollapseList from "../collapselist";
import Questionnaire from "../../pages/Questionnaire";
import Blacklist from "../../pages/Blacklist";
import ViolationsList from "../../pages/Violations";
import Reports from "../../pages/Reports";
import Notification from "../../pages/Notification";
import MatrixList from "../matrixlist";
import NoList from "../nolist";
import ProfileAssessment from "../reports/profile";
import Logs from "../log";

import styles from "./styles.module.css";

function WorkSpace(props) {
  const location = useLocation();

  // console.log("MENU_ID: ", props.menu.id);
  // console.log("MODULE: ", props.module);
  // console.log(window.location.origin);

  return (
    <div className={styles.workspace}>
      {
        props.module.id === null ? (
          window.location.pathname === "/changepassword" ? (
            <ChangeSelfPass name="Өөрийн нууц үгийг өөрчлөх" />
          ) : (
            <Home />
          )
        ) : props.module.id === 1 ||
          props.module.id === 2 ||
          props.module.id === 5 ? (
          props.menu.id === null ? (
            <Menu />
          ) : props.menu.id === 8 || props.menu.id === 10 ? (
            <CollapseList />
          ) : props.menu.id === 11 ? (
            <MatrixList />
          ) : props.menu.id === 14 ? (
            <NoList />
          ) : props.menu.id === 16 ? (
            <ProfileList />
          ) : props.menu.id === 17 ? (
            <ProfileAssessment />
          ) : props.menu.id === 18 ? (
            <Logs />
          ) : (
            <TableList />
          )
        ) : props.module.id === 3 ? (
          <Questionnaire />
        ) : props.module.id === 7 ? (
          <Blacklist />
        ) : props.module.id === 4 ? (
          <ViolationsList />
        ) : props.module.id === 6 ? (
          <Reports />
        ) : props.module.id === 8 ? (
          <Notification />
        ) : null //module.id -г ашиглаж өөр компонентыг дуудах null
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    action: state.LocalReducer.action,
    menu: state.LocalReducer.menu,
    module: state.LocalReducer.module,
  };
};

export default connect(mapStateToProps, null)(WorkSpace);
