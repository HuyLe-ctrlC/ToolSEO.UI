import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Button, Input, notification, Table } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { useAsyncFn } from "react-use";
import "../../index.css";
import Constants from "../assets/Constants";
import Swal from "sweetalert2";

const CheckIndex = () => {
  const [connection, setConnection] = useState("");
  const [index, setIndex] = useState([]);
  // (useState < null) | (HubConnection > null);
  const [inputText, setInputText] = useState("");
  const [mess, setMess] = useState("");
  const [input, setInput] = useState("");
  const [keyWords, setKeyWords] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  let [send, setSend] = useState([]);
  const [final, setFinal] = useState([]);

  const hanleChanged = (e) => {
    setInput(e.target.value);
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
      setKeyWord("");
      Swal.fire("Thành công!", "Đường dẫn đã được thêm!", "success");
    }
  };

  //?Xử lý input
  let keys = ["url", "status"];

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(Constants.API_URL_CHAT_HUB)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("CheckIndex", (message) => {
            // console.log("url1", JSON.parse(message));

            index.push(JSON.parse(message));
            setMess(message);
          });
        })
        .catch((error) => console.log(error + "!222"));
    }
  }, [connection]);

  send = useMemo(() => {
    keyWords.map((item) => final.push({ url: item }));
    return final;
  }, [keyWords]);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token_client,
    },
    body: JSON.stringify(send),
  };
  const [state, doFetch] = useAsyncFn(async () => {
    const response = await fetch(Constants.API_URL_CHECK_INDEX, requestOptions);
  }, [keyWords]);
  console.log(">>>keywords", keyWords);
  console.log(">>>send", send);
  console.log(">>>final", final);
  return (
    <div className="container bgPadding mt-2">
      <div class="text-black lh-lg">
        <h1>Kiểm Tra Index Của Bài Viết</h1>
        <p class="text-black">
          ✅Chức năng này cho phép bạn nhật một lúc nhiều URL của bài viết vào
          để kiểm tra index.
        </p>
        <p class="text-black lh-lg">
          ✅Sau khi kiểm tra bạn có thể xác định được URL nào bị mất index để
          Submit lại URL đó.
        </p>
      </div>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
        type="text"
      ></textarea>

      <button
        onClick={() => doFetch()}
        className="btn btn-dark mt-4 fw-bold hoverScale"
      >
        Bắt đầu kiểm tra
      </button>
      <button
        onClick={hanleForm}
        className="btn btn-light ms-4 mt-4 border fw-bold hoverScale"
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
            <th className="text-center">Link</th>
            <th className="text-center">Index</th>
          </tr>
        </thead>
        <tbody>
          {index != undefined &&
            index
              .filter(
                (v, i, a) =>
                  a.findIndex((v2) =>
                    ["url", "status"].every((k) => v2[k] === v[k])
                  ) === i
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.url}</td>
                  <td>{item.status ? "Đã index" : "Chưa index"}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CheckIndex;
