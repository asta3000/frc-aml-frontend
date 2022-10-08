import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AddButton from "../addbutton";
import BigModal from "../bigmodal";
import SearchRow from "./searchrow";
import * as TrackAction from "../../reduxes/actions/Track";

import styles from "./styles.module.css";

function TrackList(props) {
  const [allDatas, setAllDatas] = useState({
    openBigModal: false,
    action: null,
    mainDatas: props.datasT,
    reason: {
      C_BY: localStorage.getItem("userId"),
    },
    addData: {
      C_BY: localStorage.getItem("userId"),
    },
    editData: {
      M_BY: localStorage.getItem("userId"),
    },
    viewData: null,
    searchData: null,
    currentPage: 1,
    postsPerPage: 10,
  });

  const handleChangePagination = (event) => {
    event.preventDefault();

    if (event.target.name === "postsPerPage") {
      setAllDatas({
        ...allDatas,
        postsPerPage: event.target.value,
        currentPage: 1,
      });
    } else if (
      event.target.name === "pageNumber" &&
      event.target.value &&
      event.target.value <= pages &&
      event.target.value >= 1
    ) {
      setAllDatas({
        ...allDatas,
        currentPage: event.target.value,
      });
    } else if (event.target.name === "next" && pages > allDatas.currentPage) {
      setAllDatas({
        ...allDatas,
        currentPage: Number(allDatas.currentPage) + 1,
      });
    } else if (event.target.name === "previous" && allDatas.currentPage > 1) {
      setAllDatas({
        ...allDatas,
        currentPage: Number(allDatas.currentPage) - 1,
      });
    }
  };

  const indexOfLastPost = allDatas.currentPage * allDatas.postsPerPage;
  const indexofFirstPost = indexOfLastPost - allDatas.postsPerPage;
  const currentPosts = allDatas.mainDatas?.slice(
    indexofFirstPost,
    indexOfLastPost
  );
  const pages = Math.ceil(allDatas.mainDatas?.length / allDatas.postsPerPage);

  useEffect(() => {
    props.getDatasT(props.mod_dataRef[props.refer]?.api_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllDatas({
      ...allDatas,
      mainDatas: props.datasT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.datasT]);

  useEffect(() => {
    // console.log("END BNA AA");
    // console.log("ALL_DATAS: ", allDatas);
    props.getDatasT(props.mod_dataRef[props.refer]?.api_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.mainDatas?.length, allDatas.action, allDatas.openBigModal]);

  const handleClickAdd = () => {
    setAllDatas({
      ...allDatas,
      openBigModal: true,
      action: "add",
    });
  };

  const handleCloseModal = () => {
    setAllDatas({
      ...allDatas,
      openBigModal: false,
      action: null,
    });
  };

  const handleClickSave = () => {
    if (allDatas.action === "add") {
      props.saveDatasT(
        props.mod_dataRef[props.refer]?.api_name,
        allDatas.addData,
        "add"
      );

      setAllDatas({
        ...allDatas,
        addData: {
          C_BY: localStorage.getItem("userId"),
        },
        mainDatas: [...allDatas.mainDatas, allDatas.addData],
        openBigModal: false,
        action: null,
      });
    } else if (allDatas.action === "edit") {
      const index = allDatas.mainDatas?.findIndex(
        (data) => data.ID === allDatas.editData.ID
      );
      // console.log("INDEX: ", index);
      props.trackEditDatas(
        props.mod_dataRef[props.refer]?.api_name,
        allDatas.editData,
        index
      );

      let editedMainData = allDatas.mainDatas;
      editedMainData[index] = allDatas.editData;
      editedMainData[index].SECTOR = Number(editedMainData[index].SECTOR);
      editedMainData[index].USER_ID = Number(editedMainData[index].USER_ID);
      editedMainData[index].TYPE_ID = Number(editedMainData[index].TYPE_ID);
      editedMainData[index].STATUS_ID = Number(editedMainData[index].STATUS_ID);

      setAllDatas({
        ...allDatas,
        editData: {
          M_BY: localStorage.getItem("userId"),
        },
        mainDatas: editedMainData,
        openBigModal: false,
        action: null,
      });
    } else if (allDatas.action === "reason") {
      props.saveDatasT(
        props.mod_dataRef[props.refer]?.api_name,
        allDatas.reason,
        "reason"
      );

      setAllDatas({
        ...allDatas,
        openBigModal: false,
        action: null,
      });
    }
  };

  const handleChangeAdd = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setAllDatas({
      ...allDatas,
      addData: {
        ...allDatas.addData,
        [name]: value,
      },
    });
  };

  const handleClickView = (data) => {
    setAllDatas({
      ...allDatas,
      action: "view",
      openBigModal: true,
      viewData: data,
    });
  };

  const handleClickEdit = (data) => {
    setAllDatas({
      ...allDatas,
      action: "edit",
      openBigModal: true,
      editData: {
        ...allDatas.editData,
        ...data,
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
      },
    });
  };

  const handleClickVerify = (data) => {
    data = {
      STATUS: 4,
      VIOLATION_ID: data.ID,
      C_BY: localStorage.getItem("userId"),
      MSG: "Баталгаажилт хийгдлээ",
      USER_ID: data.USER_ID,
    };
    props.changeTrack(props.mod_dataRef[props.refer]?.api_name, data);
  };

  const handleClickReason = (data) => {
    setAllDatas({
      ...allDatas,
      openBigModal: true,
      action: "reason",
      viewData: data,
    });
  };

  const handleChangeReason = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    let FILENAMES;

    if (name === "ATTACH") {
      FILENAMES = event.target.files[0];
    } else {
      FILENAMES = allDatas.reason.FILENAMES;
    }

    setAllDatas({
      ...allDatas,
      reason: {
        ...allDatas.reason,
        VIOLATION_ID: allDatas.viewData.ID,
        FILENAMES,
        [name]: value,
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

  // const getCurrentDate = () => {
  //   let currentDate = new Date();
  //   let currentYear = currentDate.getFullYear();
  //   let currentMonth = currentDate.getMonth() + 1;
  //   let currentDay = currentDate.getDate();
  //   let currentToday;
  //   if (currentMonth < 10) {
  //     currentToday = currentYear + "-0" + currentMonth + "-" + currentDay;
  //   } else {
  //     currentToday = currentYear + "-" + currentMonth + "-" + currentDay;
  //   }

  //   return currentToday.toString();
  // };

  // console.log("TRACKLIST_PROPS: ", props);
  // console.log("TODAY: ", typeof getCurrentDate());
  // console.log("ALL_DATAS: ", allDatas);

  return (
    <div>
      <div className={styles.search_and_add}>
        {localStorage.getItem("role") === "USERADM" && (
          <AddButton handleClickAdd={handleClickAdd} />
        )}
        <SearchRow handleChangeSearch={handleChangeSearch} />
      </div>
      {allDatas.openBigModal === true && (
        <BigModal
          handleCloseModal={handleCloseModal}
          handleClickSave={handleClickSave}
          refer={props.refer}
          action={allDatas.action}
          handleChangeAdd={handleChangeAdd}
          handleChangeEdit={handleChangeEdit}
          handleChangeReason={handleChangeReason}
          addData={allDatas.addData}
          editData={allDatas.editData}
          data={allDatas.viewData}
          reason={allDatas.reason}
        />
      )}
      <table
        border={0}
        cellPadding={5}
        cellSpacing={0}
        className={styles.tablelist}
        width="100%"
      >
        <thead>
          <tr className={styles.tablemetadata}>
            {props.mod_metadatas[props.refer]?.map((metadata, index) => {
              return (
                <th key={index} width={metadata[3]} align={metadata[2]}>
                  {metadata[1]}
                </th>
              );
            })}
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts
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
            .map((data, index) => {
              // console.log("DATA: ", data);
              return localStorage.getItem("role") === "USERORG" ? (
                Number(localStorage.getItem("userId")) === data.USER_ID && (
                  <tr className={styles.tabledata} key={index}>
                    {props.mod_metadatas[props.refer]?.map(
                      (metadata, index) => {
                        let value;
                        metadata[0] === "IS_PERIOD"
                          ? data[metadata[0]] === 2
                            ? (value = "Үгүй")
                            : (value = "Тийм")
                          : metadata[0] === "STATUS"
                          ? props.refer === "0"
                            ? data[metadata[0]] === 1
                              ? (value = "Идэвхтэй")
                              : (value = "Идэвхгүй")
                            : props.refer === "1" &&
                              (value = props.status?.filter(
                                (s) => s.ID === data.STATUS_ID
                              )[0]?.NAME)
                          : metadata[0] === "ENDDATE" ||
                            metadata[0] === "STARTDATE"
                          ? data[metadata[0]] === null
                            ? (value = "-")
                            : (value = data[metadata[0]])
                          : metadata[0] === "SECTOR"
                          ? (value = props.sector?.filter(
                              (s) => s.ID === data[metadata[0]]
                            )[0]?.DESCRIPTION)
                          : metadata[0] === "USER_ID"
                          ? (value = props.orgs?.filter(
                              (o) => o.ID === data[metadata[0]]
                            )[0]?.NAME)
                          : metadata[0] === "TYPE_ID"
                          ? (value = props.types?.filter(
                              (t) => t.ID === data[metadata[0]]
                            )[0]?.NAME)
                          : (value = data[metadata[0]]);

                        return (
                          <td
                            align={metadata[2]}
                            width={metadata[3]}
                            key={index}
                            className={
                              data.V_DAY === 0
                                ? styles.v_day0
                                : data.V_DAY === 1
                                ? styles.v_day1
                                : styles.v_day2
                            }
                          >
                            {value}
                          </td>
                        );
                      }
                    )}
                    <td align="center" className={styles.action}>
                      <span
                        className={styles.viewbtn}
                        onClick={() => handleClickView(data)}
                      >
                        Харах
                      </span>
                      {localStorage.getItem("role") === "USERADM" ? (
                        <>
                          {data.STATUS_ID === 7 || props.module.id === 7 ? (
                            <span
                              className={styles.editbtn}
                              onClick={() => handleClickEdit(data)}
                            >
                              Засах
                            </span>
                          ) : (
                            data.STATUS_ID === 3 && (
                              <span
                                className={styles.verifybtn}
                                onClick={() => handleClickVerify(data)}
                              >
                                Баталгаажуулах
                              </span>
                            )
                          )}
                        </>
                      ) : localStorage.getItem("role") === "USERORG" &&
                        (data.STATUS_ID === 2 || data.STATUS_ID === 7) ? (
                        <>
                          <span
                            className={styles.editbtn}
                            onClick={() => handleClickReason(data)}
                          >
                            Хариулах
                          </span>
                        </>
                      ) : null}
                    </td>
                  </tr>
                )
              ) : (
                <tr className={styles.tabledata} key={index}>
                  {props.mod_metadatas[props.refer]?.map((metadata, index) => {
                    let value;
                    metadata[0] === "IS_PERIOD"
                      ? data[metadata[0]] === 2
                        ? (value = "Үгүй")
                        : (value = "Тийм")
                      : metadata[0] === "STATUS"
                      ? props.refer === "0"
                        ? data[metadata[0]] === 1
                          ? (value = "Идэвхтэй")
                          : (value = "Идэвхгүй")
                        : props.refer === "1" &&
                          (value = props.status?.filter(
                            (s) => s.ID === data.STATUS_ID
                          )[0]?.NAME)
                      : metadata[0] === "ENDDATE" || metadata[0] === "STARTDATE"
                      ? data[metadata[0]] === null
                        ? (value = "-")
                        : (value = data[metadata[0]])
                      : metadata[0] === "SECTOR"
                      ? (value = props.sector?.filter(
                          (s) => s.ID === data[metadata[0]]
                        )[0]?.DESCRIPTION)
                      : metadata[0] === "USER_ID"
                      ? (value = props.orgs?.filter(
                          (o) => o.ID === data[metadata[0]]
                        )[0]?.NAME)
                      : metadata[0] === "TYPE_ID"
                      ? (value = props.types?.filter(
                          (t) => t.ID === data[metadata[0]]
                        )[0]?.NAME)
                      : (value = data[metadata[0]]);

                    return (
                      <td
                        align={metadata[2]}
                        width={metadata[3]}
                        key={index}
                        className={
                          data.V_DAY === 0
                            ? styles.v_day0
                            : data.V_DAY === 1
                            ? styles.v_day1
                            : styles.v_day2
                        }
                      >
                        {value}
                      </td>
                    );
                  })}
                  <td align="center">
                    <span
                      className={styles.viewbtn}
                      onClick={() => handleClickView(data)}
                    >
                      Харах
                    </span>
                    {localStorage.getItem("role") === "USERADM" ? (
                      <>
                        {data.STATUS_ID === 7 || props.module.id === 7 ? (
                          <span
                            className={styles.editbtn}
                            onClick={() => handleClickEdit(data)}
                          >
                            Засах
                          </span>
                        ) : (
                          data.STATUS_ID === 3 && (
                            <span
                              className={styles.verifybtn}
                              onClick={() => handleClickVerify(data)}
                            >
                              Баталгаажуулах
                            </span>
                          )
                        )}
                      </>
                    ) : localStorage.getItem("role") === "USERORG" &&
                      (data.STATUS_ID === 2 || data.STATUS_ID === 7) ? (
                      <>
                        <span
                          className={styles.editbtn}
                          onClick={() => handleClickReason(data)}
                        >
                          Хариулах
                        </span>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p className={styles.footer}>
        <strong>Нийт: </strong>
        {allDatas.mainDatas?.length}
        <strong>Нэг хуудаст: </strong>
        <select name="postsPerPage" onChange={handleChangePagination}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <strong>Хуудас: </strong>
        <input
          type="number"
          value={allDatas.currentPage}
          name="pageNumber"
          onChange={handleChangePagination}
        />
        &nbsp;/{pages}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="submit"
          name="previous"
          value="<"
          onClick={handleChangePagination}
        />
        <input
          type="submit"
          name="next"
          value=">"
          onClick={handleChangePagination}
        />
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mod_metadatas: state.MetaDataReducer.mod_metadatas,
    mod_dataRef: state.MetaDataReducer.mod_dataRef,
    module: state.LocalReducer.module,
    datasT: state.TrackReducer.datasT,
    sector: state.TrackReducer.sector,
    orgs: state.TrackReducer.orgs,
    types: state.TrackReducer.types,
    status: state.TrackReducer.status,
    v_day: state.TrackReducer.v_day,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDatasT: (api_name) => dispatch(TrackAction.getDatasT(api_name)),
    saveDatasT: (api_name, data, action) =>
      dispatch(TrackAction.saveDatasT(api_name, data, action)),
    trackEditDatas: (api_name, data, index) =>
      dispatch(TrackAction.trackEditDatas(api_name, data, index)),
    changeTrack: (api_name, data) =>
      dispatch(TrackAction.changeTrack(api_name, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
