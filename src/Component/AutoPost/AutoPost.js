import React from "react";
import clsx from "clsx";
import styles from "./AutoPost.module.css";
import "../../index.css";
export default function AutoPost() {
  return (
    <div>
      <div className={clsx(styles.autoPostBlock)}>
        <div className={clsx(styles.inputBlock)}>
          <a
            className={clsx(styles.inputLink)}
            href="https://www.w3schools.com"
          >
            <h1 className={clsx(styles.inputText)}>Đầu Vào</h1>
            <button className={clsx(styles.inputButton, "btn btn-light")}>
              Thêm
            </button>
          </a>
        </div>
      </div>
      <div className={clsx(styles.autoPostBlock)}>
        <div className={clsx(styles.outputBlock)}>
          <a
            className={clsx(styles.inputLink)}
            href="https://www.w3schools.com"
          >
            <h1 className={clsx(styles.inputText)}>Đầu Ra</h1>
            <button className={clsx(styles.inputButton, "btn btn-light")}>
              Thêm
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
