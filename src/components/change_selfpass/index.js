import React, { useState } from "react";
import { connect } from "react-redux";

import * as UserAction from "../../reduxes/actions/User";

import styles from "./styles.module.css";

function ChangeSelfPass(props) {
  const [password, setPassword] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword({
      ...password,
      [name]: value,
      m_by: localStorage.getItem("userId"),
    });
  };

  const handleSave = () => {
    props.ChangePassword(password, localStorage.getItem("userId"));
  };

  return (
    <div className={styles.changepassword}>
      {props.name}
      <div className={styles.container}>
        <p className={styles.label}>Одоогийн нууц үг:</p>
        <input
          type="password"
          name="currentpass"
          required
          className={styles.inputField}
          onChange={handleChange}
        />
        <p className={styles.label}>Шинэ нууц үг:</p>
        <input
          type="password"
          name="newpass"
          required
          className={styles.inputField}
          onChange={handleChange}
        />
        <p className={styles.label}>Шинэ нууц үгийг баталгаажуулах:</p>
        <input
          type="password"
          name="confirmpass"
          required
          className={styles.inputField}
          onChange={handleChange}
        />
        <input
          type="submit"
          name="submit"
          value="Өөрчлөх"
          className={styles.inputButton}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    result: state.UserReducer.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ChangePassword: (content, userId) =>
      dispatch(UserAction.ChangePassword(content, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeSelfPass);
