import Spin from "../Loading/Loading";
import ErrorPage from "../Error/Error";
import { Accordion, Button, Modal, Table } from "react-bootstrap";

import React, { useState, useEffect, useMemo } from "react";
import { useAsyncFn } from "react-use";
import Constants from "../assets/Constants";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

import clsx from "clsx";
import styles from "./CheckPosition.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const Demo = () => {
  const fileNameExcel = "ToolSEO_Check_Ranking_Google";
  const random = Math.random();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [keyWords, setKeyWords] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  const [nameProject, setNameProject] = useState("");
  const [name, setName] = useState("");
  const [litsProject, setLitsProject] = useState([]);

  ////?Show modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://localhost:44322/api/seo/get-project?token=" +
        localStorage.token_client,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token_client,
      },
    }).then((response) => {
      setLitsProject(response.data);
    });
  }, [show]);

  const hanleChanged = (e) => {
    setInput(e.target.value);
  };

  const hanleChangedName = (e) => {
    setNameProject(e.target.value);
  };

  const hanleForm = () => {
    if (keyWord === "" || keyWord === null) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi...",
        text: "Bạn chưa nhập từ khóa!",
      });
    } else {
      setKeyWords((prev) => prev.concat(keyWord.split("\n")));
      Swal.fire("Thành công!", "Từ khóa đã được thêm!", "success");
      setKeyWord("");
    }
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token_client,
    },
    body: JSON.stringify(keyWords),
  };

  // call API
  const [state, doFetch] = useAsyncFn(async () => {
    const response = await fetch(
      Constants.API_URL_GET_POST_POSITION + "?domain=" + input,
      requestOptions
    );
    console.log(response);

    const result = await response.json();
    console.log(result);
    return setData(result);
  }, [keyWords, input]);

  const handlCreate = () => {
    if (input === "" || input === null) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi...",
        text: "Bạn chưa nhập từ khóa!",
      });
    } else {
      axios({
        method: "post",
        url:
          "https://localhost:44322/api/seo/create-project?projectName=" +
          nameProject +
          "&domain=" +
          input +
          "&token=" +
          localStorage.token_client,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token_client,
        },
      })
        .then((response) => {
          Swal.fire("Thành công!", "Bạn đã thêm dự án!", "success");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    }
  };
  // end call API

  console.log(litsProject);
  // start render giao diện
  return (
    <div className="mt-2">
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
          <h1>Kiểm tra thứ hạng từ khóa</h1>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Thêm dự án</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex">
                  <div className="flex-grow-1 d-flex">
                    <input
                      type="text"
                      className="form-control w-25 "
                      placeholder="Tên dự án"
                      aria-label="DomainName"
                      aria-describedby="basic-addon1"
                      value={nameProject}
                      onChange={(e) => hanleChangedName(e)}
                    />
                    <input
                      type="text"
                      className="form-control w-50 ms-3"
                      placeholder="vd: http://domain.com"
                      aria-label="DomainName"
                      aria-describedby="basic-addon1"
                      value={input}
                      onChange={(e) => hanleChanged(e)}
                    />
                  </div>

                  <Button
                    className="btn btn-dark border fw-bold hoverScale"
                    onClick={handlCreate}
                  >
                    Thêm
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Modal */}
          <Button variant="dark" onClick={handleShow} className="mt-3">
            Chọn dự án
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Các dự án</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {litsProject.data !== undefined &&
                litsProject.data.map((item, index) => (
                  <div className="d-grid gap-1 mt-2" key={index}>
                    <button className="btn btn-primary" type="button">
                      {item.name}
                    </button>
                  </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary">Lưu</Button>
            </Modal.Footer>
          </Modal>
          <div className="my-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
              type="text"
            ></textarea>
          </div>
          <button
            onClick={() => doFetch()}
            className="btn btn-light border fw-bold hoverScale"
          >
            Bắt đầu kiểm tra
          </button>
          <button
            onClick={hanleForm}
            className="btn btn-dark ms-4  fw-bold hoverScale"
          >
            Thêm từ khóa
          </button>
          <Table
            className="mt-4"
            striped
            bordered
            hover
            size="sm"
            id="result-table"
          >
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Từ khóa</th>
                <th className="text-center">Vị trí</th>
                <th className="text-center">Đường link</th>
              </tr>
            </thead>
            <tbody>
              {data.data != undefined &&
                data.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.positions[0].position}</td>
                    <td>{item.positions[0].a}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className={clsx(styles.exportToExcel)}>
            <ReactHtmlTableToExcel
              className={
                data.data != undefined
                  ? "btn btn-success"
                  : "btn btn-danger disabled"
              }
              table="result-table"
              filename={fileNameExcel.concat(random)}
              sheet="sheet"
              buttonText="Export to Excel"
            />
          </div>
        </div>
      )}
    </div>
  );
};
// end start giao diện
export default Demo;
