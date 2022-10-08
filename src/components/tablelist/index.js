import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import fileDownload from "js-file-download";

import Mapping from "../mapping";
import AddButton from "../addbutton";
import AddableRow from "./addablerow";
import ViewableRow from "./viewablerow";
import EditableRow from "./editablerow";
import SearchableRow from "./searchablerow";
import Modal from "../modal";
import * as DataAction from "../../reduxes/actions/Data";
import * as LocalAction from "../../reduxes/actions/Local";
import * as UserAction from "../../reduxes/actions/User";

import styles from "./styles.module.css";

function TableList(props) {
  const [allDatas, setAllDatas] = useState({
    clicked: {
      ID: null,
      clicked: null,
    },
    addData: {
      DS_SN: "",
      FILENAMES: null,
      EXPIRED_DATE: null,
      C_BY: localStorage.getItem("userId"),
    },
    editData: {
      FILENAMES: null,
      EXPIRED_DATE: null,
      M_BY: localStorage.getItem("userId"),
    },
    searchData: null,
    modalData: null,
    mainDatas: null,
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
      addData: {
        DS_SN: "",
        C_BY: localStorage.getItem("userId"),
      },
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
    let FILENAMES;

    if (name === "T_NO" || name === "ORDERNO" || name === "PROGRAM") {
      FILENAMES = event.target.files[0];
    } else {
      FILENAMES = allDatas.addData.FILENAMES;
    }

    setAllDatas({
      ...allDatas,
      addData: {
        ...allDatas.addData,
        C_BY: localStorage.getItem("userId"),
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

  const handleClickSave = (event) => {
    event.preventDefault();

    props.saveDatas(props.dataRef[props.menu.id].api_name, allDatas.addData);

    allDatas.addData.ID = allDatas.mainDatas.length + 1;

    setAllDatas({
      ...allDatas,
      clicked: {
        ID: null,
        clicked: null,
      },
      mainDatas: [...allDatas.mainDatas, allDatas.addData],
      addData: {
        DS_SN: "",
        FILENAMES: null,
        EXPIRED_DATE: null,
        C_BY: localStorage.getItem("userId"),
      },
    });
  };

  const handleChangeEdit = (event, user_id = "") => {
    event.preventDefault();

    const { name, value } = event.target;
    let FILENAMES;

    if (name === "T_NO" || name === "ORDERNO" || name === "PROGRAM") {
      FILENAMES = event.target.files[0];
    } else {
      FILENAMES = allDatas.editData.FILENAMES;
    }

    setAllDatas({
      ...allDatas,
      editData: {
        ...allDatas.editData,
        user_id,
        FILENAMES,
        M_BY: localStorage.getItem("userId"),
        [name]: value,
      },
    });
  };

  const handleClickEdit = (event) => {
    event.preventDefault();

    const index = allDatas.mainDatas.findIndex(
      (data) => data.ID === allDatas.editData.ID
    );

    if (allDatas.clicked.clicked === "edit") {
      props.editDatas(
        props.dataRef[props.menu.id].api_name,
        allDatas.editData,
        index
      );

      let editedMainData = allDatas.mainDatas;
      editedMainData[index] = allDatas.editData;
      editedMainData[index].STATUS = Number(editedMainData[index].STATUS);
      editedMainData[index].DEP_ID = Number(editedMainData[index].DEP_ID);
      editedMainData[index].ORGTYPE_ID = Number(
        editedMainData[index].ORGTYPE_ID
      );

      setAllDatas({
        ...allDatas,
        clicked: {
          ID: null,
          clicked: null,
        },
        mainDatas: editedMainData,
        modalData: {},
        editData: {
          FILENAMES: null,
          EXPIRED_DATE: null,
        },
      });
    } else if (allDatas.clicked.clicked === "pass") {
      props.ChangePassword(allDatas.editData, localStorage.getItem("userId"));
      setAllDatas({
        ...allDatas,
        clicked: {
          ID: null,
          clicked: null,
        },
        modalData: {},
        editData: {
          EXPIRED_DATE: null,
        },
      });
    } else if (allDatas.clicked.clicked === "perm") {
      props.CreatePermission(allDatas.editData);
      setAllDatas({
        ...allDatas,
        clicked: {
          ID: null,
          clicked: null,
        },
        modalData: {},
        editData: {
          EXPIRED_DATE: null,
        },
      });
    }
  };

  const handleOpenModal = (data, action) => {
    setAllDatas({
      ...allDatas,
      modalData: data,
      clicked: {
        ID: null,
        clicked: action,
      },
    });
  };

  const handleCloseModal = () => {
    setAllDatas({
      ...allDatas,
      clicked: {
        ID: null,
        clicked: null,
      },
      modalData: {},
      editData: {
        M_BY: localStorage.getItem("userId"),
      },
    });
  };

  const handleDownload = (event, fileName) => {
    event.preventDefault();
    // console.log("FILE: ", fileName);

    axios({
      method: "POST",
      responseType: "blob",
      url: "http://localhost:1234/v1/download",
      data: { fileName },
    })
      .then((result) => {
        console.log("File is downloaded");
        fileDownload(result.data, fileName);
      })
      .catch((error) =>
        console.log("File is not downloaded and try again. Error is", error)
      );
  };

  useEffect(() => {
    setAllDatas({ ...allDatas, mainDatas: props.datas });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.datas]);

  useEffect(() => {
    if (props.menu?.id >= 19) {
      props.getDatas(
        props.dataRef[props.menu?.id],
        localStorage.getItem("userId")
      );
    } else {
      props.getDatas(props.dataRef[props.menu?.id]);
    }

    (props.menu?.id === 1 ||
      props.menu?.id === 4 ||
      props.menu?.id === 15 ||
      props.menu?.id === 16) &&
      props.storeReference(props.dataRef[props.menu?.id]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.menu?.id >= 19) {
      props.getDatas(
        props.dataRef[props.menu?.id],
        localStorage.getItem("userId")
      );
    } else {
      props.getDatas(props.dataRef[props.menu?.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.mainDatas?.length]);

  // console.log("TABLELIST_PROPS: ", props);
  // console.log("TABLELIST_ALLDATAS: ", allDatas);

  return (
    <>
      {props.menu.id === null ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.viewlist}>
          {(allDatas.clicked.clicked === "perm" ||
            allDatas.clicked.clicked === "pass") && (
            <Modal
              handleCloseModal={handleCloseModal}
              handleChangeEdit={handleChangeEdit}
              handleClickEdit={handleClickEdit}
              modalData={allDatas.modalData}
              action={allDatas.clicked.clicked}
            />
          )}
          <Mapping />
          <div className={styles.title}>{props.menu.name}</div>
          <div className={styles.search_and_add}>
            {props.menu.id !== 5 &&
              props.menu.id !== 6 &&
              props.menu.id !== 7 &&
              props.menu.id !== 16 && (
                <AddButton handleClickAdd={handleClickAdd} />
              )}
            <SearchableRow handleChangeSearch={handleChangeSearch} />
          </div>

          <table
            border={1}
            cellPadding={5}
            cellSpacing={0}
            className={styles.tablelist}
          >
            <thead>
              <tr className={styles.tablemetadata}>
                {props.metadatas[props.menu.id]?.map((metadata, index) => {
                  return <th key={index}>{metadata[1]}</th>;
                })}
                <th>Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {allDatas.clicked.clicked === "add" && (
                <AddableRow
                  handleClickCancel={handleClickCancel}
                  handleChangeAdd={handleChangeAdd}
                  handleClickSave={handleClickSave}
                />
              )}
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
                  return (
                    <Fragment key={index}>
                      {allDatas.clicked.ID === data.ID ? (
                        <EditableRow
                          data={allDatas.editData}
                          key={index}
                          handleClickCancel={handleClickCancel}
                          handleChangeEdit={handleChangeEdit}
                          handleClickEdit={handleClickEdit}
                        />
                      ) : (
                        <ViewableRow
                          data={data}
                          key={index}
                          handleClickAction={handleClickAction}
                          handleOpenModal={handleOpenModal}
                          handleDownload={handleDownload}
                        />
                      )}
                    </Fragment>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDatas: (reference, user_id) =>
      dispatch(DataAction.getDatas(reference, user_id)),
    storeReference: (reference) =>
      dispatch(LocalAction.storeReference(reference)),
    saveDatas: (apiname, addData) =>
      dispatch(DataAction.saveDatas(apiname, addData)),
    editDatas: (apiname, editData, index) =>
      dispatch(DataAction.editDatas(apiname, editData, index)),
    ChangePassword: (content, userId) =>
      dispatch(UserAction.ChangePassword(content, userId)),
    CreatePermission: (content) =>
      dispatch(UserAction.CreatePermission(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
