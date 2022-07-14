import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Optimal.module.scss";
import Constants from "../assets/Constants";
import { useAsyncFn } from "react-use";
import Swal from "sweetalert2";
import LoadingMini from "../assets/Loading/LoadingMini";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

export default function Optimal() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  let [dataFilter, setDataFilter] = useState([]);
  let [dataSearchFilter, setDataSearchFilter] = useState([]);
  const [textField, setTextField] = useState("");
  const [inputURL, setInputURL] = useState("");

  const handleChanged = (e) => {
    setInput(e.target.value);
  };
  const handleURLChanged = (e) => {
    setInputURL(e.target.value);
  };
  const handleChangedField = (e) => {
    setTextField(e.target.value);
  };

  const handleAnalytic = useEffect(() => {
    console.log("dataF", data);
    console.log("textField", textField);
    if (textField == "") {
      setDataFilter("");
      console.log("textField Empty");
    }
    if (
      data.totalSLI != undefined &&
      textField != "" &&
      textField != undefined
    ) {
      data.totalSLI.map((item) => {
        if (textField.includes(item.replace(/\d/gm, "").replace("()", ""))) {
          // dataFilter.push(item.replace(/\d/gm, "").replace("()", ""));
          setDataFilter((prev) =>
            prev.concat(item.replace(/\d/gm, "").replace("()", ""))
          );
        }
      });
    }
    // return dataFilter;
    // setDataFilter(dataFilter);
    return () => {
      setDataFilter("");
    };
  }, [textField]);

  console.log("dataFilter 1>>>", dataFilter);

  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token_client,
    },
  };

  //start call API
  const [state, doFetch] = useAsyncFn(async () => {
    if (input === "") {
      Swal.fire({
        icon: "error",
        title: "Có lỗi...",
        text: "Bạn chưa nhập từ khóa!",
      });
    }
    if (inputURL.includes("http")) {
      const response = await fetch(
        Constants.API_URL_GET_CONTENT + "?url=" + inputURL,
        requestOptions
      );
      const result = await response.json();
      return setTextField(result.data.toString());
    } else {
      const response = await fetch(
        Constants.API_URL_GET_TITLE + "?title=" + input,
        requestOptions
      );
      const result = await response.json();
      return setData(result);
    }
  }, [textField, input, inputURL]);
  console.log("input >>>", input);
  console.log("inputURL >>>", inputURL);
  return (
    <div className="bgPadding mt-2 shadow-sm">
      <div class="text-black lh-lg">
        <h1>Tối Ưu Nội Dung Của Bài Viết</h1>
        <p>
          ✅Chức năng này cho phép kiểm tra bài viết của bạn đã có chứa các từ
          khóa SLI hay chưa
        </p>
        <p class="lh-lg">
          ✅Có tích hợp kiểm tra một đoạn nội dung hay cả nội dung bài viết
          thông qua đường link
        </p>
      </div>
      <div className={clsx(styles.headerOptimalSearch, "shadow")}>
        <div className={clsx(styles.titleOptimalSearch)}>
          <p className={clsx(styles.text1OptimalSearch)}>Tối ưu bài viết</p>
          <p className={clsx(styles.text2OptimalSearch)}>
            Bạn còn 4/5 lượt miễn phí
          </p>
        </div>
        <div className={clsx(styles.bodyOptimalSearch)}>
          <input
            placeholder="Từ khóa chính"
            className={clsx(styles.input1OptimalSearch)}
            value={input}
            onChange={(e) => handleChanged(e)}
          />
          <input
            placeholder="Đường dẫn bài viết (tùy chọn)"
            className={clsx(styles.input2OptimalSearch)}
            value={inputURL}
            onChange={(e) => handleURLChanged(e)}
          />
          <button
            className={clsx(
              styles.btnOptimalSearch,
              "btn btn-dark fw-bold hoverScale"
            )}
            onClick={() => doFetch()}
          >
            Tối ưu ngay
          </button>
        </div>
      </div>

      <div className={clsx(styles.wrapper, "shadow")}>
        <div className={clsx(styles.leftBlock)}>
          <p className={clsx(styles.text1OptimalSearch)}>
            Dán nội dung cần tối ưu tại đây
          </p>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="22"
            value={textField.data == undefined ? textField : textField.data}
            onChange={(e) => handleChangedField(e)}
          ></textarea>
          <button
            className={clsx(
              styles.leftBlockBtn,
              "btn btn-light fw-bold hoverScale"
            )}
            onClick={() => handleAnalytic}
          >
            Phân tích
          </button>
        </div>
        <div className={clsx(styles.rightBlock)}>
          <p className={clsx(styles.text1OptimalSearch)}>
            Các từ khóa cần tối ưu
          </p>
          {state.loading ? (
            <div className={clsx(styles.centerBlock)}>
              <LoadingMini />
            </div>
          ) : (
            <div className={clsx(styles.rightBlock)}>
              <ul className={clsx(styles.listSli)}>
                {data.totalSLI != undefined &&
                  data.totalSLI.map((item, index) => (
                    <li
                      className={
                        textField != undefined &&
                        textField.includes(
                          item.replace(/\d/gm, "").replace("()", "")
                        )
                          ? clsx(styles.itemSli, styles.colorItem)
                          : clsx(styles.itemSli)
                      }
                      key={index}
                    >
                      {item.replace(/\d/gm, "").replace("()", "")}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {console.log("dataFilter >>>", dataFilter)}
          {console.log("data 2>>>", data)}
        </div>
      </div>
    </div>
  );
}
