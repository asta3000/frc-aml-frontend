import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as UserAction from "../../reduxes/actions/User";

import styles from "./styles.module.css";

function Login(props) {
  const [auth, setAuth] = useState({});
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const accessByAuth = () => {
    props.LoginUser(auth.username, auth.password);
  };

  return (
    <>
      {token ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.login}>
          <div className={styles.container}>
            <p className={styles.title}>Системд нэвтрэх</p>
            <input
              type="text"
              name="username"
              placeholder="Нэвтрэх нэр"
              required
              className={styles.inputField}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Нууц үг"
              required
              className={styles.inputField}
              onChange={handleChange}
            />
            <input
              type="submit"
              name="submit"
              value="Нэвтрэх"
              className={styles.inputButton}
              onClick={accessByAuth}
            />
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.UserReducer.userLogin,
    result: state.UserReducer.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoginUser: (username, password) =>
      dispatch(UserAction.LoginUser(username, password)),
    ClearUser: () => dispatch(UserAction.ClearUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
