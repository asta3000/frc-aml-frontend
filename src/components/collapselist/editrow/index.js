import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";

import styles from "./styles.module.css";

function CollapseEditRow(props) {
  const [sector, setSector] = useState([]);

  const handleChangeEdit = (event) => {
    for (let i = 0; i < event.length; i++) {
      setSector([...sector, event[i].ID]);
    }
  };

  useEffect(() => {
    props.setAllDatas({
      ...props.allDatas,
      editData: {
        ...props.allDatas.editData,
        SECTOR: sector,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sector]);

  // console.log("COLLAPSE_EDITROW: ", props);
  // console.log("PARENT_ID: ", props.allDatas.editData.PARENT_ID);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {props.metadatas[props.menu?.id]?.map((metadata, index) => {
          return (
            <div key={index} className={styles.form}>
              {metadata[0] === "MAINCLASS_ID" ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select
                    name={metadata[0]}
                    onChange={props.handleChangeEdit}
                    required="required"
                  >
                    <option value={0}>Ангиллаа сонгоно уу...</option>
                    {props.classifications?.map((classification, index) => {
                      return (
                        Number(classification.PARENT_ID) === 0 &&
                        (classification.ID ===
                        props.allDatas.editData[metadata[0]] ? (
                          <option
                            value={classification.ID}
                            key={index}
                            selected
                          >
                            {classification.NAME}
                          </option>
                        ) : (
                          <option value={classification.ID} key={index}>
                            {classification.NAME}
                          </option>
                        ))
                      );
                    })}
                  </select>
                </>
              ) : metadata[0] === "SUBCLASS_ID" ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select name={metadata[0]} onChange={props.handleChangeEdit}>
                    <option value={0}>Ангиллаа сонгоно уу...</option>
                    {props.classifications?.map((classification, index) => {
                      return (
                        classification.PARENT_ID ===
                          Number(props.allDatas.editData?.MAINCLASS_ID) &&
                        (classification.ID ===
                        props.allDatas.editData?.SUBCLASS_ID ? (
                          <option
                            value={classification.ID}
                            key={index}
                            selected
                          >
                            {classification.NAME}
                          </option>
                        ) : (
                          <option value={classification.ID} key={index}>
                            {classification.NAME}
                          </option>
                        ))
                      );
                    })}
                  </select>
                </>
              ) : null}
            </div>
          );
        })}
        {props.menu.id === 8 ? (
          <div className={styles.form}>
            <p className={styles.label}>Ангилал</p>
            <select name="PARENT_ID" onChange={props.handleChangeEdit}>
              <option value={0}>Үндсэн ангилал</option>
              {props.classifications?.map((classification, index) => {
                return (
                  Number(classification.PARENT_ID) === 0 &&
                  (classification.ID ===
                  Number(props.allDatas.editData?.PARENT_ID) ? (
                    <option value={classification.ID} key={index} selected>
                      {classification.NAME}
                    </option>
                  ) : (
                    <option value={classification.ID} key={index}>
                      {classification.NAME}
                    </option>
                  ))
                );
              })}
            </select>
          </div>
        ) : props.menu.id === 10 ? (
          <div className={styles.form}>
            <p className={styles.label}>Асуулт</p>
            <select name="PARENT_ID" onChange={props.handleChangeEdit}>
              <option value={0}>Асуултаа сонгоно уу...</option>
              {props.allDatas.mainDatas?.map((data, index) => {
                return data.ID !== Number(props.allDatas.editData.PARENT_ID) &&
                  data.MAINCLASS_ID ===
                    Number(props.allDatas.editData.MAINCLASS_ID) &&
                  data.SUBCLASS_ID ===
                    Number(props.allDatas.editData.SUBCLASS_ID) &&
                  data.IS_QUESTION === 1 &&
                  data.ANSWER_TYPE_ID === 1 ? (
                  <option value={data.ID} key={index}>
                    {data.MAINCLASS_ID}.{data.SUBCLASS_ID}. {data.NAME}
                  </option>
                ) : (
                  data.ID === Number(props.allDatas.editData.PARENT_ID) && (
                    <option value={data.ID} key={index} selected>
                      {data.MAINCLASS_ID}.{data.SUBCLASS_ID}. {data.NAME}
                    </option>
                  )
                );
              })}
            </select>
          </div>
        ) : null}

        {props.metadatas[props.menu?.id]?.map((metadata, index) => {
          return (
            <div key={index} className={styles.form}>
              {metadata[0] === "STATUS" ? (
                Number(props.allDatas.editData.STATUS) === 1 ? (
                  <>
                    <p className={styles.label}>{metadata[1]}</p>
                    <select
                      name={metadata[0]}
                      onChange={props.handleChangeEdit}
                      required="required"
                    >
                      <option value="">Сонгоно уу...</option>
                      <option value="1" selected>
                        Идэвхтэй
                      </option>
                      <option value="2">Идэвхгүй</option>
                    </select>
                  </>
                ) : (
                  <>
                    <p className={styles.label}>{metadata[1]}</p>
                    <select
                      name={metadata[0]}
                      onChange={props.handleChangeEdit}
                      required="required"
                    >
                      <option value="">Сонгоно уу...</option>
                      <option value="1">Идэвхтэй</option>
                      <option value="2" selected>
                        Идэвхгүй
                      </option>
                    </select>
                  </>
                )
              ) : metadata[0] === "ANSWER_TYPE_ID" &&
                Number(props.allDatas.editData?.PARENT_ID) === 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select
                    name={metadata[0]}
                    onChange={props.handleChangeEdit}
                    required="required"
                  >
                    <option value="0">Сонгоно уу...</option>
                    {props.answerTypes?.map((answertype, index) => {
                      return answertype.ID ===
                        Number(props.allDatas.editData.ANSWER_TYPE_ID) ? (
                        <option value={answertype.ID} key={index} selected>
                          {answertype.NAME} - {answertype.DESCRIPTION}
                        </option>
                      ) : (
                        <option value={answertype.ID} key={index}>
                          {answertype.NAME} - {answertype.DESCRIPTION}
                        </option>
                      );
                    })}
                  </select>
                </>
              ) : metadata[0] === "IS_ASSESS" &&
                Number(props.allDatas.editData?.PARENT_ID) === 0 ? (
                Number(props.allDatas.editData?.IS_ASSESS) === 1 ? (
                  <>
                    <p className={styles.label}>{metadata[1]}</p>
                    <select
                      name={metadata[0]}
                      onChange={props.handleChangeEdit}
                      required="required"
                    >
                      <option value="">Сонгоно уу...</option>
                      <option value={1} selected>
                        Тийм
                      </option>
                      <option value={0}>Үгүй</option>
                    </select>
                  </>
                ) : (
                  <>
                    <p className={styles.label}>{metadata[1]}</p>
                    <select
                      name={metadata[0]}
                      onChange={props.handleChangeEdit}
                      required="required"
                    >
                      <option value="">Сонгоно уу...</option>
                      <option value={1}>Тийм</option>
                      <option value={0} selected>
                        Үгүй
                      </option>
                    </select>
                  </>
                )
              ) : metadata[0] === "IS_MANDAT" &&
                Number(props.allDatas.editData?.PARENT_ID) === 0 ? (
                Number(props.allDatas.editData?.IS_MANDAT) === 1 ? (
                  <>
                    <p className={styles.label}>{metadata[1]}</p>
                    <select
                      name={metadata[0]}
                      onChange={props.handleChangeEdit}
                      required="required"
                    >
                      <option value="">Сонгоно уу...</option>
                      <option value={1} selected>
                        Тийм
                      </option>
                      <option value={0}>Үгүй</option>
                    </select>
                  </>
                ) : (
                  <>
                    <p className={styles.label}>{metadata[1]}</p>
                    <select
                      name={metadata[0]}
                      onChange={props.handleChangeEdit}
                      required="required"
                    >
                      <option value="">Сонгоно уу...</option>
                      <option value={1}>Тийм</option>
                      <option value={0} selected>
                        Үгүй
                      </option>
                    </select>
                  </>
                )
              ) : metadata[0] === "SECTOR" &&
                Number(props.allDatas?.editData?.PARENT_ID) === 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <Multiselect
                    options={props.references?.orgtypes}
                    placeholder="Салбараа сонгоно уу..."
                    displayValue="DESCRIPTION"
                    onSelect={(event) => handleChangeEdit(event)}
                  />
                  <p className={styles.memo}>Салбарыг заавал сонгоно уу!!!</p>
                </>
              ) : metadata[0] === "SCORE" &&
                Number(props.allDatas.editData?.PARENT_ID) !== 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <input
                    type="number"
                    name={metadata[0]}
                    onChange={props.handleChangeEdit}
                    required="required"
                    value={props.allDatas.editData?.SCORE}
                  />
                </>
              ) : metadata[0] === "PERCENT" ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <input
                    type="number"
                    name={metadata[0]}
                    onChange={props.handleChangeEdit}
                    required="required"
                    value={props.allDatas.editData?.PERCENT}
                  />
                </>
              ) : metadata[0] === "MAINCLASS_ID" ||
                metadata[0] === "SUBCLASS_ID" ||
                metadata[0] === "ANSWER_TYPE_ID" ||
                metadata[0] === "SECTOR" ||
                metadata[0] === "SCORE" ||
                metadata[0] === "IS_ASSESS" ? null : (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <input
                    type="text"
                    name={metadata[0]}
                    onChange={props.handleChangeEdit}
                    required="required"
                    value={props.allDatas.editData?.NAME}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menu: state.LocalReducer.menu,
    metadatas: state.MetaDataReducer.metadatas,
    references: state.LocalReducer.references,
    classifications: state.LocalReducer.classifications,
    answerTypes: state.LocalReducer.answerTypes,
  };
};

export default connect(mapStateToProps, null)(CollapseEditRow);
