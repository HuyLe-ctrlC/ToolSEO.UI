import React from "react";
import clsx from "clsx";
import styles from "./SpinContent.module.css";
import { ImSpinner9 } from "react-icons/im";
import { MdDoubleArrow } from "react-icons/md";

export default function SpinContent() {
  return (
    <div className="bgPadding mt-2">
      <div className="d-flex bd-highlight mt-2">
        <div className="p-2 flex-grow-1 bd-highlight bg-primary me-2 shadow-sm p-3 mb-5 bg-body rounded">
          <div className="headerSpin">
            <div>
              <ImSpinner9 className="mb-2" />{" "}
              <span className="fs-3 fw-bold">Spin nội dung</span>
            </div>
            <hr className={clsx(styles.colorDivider)} />
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Nhập nội dung (tối đa 1200 ký tự)
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="9"
              ></textarea>
              <div className="mt-2">Số chữ: </div>
              <button type="button" className="btn btn-dark fw-bold hoverScale">
                Success
              </button>
            </div>
          </div>
        </div>
        <div className="p-2 flex-grow-1 bd-highlight bg-light ms-2 shadow-sm p-3 mb-5 bg-body rounded">
          <div className="headerSpin">
            <div>
              <MdDoubleArrow className="mb-2" />{" "}
              <span className="fs-3 fw-bold">Kết quả</span>
            </div>
            <hr className={clsx(styles.colorDivider)} />
            <div className="mb-3">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value="Disabled readonly textarea"
                aria-label="readonly textarea example"
                readonly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
