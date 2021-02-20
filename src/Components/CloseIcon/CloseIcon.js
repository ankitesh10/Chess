import React from "react";
import { ReactComponent as Icon } from "../../assets/close-outline.svg";
import styles from "./CloseIcon.module.css";

const CloseIcon = () => {
  return <Icon className={styles.icon} />;
};

export default CloseIcon;
