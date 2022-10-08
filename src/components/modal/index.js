import React from "react";
import { connect } from "react-redux";
import ChangeOthersPass from "../change_otherspass";
import UserPermission from "../permission";
import CollapseAddRow from "../collapselist/addrow";
import CollapseEditRow from "../collapselist/editrow";

import styles from "./styles.module.css";

function Modal(props) {
  // console.log("MODAL_PROPS: ", props);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.title}>
          {props.action === "pass"
            ? "Нууц үг өөрчлөх"
            : props.action === "perm"
            ? "Хэрэглэгчийн эрх өөрчлөх"
            : props.action === "collapseAdd"
            ? props.menu.id === 8
              ? "Ангилал нэмэх"
              : props.menu.id === 10
              ? "Асуулга нэмэх"
              : null
            : props.action === "collapseEdit"
            ? props.menu.id === 8
              ? "Ангилал засах"
              : props.menu.id === 10
              ? "Асуулга засах"
              : null
            : null}
        </div>
        <div className={styles.body}>
          {props.action === "pass" ? (
            <ChangeOthersPass
              user={props.modalData}
              handleChangeEdit={props.handleChangeEdit}
            />
          ) : props.action === "perm" ? (
            <UserPermission
              user={props.modalData}
              handleChangeEdit={props.handleChangeEdit}
            />
          ) : props.action === "collapseAdd" ? (
            <CollapseAddRow
              handleChangeAdd={props.handleChangeAdd}
              setAllDatas={props.setAllDatas}
              allDatas={props.allDatas}
            />
          ) : props.action === "collapseEdit" ? (
            <CollapseEditRow
              handleChangeEdit={props.handleChangeEdit}
              setAllDatas={props.setAllDatas}
              allDatas={props.allDatas}
            />
          ) : null}
        </div>
        <div className={styles.buttons}>
          {props.action === "perm" || props.action === "pass" ? (
            <div onClick={props.handleClickEdit} className={styles.saveBtn}>
              Хадгалах
            </div>
          ) : (
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
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
  };
};

export default connect(mapStateToProps, null)(Modal);
