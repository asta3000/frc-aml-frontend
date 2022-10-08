import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Mapping from "../mapping";

import * as DataAction from "../../reduxes/actions/Data";

import styles from "./styles.module.css";

const ProfileList = (props) => {
  const [allDatas, setAllDatas] = useState({
    profile: 0,
    searchData: null,
  });

  useEffect(() => {
    props.getDatas(props.dataRef[allDatas.profile]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDatas.profile]);

  useEffect(() => {
    setAllDatas({
      ...allDatas,
      mainDatas: props.datas,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.datas]);

  const profileChange = (event) => {
    event.preventDefault();
    setAllDatas({
      ...allDatas,
      profile: event.target.value,
    });
  };

  const handleChangeSearch = (event) => {
    event.preventDefault();
    setAllDatas({
      ...allDatas,
      searchData: event.target.value,
    });
  };

  //   console.log("ALLDATAS: ", allDatas);
  //   console.log("PROFILELIST_PROPS: ", props);

  return (
    <div className={styles.viewlist}>
      <Mapping />
      <div className={styles.title}>{props.menu.name}</div>
      <div className={styles.profile_and_search}>
        <select
          name="profile"
          className={styles.profile}
          onChange={profileChange}
        >
          <option value="0" className={styles.profile_option}>
            Сонгоно уу...
          </option>
          <option value="22" className={styles.profile_option}>
            Компанийн нэмэлт мэдээлэл
          </option>
          <option value="19" className={styles.profile_option}>
            Гүйцэтгэх захирал
          </option>
          <option value="20" className={styles.profile_option}>
            Дотоод хяналтын хөтөлбөр
          </option>
          <option value="21" className={styles.profile_option}>
            Тусгай зөвшөөрөл
          </option>
          <option value="16" className={styles.profile_option}>
            Комплайнсын ажилтан
          </option>
        </select>
        <input
          type="search"
          placeholder="Хайх утгаа оруулна уу..."
          name="searchData"
          onChange={handleChangeSearch}
          className={styles.search}
        />
      </div>
      <table
        border={0}
        cellPadding={10}
        cellSpacing={0}
        className={styles.tablelist}
      >
        <thead>
          {Number(allDatas.profile) !== 0 && (
            <tr className={styles.tablemetadata}>
              <th>Регистрийн дугаар</th>
              <th>Байгууллагын нэр</th>
              {props.metadatas[allDatas.profile]?.map((metadata, index) => {
                return (
                  <th key={index} align={metadata[2]} width={metadata[3]}>
                    {metadata[1]}
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        <tbody>
          {allDatas.mainDatas?.length === 0 ? (
            <tr>
              <td align="center" height="50px" valign="middle" colSpan={10}>
                Өгөгдөл олдсонгүй.
              </td>
            </tr>
          ) : (
            allDatas.mainDatas
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
                // console.log(data);
                return (
                  <tr key={index} className={styles.tabledata}>
                    {Number(allDatas.profile) !== 0 && (
                      <>
                        <td align="center" width="8%">
                          {data.REGISTER}
                        </td>
                        <td align="center" width="8%">
                          {data.C_NAME}
                        </td>
                      </>
                    )}
                    {props.metadatas[allDatas.profile]?.map(
                      (metadata, index) => {
                        let value;
                        metadata[0] === "STATUS"
                          ? Number(data[metadata[0]]) === 1
                            ? (value = "Идэвхтэй")
                            : (value = "Идэвхгүй")
                          : (value = data[metadata[0]]);

                        return (
                          <td
                            key={index}
                            align={metadata[2]}
                            width={metadata[3]}
                          >
                            {value}
                          </td>
                        );
                      }
                    )}
                  </tr>
                );
              })
          )}
        </tbody>
      </table>
      <p className={styles.footer}>
        <strong>Нийт: </strong>
        {allDatas.mainDatas?.length}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  menu: state.LocalReducer.menu,
  datas: state.DataReducer.datas,
  dataRef: state.MetaDataReducer.dataRef,
  metadatas: state.MetaDataReducer.metadatas,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getDatas: (reference) => dispatch(DataAction.getDatas(reference)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
