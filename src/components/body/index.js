import React from "react";

// import AppBar from "../appbar";
import FooterBar from "../footer";
import WorkSpace from "../workspace";

import styles from "./styles.module.css";

function Body() {
  return (
    <div className={styles.body}>
      {/* <AppBar /> */}
      <WorkSpace />
      <FooterBar />
    </div>
  );
}

export default Body;
