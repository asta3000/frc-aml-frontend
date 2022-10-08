import React, { useState, useEffect } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";

import * as UserAction from "../../reduxes/actions/User";
import * as ModuleAction from "../../reduxes/actions/Module";
import * as LocalAction from "../../reduxes/actions/Local";

import styles from "./styles.module.css";

const frcLogo = new URL("../../images/frc_logo_white.png", import.meta.url);

function SideBar(props) {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    props.getModules(1);
    props.GetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLogOut = () => {
    setToken(null);
    props.storeAction();
    props.ClearUser();
    localStorage.clear();
    history.push("/");
  };

  const storeAction = () => {
    props.storeModule();
    props.storeMenu();
  };

  const getMenu = (moduleId = null, moduleName = null) => {
    props.storeAction();
    props.storeMenu();
    props.storeModule(moduleId, moduleName);
  };

  // console.log("MODULE: ", module);

  return (
    <>
      {!token ? (
        <Redirect to="/login" />
      ) : (
        <div className={styles.sidebar}>
          <div className={styles.logo_details}>
            {/* LogoImage is here */}
            <img
              className={styles.logo_name}
              src={frcLogo}
              alt="Санхүүгийн зохицуулах хороо"
            />
          </div>
          {/* <div>Мэдэгдэл</div> */}
          <ul className={styles.nav_links}>
            <li>
              <Link to="/" onClick={() => getMenu(null)}>
                <span className={styles.link_name}>Үндсэн хуудас</span>
              </Link>
            </li>
            {props.modules?.map((module, index) => {
              return role === "SYSADM" && module.ID === 1 ? (
                <li key={index}>
                  <Link to="/" onClick={() => getMenu(module.ID, module.NAME)}>
                    <span className={styles.link_name}>{module.NAME}</span>
                  </Link>
                </li>
              ) : role === "USERADM" && module.ID !== 1 && module.ID !== 5 ? (
                <li key={index}>
                  <Link to="/" onClick={() => getMenu(module.ID, module.NAME)}>
                    <span className={styles.link_name}>{module.NAME}</span>
                  </Link>
                </li>
              ) : role === "USERFRC" &&
                module.ID >= 4 &&
                module.ID < 7 &&
                module.ID !== 5 ? (
                <li key={index}>
                  <Link to="/" onClick={() => getMenu(module.ID, module.NAME)}>
                    <span className={styles.link_name}>{module.NAME}</span>
                  </Link>
                </li>
              ) : role === "USERORG" &&
                ((module.ID >= 3 && module.ID < 6) || module.ID === 8) ? (
                <li key={index}>
                  <Link to="/" onClick={() => getMenu(module.ID, module.NAME)}>
                    <span className={styles.link_name}>{module.NAME}</span>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
          <div className={styles.profile_details}>
            <div className={styles.profile_name}>
              {localStorage.getItem("name")}
            </div>
            <div className={styles.divider} />
            <div className={styles.profile_info}>
              Рег.дугаар: {props.userDetail?.REGISTER}
              <br />
              Эрх: {localStorage.getItem("role")}
              <br />
              Сериал дугаар: {props.userDetail?.DS_SN}
              <br />
              Имэйл хаяг: {props.userDetail?.EMAIL}
              <br />
            </div>
            <div className={styles.divider} />
            <div className={styles.profile_action}>
              <Link
                to="/changepassword"
                className={styles.action}
                onClick={storeAction}
              >
                Нууц үг өөрчлөх
              </Link>
              <div className={styles.action} onClick={userLogOut}>
                ГАРАХ
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    modules: state.ModuleReducer.modules,
    userDetail: state.UserReducer.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ClearUser: () => dispatch(UserAction.ClearUser()),
    GetUser: () => dispatch(UserAction.GetUser()),
    getModules: (system_id) => dispatch(ModuleAction.getModules(system_id)),
    storeModule: (id, name) => dispatch(LocalAction.storeModule(id, name)),
    storeMenu: () => dispatch(LocalAction.storeMenu()),
    storeAction: (action) => dispatch(LocalAction.storeAction(action)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
