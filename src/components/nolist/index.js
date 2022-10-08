import React, { useEffect } from "react";
import { connect } from "react-redux";

import Mapping from "../mapping";
import * as DataAction from "../../reduxes/actions/Data";
import * as LocalAction from "../../reduxes/actions/Local";

import styles from "./styles.module.css";

function NoList(props) {
  useEffect(() => {
    props.getDatas(props.dataRef[props.menu?.id]);
    props.storeReference(props.dataRef[props.menu?.id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("NO_LIST_PROPS: ", props);
  return (
    <div>
      <Mapping />
      <div className={styles.title}>{props.menu.name}</div>
      <table
        border={0}
        cellPadding={5}
        cellSpacing={0}
        className={styles.tablelist}
      >
        {props.metadatas[props.menu?.id]?.map((metadata, index) => {
          return (
            <tr key={index} align="left" height="50px">
              <th width="30%">{metadata[1]}</th>
              <td>
                {metadata[0] === "ORGTYPE_ID"
                  ? props.references[
                      props.dataRef[props.menu?.id]?.field_name
                    ]?.filter(
                      (reference) =>
                        reference.ID ===
                        props.datas?.filter(
                          (data) =>
                            data.ID === Number(localStorage.getItem("userId"))
                        )[0][metadata[0]]
                    )[0]?.DESCRIPTION
                  : props.datas?.filter(
                      (data) =>
                        data.ID === Number(localStorage.getItem("userId"))
                    )[0][metadata[0]]}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    datas: state.DataReducer.datas,
    dataRef: state.MetaDataReducer.dataRef,
    metadatas: state.MetaDataReducer.metadatas,
    references: state.LocalReducer.references,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDatas: (reference) => dispatch(DataAction.getDatas(reference)),
    storeReference: (reference) =>
      dispatch(LocalAction.storeReference(reference)),
    saveDatas: (apiname, addData) =>
      dispatch(DataAction.saveDatas(apiname, addData)),
    editDatas: (apiname, editData, index) =>
      dispatch(DataAction.editDatas(apiname, editData, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoList);
