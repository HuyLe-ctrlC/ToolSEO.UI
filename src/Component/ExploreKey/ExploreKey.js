import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./ExploreKey.module.scss";
import Spin from "../Loading/Loading";
import ErrorPage from "../Error/Error";
import { useAsyncFn } from "react-use";
import Constants from "../assets/Constants";
import "../../index.css";
import Swal from "sweetalert2";

export default function ExploreKey() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token_client,
    },
  };

  const hanleChanged = (e) => {
    setInput(e.target.value);
  };
  //start call API
  const [state, doFetch] = useAsyncFn(async () => {
    if (input === "" || input == null) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi...",
        text: "Bạn chưa nhập từ khóa!",
      });
    } else {
      const response = await fetch(
        Constants.API_URL_GET_TITLE + "?title=" + input,
        requestOptions
      );
      const result = await response.json();
      return setData(result);
    }
  }, [input]);

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
          <div class="text-black lh-lg">
            <h1>Khám Phá Từ Khóa SLI</h1>
            <p class="text-black">
              ✅Trả về những cụm từ có nghĩa xuất hiện nhiều trong các bài top
              google
            </p>
            <p class="text-black lh-lg">
              ✅Từ đó SEOer có thể tối ưu cho bài viết có chứa nhiều nhất có thể
              những các cụm từ này
            </p>
          </div>
          <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.leftBlock)}>
              <input
                placeholder="Nhập từ khóa"
                value={input}
                onChange={(e) => hanleChanged(e)}
              />
              <button
                className={clsx(
                  styles.leftBlockBtn,
                  "btn btn-dark fw-bold hoverScale"
                )}
                onClick={() => doFetch()}
              >
                Khám phá ngay
              </button>
            </div>
            <div className={clsx(styles.rightBlock)}>
              <ul className={clsx(styles.listSli)}>
                {data.totalSLI != undefined &&
                  data.totalSLI.map((item, index) => (
                    <li className={clsx(styles.itemSli)} key={index}>
                      {item.replace(/\d/gm, "").replace("()", "")}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
