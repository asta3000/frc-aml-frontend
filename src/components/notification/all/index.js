import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../../reduxes/actions/Data";

import styles from "./styles.module.css";

function AllNotification(props) {
  const [allDatas, setAllDatas] = useState({
    all_logs: props.notifications?.all_notifications,
    read_logs: props.notifications?.read_notifications,
  });

  useEffect(() => {
    props.getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllDatas({
      ...allDatas,
      all_logs: props.notifications?.all_notifications,
      read_logs: props.notifications?.read_notifications,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.notifications]);

  useEffect(() => {
    let tempArray = allDatas.all_logs;
    let tempOneArray = [];
    let index;

    // console.log("INDEX: ", index); //undefined

    for (let i = 0; i < allDatas.read_logs?.length; i++) {
      tempOneArray.push(
        allDatas.all_logs?.filter(
          (e) =>
            e.ID === allDatas.read_logs[i].NOTIFICATION_ID &&
            (e.FOR_WHOM === "0" ||
              e.FOR_WHOM === localStorage.getItem("role") ||
              e.FOR_WHOM === localStorage.getItem("userId"))
        )[0]
      );

      // console.log("TEMP_ONE_ARRAY: ", tempOneArray);

      index = tempArray.findIndex((el) => el.ID === tempOneArray[0]?.ID);
      // console.log("INDEX: ", index); //no undefined
      if (index >= 0) {
        tempArray.splice(index, 1);
      }

      tempOneArray = [];
    }

    // console.log("AFTER: ", tempArray); //Unread notifications
    props.saveNotifications(tempArray);
    tempArray = [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.all_logs]);

  // console.log("ALL_NOTIFICATION_PROPS: ", props);
  // console.log("ALL_NOTIFICATION_DATAS: ", allDatas);

  return (
    <div>
      <div className={styles.title}>Мэдэгдэл</div>
      <table
        border={0}
        cellPadding={5}
        cellSpacing={0}
        width="100%"
        className={styles.table}
      >
        <thead>
          <tr align="center" className={styles.tableHead}>
            <th>Огноо</th>
            <th>Мэдэгдэл</th>
          </tr>
        </thead>
        <tbody>
          {allDatas.all_logs
            ?.filter(
              (d) =>
                d.FOR_WHOM === "0" ||
                d.FOR_WHOM === localStorage.getItem("role") ||
                d.FOR_WHOM === localStorage.getItem("userId")
            )
            ?.map((data, index) => {
              return allDatas.read_logs?.filter(
                (s) => s.NOTIFICATION_ID === data.ID
              ).length === 0 ? (
                <tr key={index} align="center" className={styles.tableBody}>
                  <th>{data.C_DATE}</th>
                  <th>{data.CONTENT}</th>
                </tr>
              ) : (
                <tr key={index} align="center" className={styles.tableBody}>
                  <td>{data.C_DATE}</td>
                  <td>{data.CONTENT}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.DataReducer.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: () => dispatch(DataAction.getNotifications()),
    saveNotifications: (data) => dispatch(DataAction.saveNotifications(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllNotification);
