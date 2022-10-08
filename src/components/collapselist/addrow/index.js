import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";

import styles from "./styles.module.css";

function CollapseAddRow(props) {
  const [sector, setSector] = useState([]);

  const handleChangeAdd = (event) => {
    for (let i = 0; i < event.length; i++) {
      setSector([...sector, event[i].ID]);
    }
  };

  useEffect(() => {
    props.setAllDatas({
      ...props.allDatas,
      newData: {
        ...props.allDatas.newData,
        SECTOR: sector,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sector]);

  // console.log("COLLAPSE_ADDROW: ", props);
  // console.log("COLLAPSE_ALLDATAS: ", props.allDatas);

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
                    onChange={props.handleChangeAdd}
                    required="required"
                  >
                    <option value={0}>Ангиллаа сонгоно уу...</option>
                    {props.classifications?.map((classification, index) => {
                      return (
                        classification.PARENT_ID === 0 && (
                          <option value={classification.ID} key={index}>
                            {classification.NAME}
                          </option>
                        )
                      );
                    })}
                  </select>
                </>
              ) : metadata[0] === "SUBCLASS_ID" ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select name={metadata[0]} onChange={props.handleChangeAdd}>
                    <option value={0}>Ангиллаа сонгоно уу...</option>
                    {props.classifications?.map((classification, index) => {
                      return (
                        classification.PARENT_ID ===
                          Number(props.allDatas.newData?.MAINCLASS_ID) && (
                          <option value={classification.ID} key={index}>
                            {classification.NAME}
                          </option>
                        )
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
            <select name="PARENT_ID" onChange={props.handleChangeAdd}>
              <option value={0}>Үндсэн ангилал</option>
              {props.classifications?.map((classification, index) => {
                return (
                  classification.PARENT_ID === 0 && (
                    <option value={classification.ID} key={index}>
                      {classification.NAME}
                    </option>
                  )
                );
              })}
            </select>
          </div>
        ) : props.menu.id === 10 ? (
          <div className={styles.form}>
            <p className={styles.label}>Асуулт</p>
            <select name="PARENT_ID" onChange={props.handleChangeAdd}>
              <option value={0}>Асуултаа сонгоно уу...</option>
              {props.allDatas.mainDatas?.map((data, index) => {
                return (
                  data.PARENT_ID === 0 &&
                  data.MAINCLASS_ID ===
                    Number(props.allDatas.newData.MAINCLASS_ID) &&
                  data.SUBCLASS_ID ===
                    Number(props.allDatas.newData.SUBCLASS_ID) &&
                  data.IS_QUESTION === 1 &&
                  data.ANSWER_TYPE_ID === 1 && (
                    <option value={data.ID} key={index}>
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
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select
                    name={metadata[0]}
                    onChange={props.handleChangeAdd}
                    required="required"
                  >
                    <option value="">Сонгоно уу...</option>
                    <option value="1">Идэвхтэй</option>
                    <option value="2">Идэвхгүй</option>
                  </select>
                </>
              ) : metadata[0] === "ANSWER_TYPE_ID" &&
                props.allDatas.newData?.PARENT_ID === 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select
                    name={metadata[0]}
                    onChange={props.handleChangeAdd}
                    required="required"
                  >
                    <option value="0">Сонгоно уу...</option>
                    {props.answerTypes?.map((answertype, index) => {
                      return (
                        <option value={answertype.ID} key={index}>
                          {answertype.NAME} - {answertype.DESCRIPTION}
                        </option>
                      );
                    })}
                  </select>
                </>
              ) : metadata[0] === "IS_ASSESS" &&
                props.allDatas.newData?.PARENT_ID === 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select
                    name={metadata[0]}
                    onChange={props.handleChangeAdd}
                    required="required"
                  >
                    <option value="">Сонгоно уу...</option>
                    <option value={1}>Тийм</option>
                    <option value={0}>Үгүй</option>
                  </select>
                </>
              ) : metadata[0] === "IS_MANDAT" &&
                props.allDatas.newData?.PARENT_ID === 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <select
                    name={metadata[0]}
                    onChange={props.handleChangeAdd}
                    required="required"
                  >
                    <option value="">Сонгоно уу...</option>
                    <option value={1}>Тийм</option>
                    <option value={0}>Үгүй</option>
                  </select>
                </>
              ) : metadata[0] === "SECTOR" &&
                Number(props.allDatas?.newData.PARENT_ID) === 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <Multiselect
                    options={props.references?.orgtypes}
                    placeholder="Салбараа сонгоно уу..."
                    displayValue="DESCRIPTION"
                    onSelect={(event) => handleChangeAdd(event)}
                  />
                  <p className={styles.memo}>Салбарыг заавал сонгоно уу!!!</p>
                </>
              ) : metadata[0] === "SCORE" &&
                props.allDatas.newData?.PARENT_ID !== 0 ? (
                <>
                  <p className={styles.label}>{metadata[1]}</p>
                  <input
                    type="number"
                    name={metadata[0]}
                    onChange={props.handleChangeAdd}
                    required="required"
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
                    onChange={props.handleChangeAdd}
                    required="required"
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

export default connect(mapStateToProps, null)(CollapseAddRow);
