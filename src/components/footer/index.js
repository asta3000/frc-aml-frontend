import React from "react";

import styles from "./styles.module.css";

function FooterBar() {
  return (
    <div className={styles.footer}>
      Захиалагч: Санхүүгийн зохицуулах хороо&nbsp;&nbsp;&nbsp; Гүйцэтгэгч: Эм Ди
      Эс Коммуникэшн&nbsp;&nbsp;&nbsp; &copy; Бүх эрхийг Санхүүгийн зохицуулах
      хороо эзэмшинэ.&nbsp;&nbsp;&nbsp; 2021 - {new Date().getFullYear()}{" "}
      он.&nbsp;&nbsp;&nbsp; Хувилбар: 1.0
    </div>
  );
}

export default FooterBar;
