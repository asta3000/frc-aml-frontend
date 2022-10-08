import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as DataAction from "../../reduxes/actions/Data";
import * as LocalAction from "../../reduxes/actions/Local";

import styles from "./styles.module.css";

function Home(props) {
  useEffect(() => {
    props.getPeriod();
    props.storePeriod(props.period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("PROPS_HOME: ", props);
  return (
    <div className={styles.home}>
      <div className={styles.period}>
        Асуулга авах хугацаа: {props.period?.STARTDATE} -{" "}
        {props.period?.ENDDATE}
      </div>
      <div className={styles.youtube}>
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/9dOJTJAGrKs?&amp;autoplay=1&amp;mute=1&amp;controls=1&amp;start=10"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className={styles.legalinfo}>
        <span>
          3.1.1."Мөнгө угаах" гэж гэмт хэрэг үйлдэж олсон хөрөнгө, мөнгө, орлого
          гэдгийг мэдсээр байж түүнийг авсан, эзэмшсэн, ашигласныг, эсхүл түүний
          хууль бус эх үүсвэрийг нь нуун далдлах, гэмт хэрэг үйлдэхэд оролцсон
          аливаа этгээдэд хуулийн хариуцлагаас зайлсхийхэд туслах зорилгоор
          өөрчилсөн, шилжүүлснийг, эсхүл түүний бодит шинж чанар, эх үүсвэр,
          байршил, захиран зарцуулах арга, эзэмшигч, эд хөрөнгийн эрхийг нуун
          далдалсныг хэлнэ.
        </span>
        <span>
          3.1.2."терроризмыг санхүүжүүлэх" гэж террорист этгээд, террорист
          үйлдэл, үйл ажиллагаанд зарцуулагдахыг мэдсээр байж шууд болон шууд
          бусаар эд хөрөнгө хуримтлуулсан, өөрчилсөн, шилжүүлсэн, зарцуулсныг
          хэлнэ.
        </span>
      </div>
      <a href="https://legalinfo.mn/mn/detail?lawId=9242" target="_blank">
        МӨНГӨ УГААХ БОЛОН ТЕРРОРИЗМЫГ САНХҮҮЖҮҮЛЭХТЭЙ ТЭМЦЭХ ТУХАЙ ХУУЛИАС
      </a>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    period: state.DataReducer.period,
    localPeriod: state.LocalReducer.period,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPeriod: () => dispatch(DataAction.getPeriod()),
    storePeriod: (period) => dispatch(LocalAction.storePeriod(period)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
