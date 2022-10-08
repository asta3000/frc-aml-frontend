import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../reduxes/actions/Data";
import * as UserAction from "../../reduxes/actions/User";

import styles from "./styles.module.css";

function UserPermission(props) {
  useEffect(() => {
    const getData = async () => {
      await props.supplyDatas(props.dataRef[5]);
      await props.GetPermission(
        props.user.ID,
        props.dataRef[props.menu.id].api_name
      );
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("USER_PERMISSION_PROPS: ", props);

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
      <p className={styles.user}>
        Одоогийн эрх: &nbsp;&nbsp;&nbsp; {props.userPerm?.DESCRIPTION} (
        {props.userPerm?.CODE})
      </p>
      <div className={styles.supplies}>
        {props.supplies?.map((supply, index) => {
          return (
            <p className={styles.supply} key={index}>
              <input
                type="radio"
                name="perm_id"
                value={supply.ID}
                onChange={(event) =>
                  props.handleChangeEdit(event, props.user.ID)
                }
              />{" "}
              {supply.DESCRIPTION} ({supply.CODE})
            </p>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataRef: state.MetaDataReducer.dataRef,
    supplies: state.DataReducer.supplies,
    menu: state.LocalReducer.menu,
    userPerm: state.UserReducer.userPerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    supplyDatas: (parameter) => dispatch(DataAction.supplyDatas(parameter)),
    GetPermission: (user_id, api_name) =>
      dispatch(UserAction.GetPermission(user_id, api_name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPermission);
