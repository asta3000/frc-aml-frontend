import React from "react";

import styles from './styles.module.css';

import AllNotification from "../../components/notification/all";

function Notification() {
  return (
    <div className={styles.container}>
      <AllNotification />
    </div>
  );
}

export default Notification;
