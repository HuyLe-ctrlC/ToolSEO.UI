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
        title: "C?? l???i...",
        text: "B???n ch??a nh???p t??? kh??a!",
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
        <h1>T???i ??u N???i Dung C???a B??i Vi???t</h1>
        <p>
          ???Ch???c n??ng n??y cho ph??p ki???m tra b??i vi???t c???a b???n ???? c?? ch???a c??c t???
          kh??a SLI hay ch??a
        </p>
        <p class="lh-lg">
          ???C?? t??ch h???p ki???m tra m???t ??o???n n???i dung hay c??? n???i dung b??i vi???t
          th??ng qua ???????ng link
        </p>
      </div>
      <div className={clsx(styles.headerOptimalSearch, "shadow")}>
        <div className={clsx(styles.titleOptimalSearch)}>
          <p className={clsx(styles.text1OptimalSearch)}>T???i ??u b??i vi???t</p>
          <p className={clsx(styles.text2OptimalSearch)}>
            B???n c??n 4/5 l?????t mi???n ph??
          </p>
        </div>
        <div className={clsx(styles.bodyOptimalSearch)}>
          <input
            placeholder="T??? kh??a ch??nh"
            className={clsx(styles.input1OptimalSearch)}
            value={input}
            onChange={(e) => handleChanged(e)}
          />
          <input
            placeholder="???????ng d???n b??i vi???t (t??y ch???n)"
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
            T???i ??u ngay
          </button>
        </div>
      </div>

      <div className={clsx(styles.wrapper, "shadow")}>
        <div className={clsx(styles.leftBlock)}>
          <p className={clsx(styles.text1OptimalSearch)}>
            D??n n???i dung c???n t???i ??u t???i ????y
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
            Ph??n t??ch
          </button>
        </div>
        <div className={clsx(styles.rightBlock)}>
          <p className={clsx(styles.text1OptimalSearch)}>
            C??c t??? kh??a c???n t???i ??u
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
