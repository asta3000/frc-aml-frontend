import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as DataAction from "../../reduxes/actions/Data";
import * as LocalAction from "../../reduxes/actions/Local";
import AddButton from "../addbutton";
import Mapping from "../mapping";
import MainViewRow from "./mainviewrow";
import SubViewRow from "./subviewrow";
import SearchRow from "./searchrow";
import Modal from "../modal";

import styles from "./styles.module.css";

function CollapseList(props) {
  const [allDatas, setAllDatas] = useState({
    expand: null,
    openModal: false,
    action: null,
    newData: {
      PARENT_ID: 0,
      MAINCLASS_ID: 0,
      SUBCLASS_ID: 0,
      ANSWER_TYPE_ID: 0,
      SCORE: 0,
      IS_ASSESS: 0,
      SECTOR: [0],
      C_BY: localStorage.getItem("userId"),
    },
    editData: {
      SECTOR: [0],
      M_BY: localStorage.getItem("userId"),
    },
    mainDatas: props.datas,
    searchData: null,
  });

  useEffect(() => {
    props.getDatas(props.dataRef[props.menu?.id]);
    props.storeReference(props.dataRef[props.menu?.id]);
    props.getClassifications(props.classRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllDatas({
      ...allDatas,
      mainDatas: props.datas,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.datas]);

  useEffect(() => {
    props.getDatas(props.dataRef[props.menu?.id]);
    props.getClassifications(props.classRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.mainDatas?.length]);

  const expander = (id) => {
    if (allDatas.expand === id) {
      return setAllDatas({
        ...allDatas,
        expand: null,
      });
    }
    setAllDatas({
      ...allDatas,
      expand: id,
    });
  };

  const handleClickAdd = () => {
    setAllDatas({
      ...allDatas,
      action: "collapseAdd",
      newData: {
        PARENT_ID: 0,
        MAINCLASS_ID: 0,
        SUBCLASS_ID: 0,
        ANSWER_TYPE_ID: 0,
        IS_ASSESS: 0,
        SCORE: 0,
        SECTOR: [0],
        C_BY: localStorage.getItem("userId"),
      },
      editData: {
        PARENT_ID: null,
        SECTOR: [0],
        M_BY: localStorage.getItem("userId"),
      },
      openModal: true,
    });
  };

  const handleClickEdit = (data) => {
    // console.log(data);
    setAllDatas({
      ...allDatas,
      action: "collapseEdit",
      newData: {
        PARENT_ID: null,
        MAINCLASS_ID: null,
        SUBCLASS_ID: null,
        SECTOR: [0],
        C_BY: localStorage.getItem("userId"),
      },
      editData: {
        ...allDatas.editData,
        ...data,
      },
      openModal: true,
    });
  };

  const handleCloseModal = () => {
    setAllDatas({
      ...allDatas,
      openModal: false,
    });
  };

  const handleClickSave = () => {
    if (allDatas.action === "collapseAdd") {
      if (allDatas.newData.PARENT_ID !== 0) {
        allDatas.newData.MAINCLASS_ID = 0;
        allDatas.newData.SUBCLASS_ID = 0;

        if (props.menu.id === 10) allDatas.newData.SECTOR = [];
      }

      props.saveDatas(
        props.dataRef[props.menu?.id]?.api_name,
        allDatas.newData
      );

      setAllDatas({
        ...allDatas,
        openModal: false,
        action: null,
        mainDatas: [...allDatas.mainDatas, allDatas.newData],
        newData: {
          PARENT_ID: 0,
          MAINCLASS_ID: 0,
          SUBCLASS_ID: 0,
          ANSWER_TYPE_ID: 0,
          SCORE: 0,
          IS_ASSESS: 0,
          SECTOR: [0],
          C_BY: localStorage.getItem("userId"),
        },
      });
    } else if (allDatas.action === "collapseEdit") {
      const index = allDatas.mainDatas?.findIndex(
        (data) => data.ID === allDatas.editData.ID
      );
      props.editDatas(
        props.dataRef[props.menu?.id]?.api_name,
        allDatas.editData,
        index
      );

      let editedMainData = allDatas.mainDatas;
      editedMainData[index] = allDatas.editData;
      editedMainData[index].STATUS = Number(editedMainData[index].STATUS);
      editedMainData[index].PARENT_ID = Number(editedMainData[index].PARENT_ID);
      editedMainData[index].MAINCLASS_ID = Number(
        editedMainData[index].MAINCLASS_ID
      );
      editedMainData[index].SUBCLASS_ID = Number(
        editedMainData[index].SUBCLASS_ID
      );

      setAllDatas({
        ...allDatas,
        openModal: false,
        action: null,
        mainDatas: editedMainData,
        newData: {
          PARENT_ID: 0,
          SCORE: 0,
          MAINCLASS_ID: 0,
          SUBCLASS_ID: 0,
          ANSWER_TYPE_ID: 0,
          IS_ASSESS: 0,
          SECTOR: [0],
          C_BY: localStorage.getItem("userId"),
        },
        editData: {
          SECTOR: [0],
          M_BY: localStorage.getItem("userId"),
        },
      });
    }
  };

  const handleChangeAdd = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setAllDatas({
      ...allDatas,
      newData: {
        MAINCLASS_ID: 0,
        SUBCLASS_ID: 0,
        ...allDatas.newData,
        [name]: value,
      },
    });
  };

  const handleChangeEdit = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setAllDatas({
      ...allDatas,
      editData: {
        ...allDatas.editData,
        [name]: value,
        M_BY: localStorage.getItem("userId"),
      },
    });
  };

  const handleChangeSearch = (event) => {
    event.preventDefault();

    setAllDatas({
      ...allDatas,
      searchData: event.target.value,
    });
  };

  // console.log("COLLAPSE_LIST_PROPS: ", props);
  // console.log("ALL_DATAS: ", allDatas);

  return (
    <>
      {props.menu?.id === null ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.viewlist}>
          <Mapping />
          <div className={styles.title}>{props.menu.name}</div>
          <div className={styles.search_and_add}>
            <AddButton handleClickAdd={handleClickAdd} />
            <SearchRow handleChangeSearch={handleChangeSearch} />
          </div>
          {allDatas.openModal === true && (
            <Modal
              handleCloseModal={handleCloseModal}
              handleClickSave={handleClickSave}
              handleChangeAdd={handleChangeAdd}
              handleChangeEdit={handleChangeEdit}
              setAllDatas={setAllDatas}
              allDatas={allDatas}
              action={allDatas.action}
            />
          )}
          <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            className={styles.tablelist}
          >
            <thead>
              <tr className={styles.tablemetadata}>
                {props.metadatas[props.menu?.id]?.map((metadata, index) => {
                  return <th key={index}>{metadata[1]}</th>;
                })}
                <th>Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {allDatas.mainDatas
                ?.filter((el) => {
                  if (allDatas.searchData !== null) {
                    return Object.values(el)
                      .join(" ")
                      .toLowerCase()
                      .includes(allDatas.searchData?.toLowerCase());
                  } else {
                    return el;
                  }
                })
                .map((data, i) => {
                  return (
                    (data.PARENT_ID === null || data.PARENT_ID === 0) && (
                      <Fragment key={i}>
                        <MainViewRow
                          data={data}
                          expander={expander}
                          expand={allDatas.expand}
                          handleClickEdit={handleClickEdit}
                        />
                        {allDatas.mainDatas?.map((subdata, j) => {
                          return (
                            subdata.PARENT_ID === data.ID &&
                            data.ID === allDatas.expand && (
                              <SubViewRow
                                key={j}
                                subdata={subdata}
                                handleClickEdit={handleClickEdit}
                              />
                            )
                          );
                        })}
                      </Fragment>
                    )
                  );
                })}
            </tbody>
          </table>
          <p className={styles.footer}>
            <strong>Нийт: </strong>
            {allDatas.mainDatas?.filter((data) => data.PARENT_ID === 0).length}
          </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    datas: state.DataReducer.datas,
    dataRef: state.MetaDataReducer.dataRef,
    metadatas: state.MetaDataReducer.metadatas,
    classRef: state.MetaDataReducer.classRef,
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
    getClassifications: (classRef) =>
      dispatch(LocalAction.getClassifications(classRef)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapseList);
