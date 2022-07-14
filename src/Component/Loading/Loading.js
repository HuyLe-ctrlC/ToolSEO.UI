import React, { useEffect, useRef } from "react";
import "../Loading/Loading.css";
import "../../index.css";
const Spin = () => {
  return (
    <div id="section-preloader">
      <div className="boxes">
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <p>Đang xử lý dữ liệu!</p>
    </div>
  );
};

export default Spin;

// export default function App() {
//   return (
//     <div className="App">
//       <section className="hero container max-w-screen-lg mx-auto w-40 pb-10">
//         <img
//           className="mx:auto"
//           src="https://uploads-ssl.webflow.com/61d6f8115c14bc812ba22ed4/61d6f8d3a03057212f20b54d_logo%20Airfund_2022-p-500.jpeg"
//         />
//       </section>
//       <Spin />
//     </div>
//   );
// }
