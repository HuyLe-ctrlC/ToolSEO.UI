// import React, { Component } from "react";
import React, { useEffect, useState, useRef } from "react";
import "../../index.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Constants from "../assets/Constants";
import { useAsyncFn } from "react-use";
import Spin from "../Loading/Loading";
import ErrorPage from "../Error/Error";
import clsx from "clsx";
import styles from "./SearchResult.module.css";
import { Table, Button, Card, InputGroup, Accordion } from "react-bootstrap";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";

function SearchResult() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const hanleChanged = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      doFetch();
    }
  };
  //start call API
  const [state, doFetch] = useAsyncFn(async () => {
    if (input === "" || input == null) {
      // alert("Bạn chưa nhập từ khóa");
      Swal.fire({
        icon: "error",
        title: "Có lỗi...",
        text: "Bạn chưa nhập từ khóa!",
      });
    } else {
      const response = await fetch(
        Constants.API_URL_GET_TITLE + "?title=" + input,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token_client,
          },
        }
      );

      console.log(response);

      const result = await response.json();
      console.log(result);

      return setData(result);
    }
  }, [input]);
  // end call API
  const headers = [
    { label: "Title", key: "title" },
    {
      label: "Heading 1",
      key: "body.h1",
    },
    {
      label: "Heading 2",
      key: "body.h2[0]",
      key1: "body.h2[1]",
      key2: "body.h2[2]",
      key3: "body.h2[3]",
      key4: "body.h2[4]",
      key5: "body.h2[5]",
      key6: "body.h2[6]",
      key7: "body.h2[7]",
      key8: "body.h2[8]",
      key9: "body.h2[9]",
      key10: "body.h2[10]",
    },
    {
      label: "Heading 3",
      key: "body.h3[0]",
      key1: "body.h3[1]",
      key2: "body.h3[2]",
      key3: "body.h3[3]",
      key4: "body.h3[4]",
      key5: "body.h3[5]",
      key6: "body.h3[6]",
      key7: "body.h3[7]",
      key8: "body.h3[8]",
      key9: "body.h3[9]",
      key10: "body.h3[10]",
    },
    { label: "Link", key: "a" },
  ];

  const csvReport = {
    filename: "report.csv",
    headers: headers,
    data: data.data,
  };
  //header data

  // start render giao diện
  return (
    <div>
      {state.loading ? (
        <div>
          <Spin />
        </div>
      ) : state.error ? (
        <div>
          <ErrorPage />
        </div>
      ) : (
        <div className="bgPadding mt-2 shadow-sm">
          <div className="text-black lh-lg">
            <h1>TẢI TITLE, H1, H2, H3,... CỦA 10 BÀI TOP GOOGLE</h1>
            <p className="text-black">
              ✅Giúp bạn tải dàn bài của 10 đối thủ Top Google.
            </p>
            <p className="text-black lh-lg">
              ✅Từ đó bạn có thể tạo ra cho riêng mình một dàn ý đầy đủ và tối
              ưu nhất cho việc viết content.
            </p>
            <p className="text-black lh-lg">
              ✅Ngoài ra bạn còn có thể xem được số từ, số hình ảnh trung bình
              của đối thủ từ đó đưa ra một chiến lược viết content hiệu quả.
            </p>
          </div>
          <div
            className={clsx(
              styles.searchContent,
              "d-flex justify-content-center"
            )}
          >
            <InputGroup
              size="lg"
              className={clsx(styles.searchContentKeywords, "mt-4")}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa"
                aria-label="DomainName"
                aria-describedby="basic-addon1"
                value={input}
                onChange={(e) => hanleChanged(e)}
                onKeyPress={handleKeyPress}
                required
              />
            </InputGroup>
          </div>
          <div
            className={clsx(
              styles.searchButton,
              "d-flex justify-content-center"
            )}
          >
            <button
              type="button"
              className={clsx(
                styles.searchButtonIcon,
                "btn btn-outline-warning mt-2 w-100"
              )}
              onClick={() => doFetch()}
            >
              Bắt đầu tìm kiếm
            </button>
          </div>
          {/* <div className={clsx(styles.exportToExcel)}>
            <ReactHTMLTableToExcel
              className={
                data.data != undefined
                  ? "btn btn-success"
                  : "btn btn-danger disabled"
              }
              table="result-table"
              filename="Search Result Fill"
              sheet="sheet"
              buttonText="Export to Excel"
            />
          </div> */}
          <Table
            className="mt-4 d-none"
            striped
            bordered
            hover
            size="sm"
            id="result-table"
          >
            <thead>
              <tr>
                <th className="text-center">Link</th>
                <th className="text-center">Title</th>
                <th className="text-center">Heading 2</th>
                <th className="text-center">Heading 3</th>
              </tr>
            </thead>
            <tbody>
              {data.data != undefined &&
                data.data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.a}</td>
                    <td>{item.body.h1}</td>
                    <td>{item.body.h2}</td>
                    <td>{item.body.h3}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {data.data != undefined && (
            <CSVLink
              {...csvReport}
              className={
                data.data != undefined
                  ? "btn btn-success"
                  : "btn btn-danger disabled"
              }
            >
              Export to CSV
            </CSVLink>
          )}
          {data.data != undefined &&
            data.data.map((item, index) => (
              <Accordion className="mt-2 mb-2" key={index}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {/* Dịch vụ bốc xếp Bình Dương */}
                    <Card
                      className={clsx("w-100", "shadow-sm p-3 bg-body rounded")}
                    >
                      <Card.Header as="h5" className={clsx(styles.bgHeader)}>
                        <span key={index + 1}>
                          TOP{}&nbsp;{index + 1}:&nbsp;
                        </span>
                        {item.body.h1 == "" ? "Không có tiêu đề" : item.body.h1}
                      </Card.Header>
                      <Card.Text key={index}>{item.a}</Card.Text>
                    </Card>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex">
                      <div className={clsx(styles.sliLeft)}>
                        <p className={clsx(styles.titleLeftRight)}>
                          Từ khóa SLI:
                        </p>
                        <ul className={clsx(styles.listSli)}>
                          {item.sli.map((item, index) => (
                            <li className={clsx(styles.itemSli)} key={index}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={clsx(styles.headingRight)}>
                        <p className={clsx(styles.titleLeftRight)}>
                          Tiêu đề chính:
                        </p>
                        <ul className={clsx(styles.listHeading)}>
                          {item.body.h1.map((item, index) => (
                            <li
                              className={clsx(styles.itemHeading)}
                              key={index}
                            >
                              <span
                                className="badge rounded-pill bg-light text-dark"
                                key={index + 1}
                              >
                                h1
                              </span>
                              &nbsp;{item}
                            </li>
                          ))}
                          {item.body.h2.map((item, index) => (
                            <li
                              className={clsx(styles.itemHeading)}
                              key={index}
                            >
                              <span
                                className="badge rounded-pill bg-light text-dark"
                                key={index + 1}
                              >
                                h2
                              </span>
                              &nbsp;{item}
                            </li>
                          ))}
                          {item.body.h3.map((item, index) => (
                            <li
                              className={clsx(styles.itemHeading)}
                              key={index}
                            >
                              <span
                                className="badge rounded-pill bg-light text-dark"
                                key={index + 1}
                              >
                                h3
                              </span>
                              &nbsp;{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
