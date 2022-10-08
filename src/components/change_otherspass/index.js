import React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

function ChangeOthersPass(props) {
  // console.log("OTHER_PASS: ", props);
  return (
    <div className={styles.container}>
      <p className={styles.user}>
        Хэрэглэгч: &nbsp;&nbsp;&nbsp;
        {props.menu?.id === 1
          ? props.user?.L_NAME[0] +
            "." +
            props.user?.F_NAME +
            " (" +
            props.user?.POSITION +
            ")"
          : props.menu?.id === 4
          ? props.user?.NAME + " (" + props.user?.REGISTER + ")"
          : null}
      </p>
      <p className={styles.label}>Шинэ нууц үг:</p>
      <input
        type="password"
        name="newpass"
        required
        onChange={(event) => props.handleChangeEdit(event, props.user.ID)}
      />
      <p className={styles.label}>Шинэ нууц үгийг баталгаажуулах:</p>
      <input
        type="password"
        name="confirmpass"
        required
        onChange={(event) => props.handleChangeEdit(event, props.user.ID)}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
  };
};

export default connect(mapStateToProps, null)(ChangeOthersPass);
