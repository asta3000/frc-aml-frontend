import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Mapping from "../mapping";
import AddButton from "../addbutton";
import AddRow from "./addrow";
import ViewRow from "./viewrow";
import EditRow from "./editrow";
import * as DataAction from "../../reduxes/actions/Data";
import * as LocalAction from "../../reduxes/actions/Local";

import styles from "./styles.module.css";

function MatrixList(props) {
  const [allDatas, setAllDatas] = useState({
    sector: 0,
    clicked: {
      ID: null,
      clicked: null,
    },
    addData: {},
    editData: {},
    mainDatas: props.datas,
  });

  useEffect(() => {
    props.storeReference(props.dataRef[props.menu?.id]);
    props.getDatas(props.dataRef[props.menu?.id]);
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
    console.log("END IRSEN");
    props.getDatas(props.dataRef[props.menu?.id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.mainDatas?.length, allDatas.sector]);

  const handleSectorChange = (event) => {
    event.preventDefault();
    setAllDatas({
      ...allDatas,
      sector: event.target.value,
    });
  };

  const handleClickAction = (event, data, action) => {
    event.preventDefault();

    action === "edit"
      ? setAllDatas({
          ...allDatas,
          clicked: {
            ID: data.ID,
            clicked: action,
          },
          editData: {
            ...allDatas.editData,
            ...data,
            M_BY: localStorage.getItem("userId"),
          },
        })
      : setAllDatas({
          ...allDatas,
          clicked: {
            ID: data.ID,
            clicked: action,
          },
        });
  };

  const handleClickCancel = (event) => {
    event.preventDefault();

    setAllDatas({
      ...allDatas,
      clicked: {
        ID: null,
        clicked: null,
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

  const handleClickEdit = (event) => {
    event.preventDefault();

    const index = allDatas.mainDatas.findIndex(
      (data) => data.ID === allDatas.editData.ID
    );

    props.editDatas(
      props.dataRef[props.menu.id].api_name,
      allDatas.editData,
      index
    );

    let editedMainData = allDatas.mainDatas;
    editedMainData[index] = allDatas.editData;
    editedMainData[index].SECTOR_ID = Number(editedMainData[index].SECTOR_ID);
    editedMainData[index].SCORE = Number(editedMainData[index].SCORE);
    editedMainData[index].QUESTION_ID = Number(
      editedMainData[index].QUESTION_ID
    );

    // console.log(editedMainData);
    // console.log(editedMainData[index]);

    setAllDatas({
      ...allDatas,
      clicked: {
        ID: null,
        clicked: null,
      },
      editData: {},
      mainDatas: editedMainData,
    });
  };

  const handleClickAdd = (event) => {
    event.preventDefault();

    setAllDatas({
      ...allDatas,
      clicked: {
        ID: null,
        clicked: "add",
      },
    });
  };

  const handleChangeAdd = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setAllDatas({
      ...allDatas,
      addData: {
        ...allDatas.addData,
        [name]: value,
        C_BY: localStorage.getItem("userId"),
      },
    });
  };

  const handleClickSave = (event) => {
    event.preventDefault();
    props.saveDatas(props.dataRef[props.menu.id].api_name, allDatas.addData);

    setAllDatas({
      ...allDatas,
      clicked: {
        ID: null,
        clicked: null,
      },
      // addData: {},
      // editData: {},
      mainDatas: [...allDatas.mainDatas, allDatas.addData],
    });
  };

  // console.log("MATRIX_PROPS: ", props);
  // console.log("MATRIX_ALLDATAS: ", allDatas);

  return (
    <div className={styles.matrixlist}>
      <Mapping />
      <div className={styles.title}>{props.menu?.name}</div>
      <AddButton handleClickAdd={handleClickAdd} />
      <form onChange={(event) => handleSectorChange(event)}>
        <p className={styles.formP}>
          Салбар:
          <select className={styles.formSelect}>
            {props.references?.orgtypes?.map((reference, index) => {
              return allDatas.sector === reference.ID ? (
                <option value={reference.ID} key={index} selected>
                  {reference.DESCRIPTION}
                </option>
              ) : (
                <option value={reference.ID} key={index}>
                  {reference.DESCRIPTION}
                </option>
              );
            })}
          </select>
        </p>
      </form>
      <table
        border={0}
        cellPadding={5}
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
          {allDatas.clicked.clicked === "add" && (
            <AddRow
              handleClickCancel={handleClickCancel}
              handleChangeAdd={handleChangeAdd}
              handleClickSave={handleClickSave}
            />
          )}
          {allDatas.mainDatas?.map((data, index) => {
            return (
              <Fragment key={index}>
                {allDatas.clicked.ID === data.ID ? (
                  <EditRow
                    data={allDatas.editData}
                    key={index}
                    handleClickCancel={handleClickCancel}
                    handleChangeEdit={handleChangeEdit}
                    handleClickEdit={handleClickEdit}
                  />
                ) : Number(allDatas.sector) === 0 ? (
                  <ViewRow
                    data={data}
                    key={index}
                    handleClickAction={handleClickAction}
                  />
                ) : Number(allDatas.sector) === data.SECTOR_ID ? (
                  <ViewRow
                    data={data}
                    key={index}
                    handleClickAction={handleClickAction}
                  />
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <p className={styles.footer}>
        <strong>Нийт: </strong>
        {allDatas.mainDatas?.length}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    references: state.LocalReducer.references,
    datas: state.DataReducer.datas,
    dataRef: state.MetaDataReducer.dataRef,
    metadatas: state.MetaDataReducer.metadatas,
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

export default connect(mapStateToProps, mapDispatchToProps)(MatrixList);
