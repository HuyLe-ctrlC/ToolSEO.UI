import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import styles from "./FreeDoc.module.css";
import clsx from "clsx";
import { GrCloudDownload } from "react-icons/gr";
import "../../index.css";
export default function FreeDoc() {
  return (
    <div className="bgPadding mt-2 shadow-sm">
      <h1>Tài liệu SEO miễn phí</h1>
      <ListGroup className="mt-4">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <a
              className={clsx(styles.freeDocLink)}
              href="https://nhanluckienvang.com/"
            >
              <img
                className="freeDocImage"
                src="https://img.icons8.com/fluency/48/000000/folder-invoices--v2.png"
              />
              <p className={clsx(styles.freeDocText)}>Bí kíp Back Link</p>
            </a>
          </div>
          <GrCloudDownload className={clsx(styles.freeDocIcon)} />
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <a
              className={clsx(styles.freeDocLink)}
              href="https://nhanluckienvang.com/"
            >
              <img
                className="freeDocImage"
                src="https://img.icons8.com/fluency/48/000000/folder-invoices--v2.png"
              />
              <p className={clsx(styles.freeDocText)}>Cổ tịch chuẩn SEO</p>
            </a>
          </div>
          <GrCloudDownload className={clsx(styles.freeDocIcon)} />
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <a
              className={clsx(styles.freeDocLink)}
              href="https://nhanluckienvang.com/"
            >
              <img
                className="freeDocImage"
                src="https://img.icons8.com/fluency/48/000000/folder-invoices--v2.png"
              />
              <p className={clsx(styles.freeDocText)}>
                Công pháp quảng cáo thượng thừa
              </p>
            </a>
          </div>
          <GrCloudDownload className={clsx(styles.freeDocIcon)} />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
