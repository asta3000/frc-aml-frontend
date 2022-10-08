import React from "react";

import TrackAddRow from "../tracklist/addrow";
import TrackViewRow from "../tracklist/viewrow";
import TrackEditRow from "../tracklist/editrow";
import TrackReason from "../tracklist/reason";

import styles from "./styles.module.css";

function BigModal(props) {
  // console.log("PROPS_BIG_MODAL: ", props);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.title}>
          {props.action === "add"
            ? "Шинээр бүртгэх"
            : props.action === "view"
            ? "Дэлгэрэнгүй мэдээлэл"
            : props.action === "edit"
            ? "Мэдээлэл засах"
            : props.action === "reason" && "Зөрчлийн хариу оруулах"}
        </div>
        <div className={styles.body}>
          {props.action === "add" ? (
            <TrackAddRow
              refer={props.refer}
              handleChangeAdd={props.handleChangeAdd}
              addData={props.addData}
            />
          ) : props.action === "view" ? (
            <TrackViewRow data={props.data} refer={props.refer} />
          ) : props.action === "edit" ? (
            <TrackEditRow
              editData={props.editData}
              refer={props.refer}
              handleChangeEdit={props.handleChangeEdit}
            />
          ) : (
            props.action === "reason" && (
              <TrackReason
                data={props.data}
                refer={props.refer}
                handleChangeReason={props.handleChangeReason}
                reason={props.reason}
              />
            )
          )}
        </div>
        <div className={styles.buttons}>
          <div className={styles.buttons}>
            {props.action !== "view" && (
              <div onClick={props.handleClickSave} className={styles.saveBtn}>
                Хадгалах
              </div>
            )}
            <div onClick={props.handleCloseModal} className={styles.closeBtn}>
              Хаах
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigModal;
